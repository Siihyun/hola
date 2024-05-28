import React from 'react';
import userService from 'service/user_service';
import styles from './noticeDropdownBar.module.css';

export const NoticeDropdownBar = ({ notices, handleClose }) => {
  const unreadNoticeLength = notices?.filter((notice) => notice.isRead === false).length;
  const readNotices = notices?.filter((notice) => notice.isRead === true);
  const unReadNotices = notices?.filter((notice) => notice.isRead !== true);

  const handleAlarmClick = async (id) => {
    const result = await userService.readAlarm(id);
    // if (getUnreadAlarmLength(alarms) === 1 && result.status === 200) {
    //   dispatch(setUser({ key: 'hasUnreadNotice', value: false }));
    // }
  };

  return (
    <div className={styles.noticeWrapper}>
      <div className={styles.noticeHeader}>
        <div className={styles.noticeHeaderTitle}>알림</div>
        <div className={styles.exitWrapper} onClick={handleClose}>
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 24 24'
            tabIndex='1'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'></path>
          </svg>
        </div>
      </div>
      {notices?.length === 0 ? (
        <div className={styles.empty}>알림함이 비어있습니다.</div>
      ) : (
        <>
          {unReadNotices.length !== 0 && (
            <ul className={styles.noticeBody}>
              <div className={styles.unreadNotice}>
                <span>읽지 않은 알림</span>
                <span className={styles.unreadNoticeNumber}>{unreadNoticeLength}</span>
              </div>

              {unReadNotices?.map((alarm) => (
                <li
                  key={alarm._id}
                  onClick={() => handleAlarmClick(alarm._id)}
                  className={`${styles.noticeTitleWrapper} ${alarm.isRead && styles.isRead}`}
                >
                  <a
                    className={styles.noticeLink}
                    href={alarm.href}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div
                      className={
                        alarm.noticeType === 'comment' ? styles.commentNotice : styles.holaNotice
                      }
                    >
                      {alarm.icon}
                    </div>
                    <div className={styles.infoWrapper}>
                      <p className={styles.noticeTitle}>{alarm.title}</p>
                      <p className={styles.noticeContent}>{alarm.content}</p>
                    </div>
                    <div className={styles.timeText}>{alarm.timeAgo}</div>
                  </a>
                </li>
              ))}
            </ul>
          )}
          {readNotices.length !== 0 && (
            <ul className={styles.noticeBody}>
              {unReadNotices.length !== 0 && <div className={styles.divider} />}
              <div className={styles.unreadNotice}>
                <span>이전 알림</span>
              </div>

              {readNotices?.map((alarm) => (
                <li
                  key={alarm._id}
                  onClick={() => handleAlarmClick(alarm._id)}
                  className={`${styles.noticeTitleWrapper} ${alarm.isRead && styles.isRead}`}
                >
                  <a
                    className={styles.noticeLink}
                    href={alarm.href}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <div
                      className={
                        alarm.noticeType === 'comment' ? styles.commentNotice : styles.holaNotice
                      }
                    >
                      {alarm.icon}
                    </div>
                    <div className={styles.infoWrapper}>
                      <p className={styles.noticeTitle}>{alarm.title}</p>
                      <p className={styles.noticeContent}>{alarm.content}</p>
                    </div>
                    <div className={styles.timeText}>{alarm.timeAgo}</div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
