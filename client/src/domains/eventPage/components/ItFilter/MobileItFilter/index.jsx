import React, { useState } from 'react';
import * as S from './styled';
import FilterButton from './FilterButton';
// import FilterBottomSheet from '../filterBottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from 'common/utils';
import { onlineOrOfflineOption, positionsOption } from 'common/options';
import { HolaLogEvent } from 'common/GA';
import { changeSearch } from 'store/language';
import Search from 'domains/main/component/search/search';
import { IT_FILTER } from 'store/itFilter';
import { filterList } from '../DesktopItFilter';

const MobileItFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [curCategory, setCurCategory] = useState('기술스택');
  const { eventType, viewMode, onOffline } = useSelector((state) => state.itFilter);
  const dispatch = useDispatch();

  const handleClick = (category) => {
    setCurCategory(category);
    setIsOpen(true);
  };
  return (
    <>
      <S.Container>
        <Search
          placeholder='찾고 있는 프로젝트가 있나요?'
          handleSubmit={(inputValue) => {
            if (inputValue === '') return;
            HolaLogEvent('it_select_search', { category: inputValue });
            dispatch(changeSearch(inputValue));
          }}
          handleChange={(inputValue) => {
            if (inputValue === '') {
              alert('occur');
              dispatch(changeSearch(''));
            }
          }}
          handleRemoveClick={() => {
            dispatch(changeSearch(''));
          }}
          handleSearchAreaClick={() => {
            HolaLogEvent('select_search');
          }}
        />
        <S.ButtonContainer>
          <FilterButton
            buttonText={viewMode === IT_FILTER.VIEW.GENERAL ? '📁 리스트뷰' : '🗓️ 캘린더뷰'}
            isSelected
            onClick={() => handleClick('모집구분')}
          />
          <FilterButton
            buttonText={eventType === IT_FILTER.TYPE.ALL ? '카테고리' : '키'}
            isSelected={IT_FILTER.TYPE !== 'ALL'}
            onClick={() => handleClick('포지션')}
          />
          <FilterButton
            buttonText={
              onOffline === IT_FILTER.PLACE.ALL
                ? '진행 방식'
                : onlineOrOfflineOption.find((v) => v.value === onOffline).label
            }
            isSelected={onOffline !== IT_FILTER.PLACE.ALL}
            onClick={() => handleClick('진행방식')}
          />
        </S.ButtonContainer>
      </S.Container>
      <S.Separator />
      {/* <FilterBottomSheet
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        curCategory={curCategory}
        setCurCategory={setCurCategory}
      /> */}
    </>
  );
};

export default MobileItFilter;
