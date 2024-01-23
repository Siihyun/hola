import React from 'react';
import styles from './styles.module.css';
import { getBadgeColor, getBadgeTitle } from 'domains/eventPage/utils/getBadgeTitle';
import { differenceInDays } from 'date-fns';
import {
  getFormattedApplicationDate,
  getFormattedDate,
} from 'domains/eventPage/utils/getFormattedDate';
import { HolaLogEvent } from 'common/GA';
import EventItemView from 'domains/eventPage/components/EventItemView';

const DetailDesktop = ({ detailData, relativeEvents }) => {
  if (!detailData) return null;

  const leftDays = differenceInDays(new Date(), new Date(detailData?.applicationEndDate));
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{detailData?.title}</h1>
      <section className={styles.eventInfoSection}>
        <img className={styles.eventBannerImg} src={detailData?.imageUrl} alt='banner' />
        <div className={styles.eventInfo}>
          <div className={styles.eventInfoDetail}>
            <ul className={styles.badgeContainer}>
              <li
                className={styles.badge}
                style={{
                  color: getBadgeColor(detailData?.eventType),
                  border: `1px solid ${getBadgeTitle(detailData?.eventType)}`,
                }}
              >
                {getBadgeTitle(detailData?.eventType)}
              </li>
              {leftDays > 0 && (
                <li className={styles.deadline}>
                  🔥 마감 {differenceInDays(new Date(), new Date(detailData?.applicationEndDate))}
                  일전
                </li>
              )}
            </ul>
            <div className={styles.evantInfoWrapper}>
              <span className={styles.eventTitle}>일시</span>
              <span className={styles.eventSubTitle}>
                {getFormattedDate(detailData?.startDate)}
              </span>
            </div>

            <div className={styles.evantInfoWrapper}>
              <span className={styles.eventTitle}>신청</span>
              <span className={styles.eventSubTitle}>
                <span className={styles.eventSubTitle}>{`${getFormattedApplicationDate(
                  detailData?.applicationStartDate,
                )} ~\n${getFormattedApplicationDate(detailData?.applicationEndDate)}`}</span>
              </span>
            </div>

            <div className={styles.evantInfoWrapper}>
              <span className={styles.eventTitle}>장소</span>
              <span className={styles.eventSubTitle}>{detailData?.place}</span>
            </div>
          </div>
          <div className={styles.eventApplyContainer}>
            <div className={styles.evantInfoWrapper}>
              <span className={styles.eventTitle}>주최</span>
              <span className={styles.eventSubTitle}>{detailData?.organization}</span>
            </div>

            <button
              onClick={() => {
                HolaLogEvent('hola_it_event_click', { cagtegory: detailData?.title });
                window.open(detailData?.link);
              }}
              className={styles.applyButton}
            >
              신청하기
            </button>
          </div>
        </div>
      </section>
      <div className={styles.introductionTitle}>소개</div>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: detailData?.content }} />

      <div className={styles.recommendContentTitle}>📁 추천 콘텐츠</div>
      <div className={styles.recommendContainer}>
        {relativeEvents?.slice(0, 4).map((item) => (
          <EventItemView isRecommend={true} eventInfo={item} onEventClick={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default DetailDesktop;
