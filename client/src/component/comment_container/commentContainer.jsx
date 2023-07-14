import React, { useEffect, useState } from 'react';
import CommentInput from 'component/comment_input/commentInput';
import CommentList from 'component/comment_list/commentList';
import studyService from 'service/study_service';
import { useSelector } from 'react-redux';
import Modal from 'component/modal/modal_component/modal';
import LoginModal from 'component/modal/login_modal/loginModal';
import { useModal } from 'hooks/useModal';

const CommentContainer = ({ id }) => {
  const { openModal, closeModal, modalVisible } = useModal();
  const [commentList, setCommentList] = useState([]);
  const [content, setContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const { id: userId, imageUrl } = useSelector((state) => state.user);

  // 댓글 등록 버튼
  const onRegisterClick = async (e) => {
    if (!content) return;

    if (userId === undefined) {
      openModal();
      return;
    }
    await studyService.registerComment({ id, content });
    setContent('');
    setIsComplete((isComplete) => !isComplete);
  };

  useEffect(() => {
    studyService.getComments(id).then((response) => {
      setCommentList(response.data.comments);
    });
  }, [id, isComplete]);

  return (
    <div style={{ paddingBottom: '80px' }}>
      <CommentInput
        content={content}
        setContent={setContent}
        onRegisterClick={onRegisterClick}
        count={commentList.length}
        imageUrl={imageUrl}
      ></CommentInput>
      <CommentList
        CommentList={commentList}
        setIsComplete={setIsComplete}
        isComplete={isComplete}
      ></CommentList>
      <Modal visible={modalVisible} name='login' onClose={closeModal}>
        <LoginModal handleClose={closeModal} tabIndex={0}></LoginModal>
      </Modal>
    </div>
  );
};

export default CommentContainer;
