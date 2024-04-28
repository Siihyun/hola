import React from 'react';
import styles from './dropdownBar.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearUser } from 'store/user';
import authService from 'service/auth_service';
import { clearStep } from 'store/loginStep';
import { useHistory } from 'react-router';
import { HolaLogEvent } from 'common/GA';

const DropdownBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = async () => {
    HolaLogEvent('sign_out');
    history.push('/');
    dispatch(clearUser());
    dispatch(clearStep());
    await authService.logout();
    authService.resetToken();
  };
  return (
    <div className={styles.menuWrapper}>
      <ul className={styles.menu}>
        {!window.location.href.includes('hola-it') && (
          <>
            <li className={`${styles.menuItem} ${styles.newPost}`}>
              <Link to='/register' style={{ display: 'inline-block' }}>
                새 글 작성
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to='/myPosts' style={{ display: 'inline-block' }}>
                내 작성글
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link to='/myLikes' style={{ display: 'inline-block' }}>
                내 관심글
              </Link>
            </li>
          </>
        )}

        <li className={styles.menuItem}>
          <Link to='/setting' style={{ display: 'inline-block' }}>
            설정
          </Link>
        </li>

        <li className={styles.menuItem} onClick={handleLogout}>
          로그아웃
        </li>
      </ul>
    </div>
  );
};

export default DropdownBar;
