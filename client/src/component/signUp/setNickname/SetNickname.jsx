import React from 'react';
import styles from './setNickname.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, setSignUpUser } from 'store/loginStep';
import { toast } from 'react-toastify';
import userService from 'service/user_service';
import { HolaLogEvent } from 'common/GA';
import { addUserNickName } from 'store/user';

const SetNickname = () => {
  const dispatch = useDispatch();
  const {
    nickName,
    id,
    likeLanguages,
    position,
    isOrganizationOpen,
    organization,
    status,
    workExperience,
  } = useSelector((state) => state.loginStep);
  console.log(nickName, id, likeLanguages);
  console.log(nickName);

  const onProfileSaveClick = async () => {
    if (nickName.length > 15) {
      toast.info('닉네임은 최대 15글자 입니다.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    if (nickName.length === 0) {
      toast.info('닉네임을 입력해 주세요!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    const response = await userService.checkNickname(id, nickName);
    if (response.isExists) {
      toast.info('닉네임이 중복 되었어요!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    HolaLogEvent('sign_up_start_nickname', {
      category: 'nickName',
    });
    dispatch(
      addUserNickName({
        id,
        nickName,
        likeLanguages,
        position: position.value,
        isOrganizationOpen,
        organization,
        status,
        workExperience: workExperience.value,
      }),
    );
    dispatch(nextStep());
  };

  const handleFields = ({ key, value }) => {
    dispatch(setSignUpUser({ key, value }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <h1 className={styles.title}>닉네임을 입력해주세요</h1>
        <input
          className={styles.input}
          placeholder='닉네임 입력'
          value={nickName}
          onChange={(e) => handleFields({ key: 'nickName', value: e.target.value })}
        />
      </div>

      <button className={styles.buttonNext} onClick={onProfileSaveClick}>
        프로필 저장
      </button>
    </div>
  );
};

export default SetNickname;
