import React from 'react';
import StudyItem from 'component/study_item/studyItem';
import styles from './studyList.module.css';
import { useMediaQuery } from 'react-responsive';

const StudyList = ({ studyList, type }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px' });

  return (
    <ul className={styles.studyList}>
      {!isMobile && (
        <img className={styles.adBlockImg} src='images/banner/ad-block-tdd.png' alt='ad-block' />
      )}
      {studyList.map((study) => {
        return <StudyItem study={study} type={type} key={study._id}></StudyItem>;
      })}
    </ul>
  );
};

export default StudyList;
