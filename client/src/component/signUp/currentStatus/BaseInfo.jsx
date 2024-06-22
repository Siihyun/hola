import React from 'react';
import styles from './baseInfo.module.css';

const BaseInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <h1 className={styles.title}>타이틀</h1>
        <div className={styles.userInputContainer}></div>
      </div>

      <button className={styles.buttonNext}>다음</button>
    </div>
  );
};

export default BaseInfo;
