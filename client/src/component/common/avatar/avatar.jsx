import React from 'react';
import styles from './avatar.module.css';

export const Avatar = React.memo(({ imgPath, size, onClick }) => {
  const defaultImage = 'https://hola-post-image.s3.ap-northeast-2.amazonaws.com/default.PNG';
  const imagePath = `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${imgPath}`;
  return (
    <div className={styles.user} onClick={onClick}>
      <img
        className={styles.userImg}
        width={size}
        height={size}
        src={imagePath}
        alt='avatar'
        onError={(event) => {
          event.currentTarget.src = defaultImage;
        }}
      />
    </div>
  );
});
