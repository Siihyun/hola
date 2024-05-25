import React, { useEffect, useState } from 'react';
import styles from './loginUser.module.css';
import { useSelector } from 'react-redux';
import DropdownBar from 'component/dropdown_bar/dropdownBar';
import { useMediaQuery } from 'react-responsive';
import { defaultImgSrc } from 'common/constant';

/* 

Navbar에서 user 정보가 있으면 rendering 되는 component로,
User 정보와 새 글쓰기, Dropdown Bar button을 rendering 합니다.

*/
const LoginUser = React.memo(() => {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });
  const user = useSelector((state) => state.user);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLoginUserClick = () => {
    setMenuVisible((menuVisible) => !menuVisible);
  };

  const handleCloseMenu = () => {
    if (menuVisible) setMenuVisible(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseMenu);
    return () => {
      window.removeEventListener('click', handleCloseMenu);
    };
  }, [handleCloseMenu]);

  return (
    <div className={styles.userWrapper} onClick={handleLoginUserClick}>
      {isMobile ? (
        <img className={styles.menuIcon} src={'/images/info/menu.png'} alt='menu' />
      ) : (
        <>
          <img
            className={styles.userImg}
            src={user.imageUrl}
            alt='userImg'
            onError={(event) => {
              event.currentTarget.src = defaultImgSrc;
            }}
          />
          <svg
            strokeWidth='0'
            viewBox='0 0 24 24'
            height='16px'
            width='16px'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M7 10l5 5 5-5z' />
          </svg>
        </>
      )}
      {menuVisible && <DropdownBar />}
    </div>
  );
});

export default LoginUser;
