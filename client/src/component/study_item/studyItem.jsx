import React, { useState } from 'react';
import styles from './studyItem.module.css';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { Avatar } from 'component/common/avatar';
import { formatDate } from 'common/utils';
import { positionsMap } from 'common/options';
import Badge from 'component/badge/badge';
import studyService from '../../service/study_service';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { HolaLogEvent } from 'common/GA';
import { useHistory } from 'react-router';
import { useAddLikes } from 'hooks/useAddLikes';
import { useDeleteLikes } from 'hooks/useDeleteLikes';
import UserDetailModal from 'component/modal/UserDetailModal';
import { useModalState } from 'hooks/useModalCustom';
import { useLoginModal } from 'hooks/useModal';

const StudyItem = ({ study, type }) => {
  const {
    modalVisible: isUserModalOpen,
    openModal: openUserModal,
    closeModal: closeUserModal,
  } = useModalState();
  const { openModal } = useLoginModal();
  const { mutateAsync: addLikes } = useAddLikes();
  const { mutateAsync: deleteLikes } = useDeleteLikes();
  const studyLang = [];
  const displayType = study.isClosed ? styles.closed : styles.open;
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user);
  const authorId = study.author._id;
  const history = useHistory();

  const handleAvatarClick = (e) => {
    HolaLogEvent('profile_click', { category: study.title });
    e.preventDefault();
    e.stopPropagation();
    openUserModal();
  };

  const handleLike = async (e) => {
    HolaLogEvent('highfive_main', { category: study.title });
    e.stopPropagation();
    e.preventDefault();
    if (!user.nickName) {
      openModal();
      return;
    }

    study.isLiked ? await deleteLikes(study._id) : await addLikes(study._id);
    const toastText = study.isLiked ? '관심 목록에서 제거했어요!' : '관심 목록에 추가했어요!';
    toast.success(toastText, {
      position: 'top-right',
      autoClose: 3000,
    });

    if (!study.isLiked) await studyService.addLikes(study._id);
    queryClient.invalidateQueries('studyList');
  };

  for (let i = 0; i < 5; i++) {
    if (study.language[i] === undefined) break;
    else studyLang.push(study.language[i]);
  }

  const handleStudyClick = (e) => {
    e.preventDefault();
    HolaLogEvent(`select_block_${type}`, { category: study.title });
    history.push(`/study/${study._id}`);
  };

  return (
    <>
      <Link
        to={`/study/${study._id}`}
        onClick={handleStudyClick}
        className={`${styles.studyItem} ${displayType}`}
      >
        <li>
          <div className={styles.badgeWrapper}>
            <Badge state={study.type === '1' ? 'project' : 'study'} />
            <Badge state={study.state} />
          </div>
          <div className={styles.schedule}>
            <p className={styles.scheduleTitle}>마감일 |</p>
            <p className={styles.scheduleInfo}>{formatDate(study.startDate)}</p>
          </div>
          <h1 className={styles.title}>{study.title}</h1>
          <ul className={styles.positionList}>
            {study.positions.map((position, idx) => (
              <li key={idx} className={styles.position}>
                {positionsMap[position]}
              </li>
            ))}
          </ul>
          <ul className={styles.content}>
            {studyLang.map((lang, i) => (
              <li key={i} className={styles.language}>
                <img
                  className={styles.languageImage}
                  title={lang}
                  src={`/images/languages/${lang}.svg`}
                  alt='language'
                />
              </li>
            ))}
          </ul>
          <div className={styles.border} />
          <section className={styles.info}>
            <div className={styles.userInfo} onClick={handleAvatarClick}>
              <Avatar size='30px' imgPath={study.author.image} />
              <div className={styles.userName}>{study.author.nickName}</div>
            </div>
            <div className={styles.viewsAndComment}>
              <div className={styles.infoItem}>
                <AiOutlineEye size={24} color={'#999999'} />
                <p className={styles.views}>{study.views}</p>
              </div>
              <div className={styles.infoItem}>
                <FaRegComment size={18} color={'#999999'} />
                <p className={styles.comments}>{study.totalComments}</p>
              </div>
            </div>
          </section>
          {study.isClosed && <div className={styles.closeNotice}>모집 마감</div>}
          {study.isLiked !== undefined && (
            <img
              className={styles.bookmark}
              src={study.isLiked ? '/images/info/bookmark_filled.png' : '/images/info/bookmark.png'}
              alt='bookmark'
              onClick={handleLike}
            />
          )}
        </li>
      </Link>
      <div className={styles.seperator}></div>
      {isUserModalOpen && (
        <UserDetailModal id={authorId} isOpen={isUserModalOpen} closeModal={closeUserModal} />
      )}
    </>
  );
};

export default StudyItem;
