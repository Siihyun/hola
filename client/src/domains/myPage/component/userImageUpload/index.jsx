import React, { useEffect, useRef } from 'react';
import styles from './style.module.css';
import { defaultImgSrc } from 'common/constant';

const UserImageUpload = ({ imageUrl, imageFile, handleImageChange }) => {
  const imageSrc = `https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${imageUrl}`;
  const imageBlobToUrl = useRef(null);

  const onImageUploadClick = async (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const makeBlobUrl = (imageFile) => {
    if (imageBlobToUrl.current) URL.revokeObjectURL(imageBlobToUrl.current);
    imageBlobToUrl.current = URL.createObjectURL(imageFile);
    return imageBlobToUrl.current;
  };

  useEffect(() => {
    return () => {
      if (imageBlobToUrl.current) URL.revokeObjectURL(imageBlobToUrl.current);
    };
  }, []);

  return (
    <div className={styles.imageContainer}>
      <label className={styles.profileContainer}>
        <img
          className={styles.userImg}
          src={imageFile ? makeBlobUrl(imageFile) : imageSrc}
          alt='user avatar'
          onError={(event) => {
            event.currentTarget.src = defaultImgSrc;
          }}
        />
        <img
          className={styles.profileEditBtn}
          src={'/images/info/profile_edit.png'}
          alt='profile edit'
        />
        <input id='imageUpload' type='file' accept='image/*' onChange={onImageUploadClick} />
      </label>
    </div>
  );
};

export default UserImageUpload;
