import 'react-spring-bottom-sheet/dist/style.css';
import * as S from './styled';
import { useDispatch, useSelector } from 'react-redux';
import FilterContent from './FilterContent';
import { eventTypeOption, filterSortOption, viewOption } from 'common/options';
import { changeField, initFilterState } from 'store/itFilter';

const onlineOrOfflineOption = [
  { value: 'all', label: '전체' },
  { value: 'on', label: '온라인' },
  { value: 'off', label: '오프라인' },
  { value: 'onOff', label: '온/오프라인' },
];

const FilterBottomSheet = ({ isOpen, onDismiss, curCategory, setCurCategory }) => {
  const dispatch = useDispatch();

  const { eventType, onOffLine, sort, viewMode } = useSelector((state) => state.itFilter);
  const categories = ['보기방식', '카테고리', '진행방식', '정렬방식'];
  const FilterItem = {
    보기방식: (
      <FilterContent
        options={viewOption}
        currentValue={viewMode}
        handleClick={(value) => dispatch(changeField({ key: 'viewMode', value }))}
      />
    ),
    카테고리: (
      <FilterContent
        options={eventTypeOption}
        currentValue={eventType}
        handleClick={(value) => dispatch(changeField({ key: 'eventType', value }))}
      />
    ),
    진행방식: (
      <FilterContent
        options={onlineOrOfflineOption}
        currentValue={onOffLine}
        handleClick={(value) => dispatch(changeField({ key: 'onOffLine', value }))}
      />
    ),
    정렬방식: (
      <FilterContent
        options={filterSortOption}
        currentValue={sort}
        handleClick={(value) => dispatch(changeField({ key: 'sort', value }))}
      />
    ),
  };

  return (
    /* ios에서 bottom sheet background가 click 되는 이슈가 있어 click event 전파를 막습니다.
       @see https://github.com/stipsan/react-spring-bottom-sheet/issues/180 */
    <S.Popup
      expandOnContentDrag={true}
      open={isOpen}
      onDismiss={onDismiss}
      sibling={
        <div
          data-rsbs-backdrop='true'
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onDismiss();
          }}
        />
      }
      blocking={false}
    >
      <S.Container>
        <S.Categories>
          {categories.map((category, idx) => (
            <S.CategoryItem
              key={idx}
              onClick={() => setCurCategory(category)}
              selected={category === curCategory}
            >
              {category}
            </S.CategoryItem>
          ))}
        </S.Categories>
        {FilterItem[curCategory]}
        <S.ButtonContainer>
          <S.InitButton
            onClick={() => {
              dispatch(initFilterState());
            }}
          >
            초기화
          </S.InitButton>
          <S.ConfirmButton onClick={onDismiss}>필터 적용</S.ConfirmButton>
        </S.ButtonContainer>
      </S.Container>
    </S.Popup>
  );
};

export default FilterBottomSheet;
