import React from 'react';
import styles from './loginModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import SocialLoginContainer from 'component/social_login_container/socialLoginContainer';
import SignupEnd from 'component/signup_end/signupEnd';
import BaseInfo from 'component/signUp/baseInfo/BaseInfo';
import Steps from 'component/steps/Steps';
import CurrentStatus from 'component/signUp/currentStatus/CurrentStatus';
import SetInterest from 'component/signUp/setInterest/SetInterest';
import SetNickname from 'component/signUp/setNickname/SetNickname';
import { previousStep } from 'store/loginStep';

const SOCIAL_LOGIN = 0;
const SIGNUP_BASE_INFO = 1;
const SIGNUP_CURRENT_STATUS = 2;
const SIGNUP_INTEREST = 3;
const SIGNUP_NICKNAME = 4;
const SIGNUP_END = 5;

const LoginModal = ({ handleClose }) => {
  const loginStep = useSelector((state) => state.loginStep.currentStep);
  const dispatch = useDispatch();
  const renderByLoginStep = (loginStep) => {
    switch (loginStep) {
      case SIGNUP_BASE_INFO:
        return <BaseInfo />;
      case SIGNUP_CURRENT_STATUS:
        return <CurrentStatus />;
      case SIGNUP_INTEREST:
        return <SetInterest />;
      case SIGNUP_NICKNAME:
        return <SetNickname />;
      case SIGNUP_END:
        return <SignupEnd handleClose={handleClose} />;
      default:
        return null;
    }
  };
  return (
    <>
      {loginStep === SOCIAL_LOGIN && <SocialLoginContainer handleClose={handleClose} />}
      {loginStep !== SOCIAL_LOGIN && (
        <div className={styles.wrapper}>
          <div
            className={`${styles.modalHeader} ${
              loginStep === SIGNUP_END ? styles.modalHeaderFlexEnd : ''
            }`}
          >
            {loginStep !== SIGNUP_END && (
              <img
                className={styles.leftArrow}
                src='/images/info/arrowLeft.png'
                alt='left-arrow'
                onClick={() => dispatch(previousStep())}
              />
            )}
            <svg
              className={styles.exit}
              onClick={handleClose}
              stroke='currentColor'
              fill='currentColor'
              strokeWidth='0'
              viewBox='0 0 24 24'
              tabIndex='1'
              height='24px'
              width='24px'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
            </svg>
          </div>

          <div className={styles.modalContent}>
            {loginStep !== SIGNUP_END && <Steps totalStep={4} currentStep={loginStep} />}
            {renderByLoginStep(loginStep)}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
