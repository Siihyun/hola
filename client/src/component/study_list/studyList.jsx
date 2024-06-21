import React from 'react';
import StudyItem from 'component/study_item/studyItem';
import styles from './studyList.module.css';

const StudyList = ({ studyList, type }) => {
  return (
    <ul className={styles.studyList}>
      {studyList.map((study) => {
        return <StudyItem study={study} type={type} key={study._id} />;
      })}
    </ul>
  );
};

export default StudyList;
