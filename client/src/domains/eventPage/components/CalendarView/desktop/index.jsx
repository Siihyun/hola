import React, { useEffect, useRef, useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import * as S from '../styled';
import './calendar.css';
import { useGetMainCalendarEvent } from 'domains/eventPage/hooks/useGetMainCalendarEvent';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from 'store/itFilter';
import { format } from 'date-fns';
import { getDotColor } from 'domains/eventPage/utils/getDotColor';
import { useModalState } from 'hooks/useModalCustom';
import EventDetailModal from '../../EventDetailModal';
import { useGetUserLikes } from 'domains/eventPage/hooks/useGetUserLikes';
import { makeQueryString } from 'domains/eventPage/utils/makeQueryString';
import { useHistory } from 'react-router-dom';
import { HolaLogEvent } from 'common/GA';

const DesktopCalendarView = () => {
  const filterState = useSelector((state) => state.itFilter);
  const { year, month, search, eventType, onOffline, isLiked } = filterState;

  const [currentId, setCurrentId] = useState(null);
  const history = useHistory();
  const { modalVisible, openModal, closeModal } = useModalState();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const { data } = useGetMainCalendarEvent({ year, month, search, eventType, onOffline });
  const { data: likesData } = useGetUserLikes(isLiked);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === 'POP') {
        console.log('사용자가 브라우저 뒤로가기를 클릭했습니다.');
        handleClose();
      }
    });

    return () => {
      unlisten();
    };
  }, [history]);

  const handleClose = () => {
    window.history.replaceState(null, 'modal title', `/hola-it?${makeQueryString(filterState)}`);
    closeModal();
  };

  const updateMonthAndDate = (currentDate) => {
    dispatch(changeField({ key: 'year', value: new Date(currentDate).getFullYear() }));
    dispatch(changeField({ key: 'month', value: new Date(currentDate).getMonth() + 1 }));
  };

  const renderData = isLiked ? likesData : data;

  const calendarData =
    renderData
      ?.map((d) => {
        const { _id, title, startDate, endDate, eventType } = d;
        const startItem = {
          //HACK:: FULL CALENDAR에서 id를 key로 사용해서 index를 붙여줍니다.
          id: _id + '0',
          title,
          date: format(new Date(startDate), 'yyyy-MM-dd'),
          itemType: 'start',
          eventType,
        };
        const endItem = {
          id: _id + '1',
          title,
          date: format(new Date(endDate), 'yyyy-MM-dd'),
          itemType: 'end',
          eventType,
        };
        return [startItem, endItem];
      })
      .flat() ?? [];

  const getNextId = (id) => {
    const idList = renderData?.map((d) => d._id);
    const index = idList.indexOf(id);

    // 특정 요소가 배열에 없거나 마지막 요소라면 null을 반환
    if (index === -1) {
      return null;
    }

    // 다음 요소 반환
    return idList[index + 1];
  };

  const getPrevId = (id) => {
    const idList = renderData?.map((d) => d._id);
    const index = idList.indexOf(id);

    // 첫번쨰 요소면 null 반환
    if (index === 0) {
      return null;
    }

    // 다음 요소 반환
    return idList[index - 1];
  };

  return (
    <>
      <S.TotalContainer>
        <S.TitleAndInfo>
          <S.TitleContainer>
            <S.ArrowImg
              src='images/info/calendar-prev-btn.png'
              onClick={() => {
                const api = calendarRef.current.getApi();
                api.prev();
                const currentDate = api.currentData.dateProfile.currentDate;
                updateMonthAndDate(currentDate);
              }}
            />
            <S.Title>
              {year}년 {month}월
            </S.Title>
            <S.ArrowImg
              src='images/info/calendar-next-btn.png'
              onClick={() => {
                const api = calendarRef.current.getApi();
                api.next();
                const currentDate = api.currentData.dateProfile.currentDate;
                updateMonthAndDate(currentDate);
              }}
            />
          </S.TitleContainer>
          <S.InfoContainer>
            <S.InfoItem color={getDotColor('conference')}>컨퍼런스</S.InfoItem>
            <S.InfoItem color={getDotColor('hackathon')}>해커톤</S.InfoItem>
            <S.InfoItem color={getDotColor('contest')}>공모전</S.InfoItem>
            <S.InfoItem color={getDotColor('bootcamp')}>부트캠프</S.InfoItem>
          </S.InfoContainer>
        </S.TitleAndInfo>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          headerToolbar={false}
          initialDate={new Date(year, month - 1)}
          events={calendarData}
          eventContent={(eventInfo) => {
            const { itemType, eventType } = eventInfo.event.extendedProps;
            return (
              <S.Content
                onClick={() => {
                  HolaLogEvent('select_event', { category: 'calendarView' });
                  const nextId = eventInfo.event.id.slice(0, -1);
                  openModal();
                  setCurrentId(nextId);
                  window.history.replaceState(null, 'modal title', `/hola-it/${nextId}`);
                }}
              >
                <S.TimeText color={getDotColor(eventType)}>
                  {itemType === 'start' ? '시작' : '마감'}
                </S.TimeText>
                <S.TitleText>{eventInfo.event.title}</S.TitleText>
              </S.Content>
            );
          }}
          eventBackgroundColor='white'
          eventBorderColor='white'
          titleFormat={(date) => `${date.date.year}년 ${date.date.month + 1}월`}
          dayHeaderContent={(date) => {
            const weekList = ['일', '월', '화', '수', '목', '금', '토'];
            return weekList[date.dow];
          }}
        />
      </S.TotalContainer>
      {modalVisible && (
        <EventDetailModal
          id={currentId}
          setCurrentId={setCurrentId}
          isOpen={modalVisible}
          closeModal={handleClose}
          eventType={eventType}
          getNextId={getNextId}
          getPrevId={getPrevId}
        />
      )}
    </>
  );
};

export default DesktopCalendarView;
