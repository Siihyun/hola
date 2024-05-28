import { HolaLogEvent } from 'common/GA';
import { NoticeDropdownBar } from 'component/noticeDropdown';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './notice.module.css';
import { useGetNotices } from 'hooks/useGetNotices';

export const Notice = () => {
  const { data, isLoading } = useGetNotices();
  const hasUnreadNotice = data?.filter((item) => item.isRead === false).length > 0;
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef();

  const handleNotificationClick = () => {
    HolaLogEvent('notification');
    if (menuVisible) document.body.style.overflow = 'auto';
    else document.body.style.overflow = 'hidden';
    setMenuVisible((menuVisible) => !menuVisible);
  };

  const handleCloseMenu = useCallback(
    (e) => {
      if (menuVisible && (!menuRef.current || !menuRef.current.contains(e.target))) {
        //dropdown이 켜져 있고 dropdown영역 외부 click시 dropdown menu 제거
        document.body.style.overflow = 'auto';
        setMenuVisible(false);
      }
    },
    [menuVisible, menuRef],
  );

  useEffect(() => {
    window.addEventListener('click', handleCloseMenu);
    return () => {
      window.removeEventListener('click', handleCloseMenu);
    };
  }, [handleCloseMenu]);

  return (
    <div className={styles.notificationWrapper} onClick={handleNotificationClick}>
      <div className={styles.imageWrapper}>
        {hasUnreadNotice && (
          <div className={styles.alarmNoticer}>
            {!isLoading && data?.filter((item) => item.isRead === false).length}
          </div>
        )}
        <img
          className={styles.notification}
          src={'/images/info/notification.svg'}
          alt='notification'
        />
      </div>
      {menuVisible && <NoticeDropdownBar notices={data} handleClose={handleNotificationClick} />}
    </div>
  );
};
