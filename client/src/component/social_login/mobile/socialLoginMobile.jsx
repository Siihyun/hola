import styles from './socialLogin.module.css';
import KakaoLogin from 'react-kakao-login';
import GoogleLogin from 'react-google-login';
import { HolaLogEvent } from 'common/GA';

const SocialLoginMobile = ({
  googleOnSuccess,
  googleOnFailure,
  googleClientId,
  kakaoOnSuccess,
  kakaoOnFailure,
  kakaoClientId,
  handleClose,
}) => {
  const clientId = process.env.REACT_APP_GITHUB_LOGIN_API_KEY;
  return (
    <div className={styles.wrapper}>
      <div className={styles.upperSection}>
        <div className={styles.loginIconWrapper} onClick={handleClose}>
          <svg
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
        <div className={styles.descriptionTitle}>
          <div>스터디와 사이드 프로젝트를 찾는</div>
          <div>가장 쉬운 방법!</div>
        </div>
        <div className={styles.descriptionDetail}>Hola에서 함께 할 팀원을 찾으세요</div>
        <img
          src='/images/info/hands.png'
          alt='login thumbnail'
          className={styles.descriptionImage}
        />
      </div>

      <div className={styles.downSection}>
        <div className={styles.snsTitle}>SNS 계정으로 간편 가입하기</div>
        <div className={styles.loginButtonWrapper}>
          <GoogleLogin
            clientId={googleClientId}
            responseType={'id_token'}
            onSuccess={googleOnSuccess}
            onFailure={googleOnFailure}
            render={(renderProps) => (
              <img
                className={styles.loginIconImage}
                src='/images/info/google.png'
                alt='google login'
                onClick={() => {
                  renderProps.onClick();
                  HolaLogEvent(`login`, { category: 'google' });
                }}
              />
            )}
          />
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https://holaworld.io/auth/github`}
            onClick={() => HolaLogEvent(`login`, { category: 'github' })}
          >
            <img
              className={styles.loginIconImage}
              src='/images/info/github.png'
              alt='github login'
            />
          </a>

          <KakaoLogin
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFailure={kakaoOnFailure}
            render={({ onClick }) => (
              <img
                className={styles.loginIconImage}
                src='/images/info/kakao.png'
                alt='kakao login'
                onClick={() => {
                  HolaLogEvent(`login`, { category: 'kakao' });
                  onClick();
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLoginMobile;
