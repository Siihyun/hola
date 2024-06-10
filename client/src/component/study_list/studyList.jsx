import React from 'react';
import StudyItem from 'component/study_item/studyItem';
import styles from './studyList.module.css';
import { useMediaQuery } from 'react-responsive';
import { useEventLog } from 'domains/main/hooks/useEventLog';

const StudyList = ({ studyList, type }) => {
  // const isMobile = useMediaQuery({ query: '(max-width: 767px' });
  // const { mutate } = useEventLog();

  return (
    <ul className={styles.studyList}>
      {/* {!isMobile && (
        <img
          className={styles.adBlockImg}
          src='images/banner/hanghae-0520.png'
          alt='ad-block'
          onClick={() => {
            mutate({ advertisementId: '664b61d9f0265e00139fba51', logType: 'reach' });
            window.open('https://bit.ly/3KbOOgl');
          }}
        />
      )} */}
      {studyList.map((study) => {
        return <StudyItem study={study} type={type} key={study._id} />;
      })}
    </ul>
  );
};

export default StudyList;
