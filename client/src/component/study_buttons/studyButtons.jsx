import React, { useState } from 'react';
import styles from './studyButtons.module.css';
import Modal from 'component/modal/modal_component/modal';
import CancelButton from 'component/cancelButton/cancelButton';
import { HolaLogEvent } from 'common/GA';

const StudyButtons = ({ handleEdit, handleDelete, isClosed, handleEnd }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [close, setClose] = useState(isClosed);
  const [isDeleteButton, setIsDeleTeButton] = useState(false);

  const openModal = (target) => {
    if (target === 'deleteModal') setIsDeleTeButton(true);
    else setIsDeleTeButton(false);
    document.body.style.overflow = 'hidden';
    setShowPopup((state) => !state);
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setShowPopup((state) => !state);
  };

  const handleStudy = () => {
    handleEnd(!close);
    closeModal();
    setClose((state) => !state);
  };

  return (
    <>
      <section className={styles.buttonWrapper}>
        <button
          className={styles.buttons}
          onClick={() => {
            HolaLogEvent('post_close');
            openModal('endModal');
          }}
        >
          {close === true ? '마감 취소' : '마감'}
        </button>
        <button
          className={styles.buttons}
          onClick={() => {
            HolaLogEvent('post_edit');
            handleEdit();
          }}
        >
          수정
        </button>
        <button
          className={styles.buttons}
          onClick={() => {
            HolaLogEvent('post_delete');
            openModal('deleteModal');
          }}
        >
          삭제
        </button>
      </section>

      <Modal visible={showPopup} onClose={closeModal}>
        {isDeleteButton ? (
          <CancelButton
            confirmMsg='작성하신 글을 삭제 하시겠어요?'
            positiveMsg='네, 삭제할래요'
            negativeMsg='아니요'
            onCancel={closeModal}
            onPublish={handleDelete}
          ></CancelButton>
        ) : (
          <CancelButton
            confirmMsg={close === true ? '마감을 취소하시겠어요?' : '마감 처리 하시겠어요?'}
            positiveMsg={close === true ? '네, 취소할게요' : '네, 마감할게요'}
            negativeMsg='아니요'
            onCancel={closeModal}
            onPublish={handleStudy}
          ></CancelButton>
        )}
      </Modal>
    </>
  );
};

export default StudyButtons;
