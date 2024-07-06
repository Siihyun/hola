import React from 'react';
import styles from './setInterest.module.css';
import { userSkillOption } from 'common/options';
import { nextStep, setSignUpUser, setSignupInterest } from 'store/loginStep';
import { useDispatch, useSelector } from 'react-redux';

const SetInterest = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState('개발');
  const { likeLanguages } = useSelector((state) => state.loginStep);

  const handleFields = (value) => {
    dispatch(setSignupInterest(value));
  };

  const categoryItem = [
    { name: '개발', img: '/images/info/develop_category.png' },
    { name: '기획', img: '/images/info/pm_category.png' },
    { name: '디자인', img: '/images/info/designer_category.png' },
    { name: '마케팅', img: '/images/info/marketing_category.png' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <h1 className={styles.title}>{'관심이 있거나 보유하고 있는\n스킬을 선택해주세요'}</h1>

        <ul className={styles.categoryWrapper}>
          {categoryItem.map((item) => (
            <li
              className={styles.categoryItem}
              onClick={() => {
                setCategory(item.name);
              }}
            >
              <div
                className={`${styles.imgContainer} ${
                  category === item.name ? styles.imgContainerSelected : ''
                }`}
              >
                <img className={styles.categoryImg} src={item.img} alt='developer category' />
              </div>
              <span
                className={`${styles.categoryLabel} ${
                  category === item.name ? styles.categoryLabelSelected : ''
                }`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>

        <div className={styles.gridContainer}>
          {userSkillOption[category].map((option) => (
            <li
              className={`${styles.optionItem} ${
                likeLanguages.includes(option.value) ? styles.optionItemSelected : ''
              }`}
              onClick={() => handleFields(option.value)}
            >
              {option.label}
            </li>
          ))}
        </div>
      </div>

      <button className={styles.buttonNext} onClick={() => dispatch(nextStep())}>
        다음
      </button>
    </div>
  );
};

export default SetInterest;
