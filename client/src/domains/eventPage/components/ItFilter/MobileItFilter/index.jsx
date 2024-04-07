import React, { useState } from 'react';
import * as S from './styled';
import FilterButton from './FilterButton';
// import FilterBottomSheet from '../filterBottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { filterSortOption, onlineOrOfflineOption, eventTypeOption } from 'common/options';
import { HolaLogEvent } from 'common/GA';
import Search from 'domains/main/component/search/search';
import { IT_FILTER, changeField } from 'store/itFilter';
import FilterBottomSheet from './filterBottomSheet';

const MobileItFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [curCategory, setCurCategory] = useState('카테고리');
  const { eventType, viewMode, onOffLine, sort } = useSelector((state) => state.itFilter);
  const dispatch = useDispatch();

  const handleClick = (category) => {
    setCurCategory(category);
    setIsOpen(true);
  };
  return (
    <>
      <S.Container>
        <Search
          placeholder='키워드를 검색해 보세요.'
          handleSubmit={(inputValue) => {
            if (inputValue === '') return;
            HolaLogEvent('it_select_search', { category: inputValue });
            dispatch(changeField({ key: 'search', value: inputValue }));
          }}
          handleChange={(inputValue) => {
            if (inputValue === '') {
              dispatch(changeField({ key: 'search', value: '' }));
            }
          }}
          handleRemoveClick={() => {
            dispatch(changeField({ key: 'search', value: '' }));
          }}
          handleSearchAreaClick={() => {
            HolaLogEvent('it_select_search');
          }}
        />
        <S.ButtonContainer>
          <FilterButton
            buttonText={viewMode === IT_FILTER.VIEW.GENERAL ? '📁 리스트뷰' : '🗓️ 캘린더뷰'}
            isSelected
            onClick={() => handleClick('보기방식')}
          />
          <FilterButton
            buttonText={
              eventType === IT_FILTER.TYPE.ALL
                ? '카테고리'
                : eventTypeOption.find((v) => v.value === eventType).label
            }
            isSelected={eventType !== IT_FILTER.TYPE.ALL}
            onClick={() => handleClick('카테고리')}
          />
          <FilterButton
            buttonText={
              onOffLine === IT_FILTER.PLACE.ALL
                ? '진행 방식'
                : onlineOrOfflineOption.find((v) => v.value === onOffLine).label
            }
            isSelected={onOffLine !== IT_FILTER.PLACE.ALL}
            onClick={() => handleClick('진행방식')}
          />
          <FilterButton
            buttonText={filterSortOption.find((v) => v.value === sort).label}
            isSelected={true}
            onClick={() => handleClick('정렬방식')}
          />
        </S.ButtonContainer>
      </S.Container>
      <S.Separator />
      <FilterBottomSheet
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        curCategory={curCategory}
        setCurCategory={setCurCategory}
      />
    </>
  );
};

export default MobileItFilter;
