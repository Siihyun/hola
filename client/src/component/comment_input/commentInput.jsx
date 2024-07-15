import React from 'react';
import styles from './commentInput.module.css';
import { defaultImgSrc } from 'common/constant';

const CommentInput = ({ content, setContent, onRegisterClick, count, imageUrl }) => {
  const defaultImage = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG';

  return (
    <div className={styles.commentInput}>
      <div className={styles.comment}>
        댓글 <span className={styles.commentCount}>{count}</span>
      </div>

      <div className={styles.inputContainer}>
        <img
          className={styles.profile}
          src={imageUrl ?? defaultImage}
          alt='profile'
          onError={(event) => {
            event.currentTarget.src = defaultImgSrc;
          }}
        />
        <textarea
          className={styles.commentText}
          placeholder='댓글을 입력하세요.'
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={onRegisterClick} className={styles.buttonComplete} name='register'>
          댓글 등록
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
