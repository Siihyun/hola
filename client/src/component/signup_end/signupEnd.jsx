import React from 'react';
import styles from './signupEnd.module.css';
import { HolaLogEvent } from 'common/GA';

const SignupEnd = ({ handleClose }) => {
  return (
    <>
      <h1 className={styles.title}>회원가입 완료</h1>
      <div className={styles.description}>이제 1만명의 올리와 함께하세요!</div>
      <img className={styles.image} src='/images/info/sign-up-complete.png' alt='logo' />
      <button
        onClick={() => {
          HolaLogEvent('sign_up_complete', { category: 'complete' });
          handleClose();
        }}
        className={styles.buttonNext}
        name='complete'
      >
        시작하기
      </button>
    </>
  );
};

export default SignupEnd;
