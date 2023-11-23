import { HolaLogEvent } from 'common/GA';
import React from 'react';
import styles from './commonBanner.module.css';
import './carousel.css';

const CommonBanner = ({
  title,
  subTitle,
  imgSrc,
  link,
  badgeTitle,
  badgeBgColor,
  badgeTextColor,
  bgColor,
}) => {
  const handleLinkClick = (e) => {
    HolaLogEvent('main_banner', { category: title });
    e.preventDefault();
    window.location.href = link;
  };
  return (
    <a
      className={styles.bannerLink}
      href={link}
      target='_blank'
      rel='noreferrer'
      onClick={handleLinkClick}
    >
      <div style={{ background: bgColor }} className={styles.containerWrapper}>
        <div className={styles.container}>
          <div className={styles.leftCover}>
            <button
              style={{ backgroundColor: badgeBgColor, color: badgeTextColor }}
              className={styles.promotion}
            >
              {badgeTitle}
            </button>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.subTitle}>{subTitle}</span>
          </div>
          <div className={styles.rightCover}>
            <img className={styles.coverImage} src={imgSrc} alt='banner' />
          </div>
        </div>
      </div>
    </a>
  );
};

export default CommonBanner;
