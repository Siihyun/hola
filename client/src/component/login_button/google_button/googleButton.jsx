import React from 'react';
import styles from './googleButton.module.css';

const GoogleButton = ({ onClick }) => (
  <div className={styles.button} onClick={onClick}>
    <img className={styles.loginIconImage} src='/images/info/google.png' alt='google login' />
    <div className={styles.loginTitle}>Google 로그인</div>
  </div>
);

export default GoogleButton;
