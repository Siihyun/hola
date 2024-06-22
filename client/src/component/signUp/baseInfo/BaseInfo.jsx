import React from 'react';
import styles from './baseInfo.module.css';
import { Selectbox } from 'component/select';
import { positionsExceptAllOption } from 'common/options';

const customStyles = {
  control: (css, state) => ({
    ...css,
    flex: 1,
    height: '55px',
    width: '100%',
    background: state.isDisabled ? '#f7f7f7' : 'white',
    borderRadius: '5px',
    boxShadow: 'none',
    border: state.hasValue ? '1px solid #00b9ae' : '1px solid #E3E3E3',
    '&:hover': {
      border: '1px solid #d1d1d1',
    },
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: '#e0e0e0',
    };
  },
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'gray' : state.hasValue ? '#00b9ae' : '#646464',
  }),
  indicatorSeparator: (base) => ({ ...base, display: 'none' }),
};

const BaseInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <h1 className={styles.title}>
          업무 분야와 경력에 맞춰
          <br />딱 맞는 정보를 추천해드릴게요!
        </h1>
        <div className={styles.userInputContainer}>
          <div className={styles.selectContainer}>
            <div className={styles.inputWrapper}>
              <h3 className={styles.inputLabel}>
                경력을 입력해주세요 <span style={{ color: '#EA726F' }}>*</span>
              </h3>
              <div className={styles.likeLanguageWrapper}>
                <Selectbox
                  customStyles={customStyles}
                  options={positionsExceptAllOption}
                  selectValue={''}
                  setSelectValue={''}
                  maxValue={3}
                  placeholder='경력 선택'
                  id='position'
                />
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <h3 className={styles.inputLabel}>
                직무를 입력해주세요 <span style={{ color: '#EA726F' }}>*</span>
              </h3>
              <div className={styles.likeLanguageWrapper}>
                <Selectbox
                  customStyles={customStyles}
                  options={positionsExceptAllOption}
                  selectValue={''}
                  setSelectValue={''}
                  maxValue={3}
                  placeholder='직무 선택'
                  id='position'
                />
              </div>
            </div>
          </div>

          <div className={styles.companyContainer}>
            <h3 className={styles.inputLabel}>소속을 입력해주세요</h3>
            <input className={styles.input} placeholder='소속 학교 또는 직장 입력'></input>
          </div>
        </div>
      </div>

      <button className={styles.buttonNext}>다음</button>
    </div>
  );
};

export default BaseInfo;
