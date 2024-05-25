import React, { useState } from 'react';
import * as S from './styled';
import { useSelector } from 'react-redux';
import { formatDate } from 'common/utils';
import { StudyInfo } from 'component/studyInfo';
import LikesAndViews from 'component/likes_and_views/likesAndViews';
import CommentContainer from 'component/comment_container/commentContainer';
import { toast } from 'react-toastify';
import useSocialShare from 'hooks/useSocialShare';
import { HolaLogEvent } from 'common/GA';
import { useGetLikesUser } from 'hooks/useGetLikesUser';
import { useAddLikes } from 'hooks/useAddLikes';
import { useDeleteLikes } from 'hooks/useDeleteLikes';
import { useQueryClient } from 'react-query';
import { useLoginModal } from 'hooks/useModal';
import Modal from 'component/modal/modal_component/modal';
import LoginModal from 'component/modal/login_modal/loginModal';
import { defaultImgSrc } from 'common/constant';

const MobileStudyContent = ({ user, id, handleEdit, handleDelete, handleEnd }) => {
  const { openModal, closeModal, modalVisible } = useLoginModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { post } = useSelector((state) => state.read);
  const [close, setClose] = useState(post.isClosed);
  const isPostOwner = user.nickName === post.nickname;
  const { shareToKakaoTalk } = useSocialShare();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetLikesUser(id);
  const { mutateAsync: addLikes } = useAddLikes();
  const { mutateAsync: deleteLikes } = useDeleteLikes();
  const {
    imagePath,
    nickname,
    createdAt,
    content,
    contactPoint,
    contactType,
    id: studyId,
    title,
  } = post;
  const defaultPath = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/';

  const handleShareClick = () => {
    HolaLogEvent('share_button_click');
    shareToKakaoTalk({
      templateId: 93996,
      templateArgs: {
        studyId,
        title,
        description: content,
      },
    });
  };

  const copyContent = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('클립보드에 주소가 복사되었어요!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (err) {
      toast.error('복사에 실패했어요! 잠시후 다시 시도해보세요.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleApplyClick = () => {
    const { value } = contactType;
    HolaLogEvent(`mobile_apply`, { category: title });

    if (value === 'ok' || value === 'gf') window.open(contactPoint, '_blank');
    else copyContent(contactPoint);
  };

  const handleLikesClick = async () => {
    if (!user?.id) {
      openModal();
      return;
    }
    HolaLogEvent('mobile_highfive_block', { category: title });
    const isLike = data.likeUsers.find((likeId) => likeId === user.id);
    const toastText = isLike ? '관심 목록에서 제거했어요!' : '관심 목록에 추가했어요!';
    const result = isLike ? await deleteLikes(id) : await addLikes(id);
    queryClient.setQueriesData(['api', 'likes', 'user'], {
      ...result.data,
    });
    toast.success(toastText, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  if (isLoading) return <></>;

  return (
    <>
      <S.Container>
        {isPostOwner && (
          <S.DropdownWrapper onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <S.ThreeDots src='/images/info/icon-more.png' />
            {isDropdownOpen && (
              <S.Dropdown>
                <div onClick={handleEdit}>수정</div>
                {/* <div
                  onClick={() => {
                    handleEnd(!close);
                    setClose((state) => !state);
                  }}
                >
                  마감
                </div> */}
                <div onClick={() => handleDelete(id)}>삭제</div>
              </S.Dropdown>
            )}
          </S.DropdownWrapper>
        )}
        <S.InfoSection>
          <S.Title>{title}</S.Title>
          {/* 유저 및 시간 정보 */}
          <S.UserInfo>
            <S.UserContainer>
              <S.UserImg
                src={defaultPath + imagePath}
                onError={(event) => {
                  event.currentTarget.src = defaultImgSrc;
                }}
              />
              <S.UserName>{nickname}</S.UserName>
            </S.UserContainer>
            <S.StudyDate>{formatDate(createdAt)}</S.StudyDate>
          </S.UserInfo>
          {/* 스터디 모집 정보 */}
          <S.InfoWrapper>
            <StudyInfo />
          </S.InfoWrapper>
        </S.InfoSection>
        <S.ProjectInfoContainer>
          <S.ProjectInfo>프로젝트 소개</S.ProjectInfo>
          <S.Content dangerouslySetInnerHTML={{ __html: content }} />
        </S.ProjectInfoContainer>

        <S.BottomSection>
          <LikesAndViews
            views={post.views}
            likeUser={post.likes}
            totalLikes={post.totalLikes}
            studyId={post.id}
            userId={user.id}
          ></LikesAndViews>

          <CommentContainer id={post.id}></CommentContainer>
        </S.BottomSection>

        <S.ApplyContainer>
          <S.ApplyButton onClick={handleApplyClick}>바로지원</S.ApplyButton>
          <S.ShareButton onClick={handleShareClick}>공유하기</S.ShareButton>

          <S.LikeContainer onClick={handleLikesClick}>
            <S.LikesImg
              src={
                data.likeUsers.find((likeId) => likeId === user.id)
                  ? '/images/info/bookmark_filled.svg'
                  : '/images/info/bookmark.svg'
              }
            />
          </S.LikeContainer>
        </S.ApplyContainer>
      </S.Container>
      <Modal visible={modalVisible} name='login' onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </>
  );
};

export default MobileStudyContent;
