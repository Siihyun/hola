import React, { useEffect } from 'react';
import LoginModal from 'component/modal/login_modal/loginModal';
import Modal from 'component/modal/modal_component/modal';
import styles from './navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginUser from 'component/login_user/loginUser';
import { clearUser, fetchUserByRefreshToken } from 'store/user';
import { toast } from 'react-toastify';
import { Notice } from 'component/notice';
import { useLoginModal } from 'hooks/useModal';
import { HolaLogEvent } from 'common/GA';

const Navbar = React.memo(({ isBackBtn }) => {
  const { openModal, closeModal, modalVisible } = useLoginModal();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const isHome = !window.location.href.includes('hola-it');

  const handleRegister = () => {
    HolaLogEvent('create_newpost_start');
    if (user.id === undefined) {
      openModal();
      return;
    }
    history.push('/register');
  };

  const handleBussinessClick = () => {
    HolaLogEvent('ask_business_question');
    window.open('https://tally.so/r/w4rWyX');
  };

  const handleEventRegisterClick = () => {
    HolaLogEvent('ask_event_register');
    window.open('https://smore.im/form/vrGiUijIMH');
  };

  useEffect(() => {
    // page refresh 후 accessToken을 갱신합니다.
    if (user.nickName) {
      dispatch(fetchUserByRefreshToken()).then((response) => {
        if (response.meta.requestStatus !== 'fulfilled') {
          history.push('/');
          dispatch(clearUser()); // 유저 초기화
          toast.error('로그인이 만료 되었어요!', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      });
    }
  }, [dispatch, history, user.nickName]);

  return (
    <nav className={styles.navbar}>
      {isBackBtn ? (
        <img
          className={styles.backBtn}
          src='/images/info/arrowLeft.png'
          alt='backbtn'
          onClick={() => {
            history.length > 2 ? history.goBack() : history.push('/');
          }}
        />
      ) : (
        <div className={styles.navigation}>
          <a href='/'>
            <img className={styles.logo} src='/images/logo/new-logo.png' alt='logo' />
          </a>
          <div
            className={!isHome ? styles.active : styles.inActive}
            onClick={() => {
              history.push('/hola-it');
            }}
          >
            Hola-IT
          </div>
        </div>
      )}

      <div className={styles.loginElementWrapper}>
        <div className={styles.buttonWrapper}>
          {!window.location.href.includes('hola-it') && (
            <button className={styles.postRegister} onClick={handleRegister}>
              팀원 모집하기
            </button>
          )}
          {window.location.href.includes('hola-it') && (
            <button className={styles.registerEvent} onClick={handleEventRegisterClick}>
              행사 등록하기
            </button>
          )}
          <button className={styles.businessQusetion} onClick={handleBussinessClick}>
            비즈니스 문의
          </button>
        </div>
        {!user.nickName ? (
          <button className={styles.login} onClick={openModal}>
            로그인
          </button>
        ) : (
          <>
            <Notice />
            <LoginUser />
          </>
        )}
      </div>
      <Modal visible={modalVisible} name='login' onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </nav>
  );
});

export default Navbar;
