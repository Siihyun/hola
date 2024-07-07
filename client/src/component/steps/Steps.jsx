import React from 'react';
import styles from './step.module.css'; // Assuming you have your styles imported like this

const Steps = ({ totalStep, currentStep }) => {
  return (
    <div className={styles.step}>
      {Array.from({ length: totalStep }, (_, index) => (
        <>
          <div
            key={index}
            className={index + 1 === currentStep ? styles.activeStep : styles.inactiveStep}
          >
            {index + 1}
          </div>
          {index !== totalStep - 1 && <div className={styles.stepLine} />}
        </>
      ))}
    </div>
  );
};

export default Steps;
