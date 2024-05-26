import React from 'react';
import styles from './socialLogin.module.css';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import GoogleButton from 'component/login_button/google_button/googleButton';
import GithubButton from 'component/login_button/github_button/githubButton';
import KakaoButton from 'component/login_button/kakao_button/kakaoButton';
import { HolaLogEvent } from 'common/GA';

const SocialLoginDesktop = ({
  googleOnSuccess,
  googleOnFailure,
  googleClientId,
  kakaoOnSuccess,
  kakaoOnFailure,
  kakaoClientId,
}) => {
  const handleClick = (method) => {
    HolaLogEvent(`login`, { category: method });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modalContent}>
        <div className={styles.closeIcon}>
          <svg
            width='29'
            height='29'
            viewBox='0 0 29 29'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M21.8014 7.19922L7.40137 21.5992'
              stroke='#777777'
              stroke-width='1.8'
              stroke-linecap='round'
            />
            <path
              d='M21.8014 21.5992L7.40137 7.19922'
              stroke='#777777'
              stroke-width='1.8'
              stroke-linecap='round'
            />
          </svg>
        </div>

        <img className={styles.logo} src='/images/logo/new-logo.png' alt='logo' />
        <h1 className={styles.loginTitle}>Hola에 오신 것을 환영합니다!</h1>
        <div className={styles.loginDescription}>
          <div>스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법!</div>
          <div>Hola에서 함께 할 팀원들을 찾으세요</div>
        </div>

        <section className={styles.loginWrapper}>
          <div onClick={() => handleClick('google')}>
            <GoogleLogin
              clientId={googleClientId}
              responseType={'id_token'}
              onSuccess={googleOnSuccess}
              onFailure={googleOnFailure}
              render={(renderProps) => <GoogleButton onClick={renderProps.onClick}></GoogleButton>}
            />
          </div>
          <div onClick={() => handleClick('github')}>
            <GithubButton />
          </div>
          <div onClick={() => handleClick('kakao')}>
            <KakaoLogin
              token={kakaoClientId}
              onSuccess={kakaoOnSuccess}
              onFailure={kakaoOnFailure}
              render={({ onClick }) => <KakaoButton onClick={onClick}></KakaoButton>}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SocialLoginDesktop;
