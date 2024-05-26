import React from 'react';
import styles from './githubButton.module.css';

const GithubButton = () => {
  const clientId = process.env.REACT_APP_GITHUB_LOGIN_API_KEY;
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=https://holaworld.io/auth/github`}
    >
      <div className={styles.button}>
        <img className={styles.loginIconImage} src='/images/info/github.png' alt='github login' />
        <div className={styles.loginTitle}>Github 로그인</div>
      </div>
    </a>
  );
};

export default GithubButton;
