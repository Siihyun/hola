import { useGetUserInfo } from 'domains/myPage/hooks/useGetUserInfo';
import Modal from '../modal_component/modal';
import styles from './userDetailModal.module.css';
import { userSkillOption } from 'common/options';
import { defaultImgSrc } from 'common/constant';

const getPositionToText = (position) => {
  switch (position) {
    case 'FE':
      return '프론트엔드 개발자';
    case 'BE':
      return '백엔드 개발자';
    case 'DE':
      return '디자이너';
    case 'IOS':
      return 'IOS 개발자';
    case 'AND':
      return '안드로이드 개발자';
    case 'DEVOPS':
      return '데브옵스 엔지니어';
    case 'PM':
      return 'PM';
    case 'PD':
      return '기획자';
    default:
      return '';
  }
};
const UserDetailModal = ({ id, isOpen, closeModal }) => {
  const { isLoading, data } = useGetUserInfo(id);

  if (isLoading) return <></>;

  const {
    nickName,
    position,
    organizationName,
    organizationIsOpen,
    likeLanguages,
    image,
    introduce,
    urls,
    workExperience,
  } = data;
  return (
    <Modal visible={isOpen} name='userInfo' onClose={closeModal}>
      <div className={styles.wrapper}>
        <div className={styles.upSection}>
          <div className={styles.modalHeader}>
            <img
              className={styles.backButton}
              src='/images/info/close.png'
              alt='backBtn'
              onClick={closeModal}
            />
          </div>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={`https://hola-post-image.s3.ap-northeast-2.amazonaws.com/${image}`}
              alt='user avatar'
              onError={(event) => {
                event.currentTarget.src = defaultImgSrc;
              }}
            />
          </div>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.nickname}>{nickName}</div>

          <div className={styles.careerInfo}>
            {position && <div className={styles.position}>{getPositionToText(position)}</div>}
            {workExperience && (
              <div className={styles.workExperience}>
                {workExperience === '10' ? '10년 이상' : `${workExperience}년차`}
              </div>
            )}
            {organizationIsOpen && organizationName && (
              <div className={styles.organizationName}>{organizationName}</div>
            )}
          </div>

          <div className={styles.likeLanguagesConatiner}>
            <div className={styles.languagesText}>관심 스택</div>
            <ul className={styles.likeLanguages}>
              {likeLanguages.map((lang, idx) => (
                <li key={idx} className={styles.languageItem}>
                  {
                    Object.values(userSkillOption)
                      .flat()
                      .find((t) => t.value === lang).label
                  }
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.introduces}>
            {introduce ? introduce : 'Hola! 만나서 반가워요!'}
          </div>
          <ul className={styles.urls}>
            {urls.map((urlItem, idx) => {
              const { urlType, url } = urlItem;

              return (
                <li key={(url, idx)}>
                  <a href={url} target='_blank' rel='noreferrer'>
                    <img
                      className={styles.urlItem}
                      src={`/images/logo/${urlType.toLowerCase()}.png`}
                      alt='url'
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
