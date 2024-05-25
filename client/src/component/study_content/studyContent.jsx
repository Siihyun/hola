import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'common/utils';
import CommentContainer from 'component/comment_container/commentContainer';
import studyService from 'service/study_service';
import { setPost } from 'store/write';
import RecommendPost from 'component/recommend_post/recommendPost';
import StudyButtons from 'component/study_buttons/studyButtons';
import styles from './studyContent.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { StudyInfo } from 'component/studyInfo';
import MobileStudyContent from './mobile/studyContent';
import { useMediaQuery } from 'react-responsive';
import Navbar from 'component/nav_bar/navbar';
import LikesAndViews from 'component/likes_and_views/likesAndViews';
import { useModalState } from 'hooks/useModalCustom';
import UserDetailModal from 'component/modal/UserDetailModal';
import { defaultImgSrc } from 'common/constant';

const StudyContent = ({ id }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const read = useSelector((state) => state.read);

  const { modalVisible, openModal, closeModal } = useModalState();

  const handleDelete = async (id) => {
    await studyService.deleteStudy(id);
    document.body.style.overflow = 'auto';
    toast.success('글 삭제가 완료되었어요!', {
      position: 'top-right',
      autoClose: 3000,
    });
    history.push('/');
  };

  const handleEnd = async (editValue) => {
    await studyService.editClose(id, editValue);
  };

  const handleEdit = () => {
    dispatch(setPost(read.post));
    history.push('/register');
  };

  const handleBack = () => {
    history.goBack();
  };
  const defaultPath = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/';
  return (
    <>
      {isMobile ? (
        <>
          <Navbar isBackBtn={true} />
          <MobileStudyContent
            user={user}
            id={id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleEnd={handleEnd}
          />
        </>
      ) : (
        <>
          <Navbar />
          <div className={styles.wrapper}>
            <section className={styles.postHeader}>
              <FaArrowLeft size={'30'} color='808080' cursor='pointer' onClick={handleBack} />
              <div className={styles.title}>{read.post.title}</div>
              <div className={styles.userAndDate}>
                <div className={styles.user} onClick={openModal}>
                  <img
                    className={styles.userImg}
                    src={defaultPath + read.post.imagePath}
                    alt='userImg'
                    onError={(event) => {
                      event.currentTarget.src = defaultImgSrc;
                    }}
                  />
                  <div className={styles.userName}>{read.post.nickname}</div>
                </div>
                <div className={styles.seperator} />
                <div className={styles.registeredDate}>{formatDate(read.post.createdAt)}</div>
              </div>
              {user.nickName === read.post.nickname && (
                <StudyButtons
                  history={history}
                  dispatch={dispatch}
                  handleEdit={handleEdit}
                  handleDelete={() => handleDelete(id)}
                  handleEnd={handleEnd}
                  isClosed={read.post.isClosed}
                ></StudyButtons>
              )}
              <RecommendPost id={id}></RecommendPost>
              <StudyInfo />
            </section>
            <div className={styles.postContentWrapper}>
              <h2 className={styles.postInfo}>프로젝트 소개</h2>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: read.post.content }}
              ></div>
            </div>

            <LikesAndViews
              views={read.post.views}
              likeUser={read.post.likes}
              totalLikes={read.post.totalLikes}
              studyId={read.post.id}
              userId={user.id}
            />

            <CommentContainer id={read.post.id}></CommentContainer>
          </div>
          {modalVisible && (
            <UserDetailModal
              id={read.post.author.id}
              isOpen={modalVisible}
              closeModal={closeModal}
            />
          )}
        </>
      )}
    </>
  );
};

export default StudyContent;
