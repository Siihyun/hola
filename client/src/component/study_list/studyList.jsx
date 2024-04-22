import React from 'react';
import StudyItem from 'component/study_item/studyItem';
import styles from './studyList.module.css';
import { useMediaQuery } from 'react-responsive';
import { useEventLog } from 'domains/main/hooks/useEventLog';

const StudyList = ({ studyList, type }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px' });
  const { mutate } = useEventLog();

  return (
    <ul className={styles.studyList}>
      {!isMobile && (
        <img
          className={styles.adBlockImg}
          src='images/banner/ad-block-hanghae.png'
          alt='ad-block'
          onClick={() => {
            mutate({ advertisementId: '66252a32670fd6c80488c87c', logType: 'reach' });
            window.open('https://bit.ly/3Q3NIXe');
          }}
        />
      )}
      {studyList.map((study) => {
        return <StudyItem study={study} type={type} key={study._id} />;
      })}
    </ul>
  );
};

export default StudyList;
