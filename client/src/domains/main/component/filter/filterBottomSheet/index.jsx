import 'react-spring-bottom-sheet/dist/style.css';
import * as S from './styled';
import LanguageFilter from './languageFilter';
import StudyTypeFilter from './studyTypeFilter';
import PositionFilter from './positionFilter';

const FilterBottomSheet = ({ isOpen, onDismiss, curCategory, setCurCategory }) => {
  const categories = ['기술스택', '모집구분', '포지션', '진행방식', '마감여부'];
  const FilterItem = {
    기술스택: <LanguageFilter />,
    모집구분: <StudyTypeFilter />,
    포지션: <PositionFilter />,
    진행방식: <StudyTypeFilter />,
    마감여부: <StudyTypeFilter />,
  };

  return (
    <S.Popup expandOnContentDrag={true} open={isOpen} onDismiss={onDismiss}>
      <S.Container>
        <S.Categories>
          {categories.map((category) => (
            <S.CategoryItem
              onClick={() => setCurCategory(category)}
              selected={category === curCategory}
            >
              {category}
            </S.CategoryItem>
          ))}
        </S.Categories>
        {FilterItem[curCategory]}
        <S.ButtonContainer>
          <S.InitButton>초기화</S.InitButton>
          <S.ConfirmButton onClick={onDismiss}>필터 적용</S.ConfirmButton>
        </S.ButtonContainer>
      </S.Container>
    </S.Popup>
  );
};

export default FilterBottomSheet;
