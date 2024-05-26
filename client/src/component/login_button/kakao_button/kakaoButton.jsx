import React from 'react';
import styles from './kakaoButton.module.css';

const KakaoButton = ({ onClick }) => (
  <div className={styles.button} onClick={onClick}>
    <img className={styles.loginIconImage} src='/images/info/kakao.png' alt='kakao login' />
    <div className={styles.loginTitle}>Kakao 로그인</div>
  </div>
);

export default KakaoButton;
