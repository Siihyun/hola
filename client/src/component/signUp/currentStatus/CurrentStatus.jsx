import React from 'react';
import styles from './currentStatus.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setSignUpUser } from 'store/loginStep';
import { userStatusOption } from 'common/options';

const CurrentStatus = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.loginStep);
  console.log(status);

  const handleFields = ({ key, value }) => {
    dispatch(setSignUpUser({ key, value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <h1 className={styles.title}>현재 상태를 알려주세요</h1>

        <div className={styles.gridContainer}>
          {userStatusOption.map((option) => (
            <li
              className={`${styles.optionItem} ${
                status === option.value ? styles.optionItemSelected : ''
              }`}
              onClick={() => handleFields({ key: 'status', value: option.value })}
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

export default CurrentStatus;
