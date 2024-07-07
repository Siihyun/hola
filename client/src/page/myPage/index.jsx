import {
  positionsExceptAllOption,
  urlOption,
  userSkillOption,
  workExperienceOption,
} from 'common/options';
import Navbar from 'component/nav_bar/navbar';
import CustomOption from 'domains/myPage/component/customOption';
import { useGetUserInfo } from 'domains/myPage/hooks/useGetUserInfo';
import { useUpdateUserInfo } from 'domains/myPage/hooks/useUpdateUserInfo';
import { fotmatToReactSelect } from 'common/utils/formatToReactSelect';
import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import * as S from './styled';
import OrginazationRadioGroup from 'component/organizationRadioGroup';
import UserImageUpload from 'domains/myPage/component/userImageUpload';
import { useUploadImage } from 'domains/myPage/hooks/useUploadImage';
import studyService from 'service/study_service';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from 'domains/myPage/component/schema';
import { textareaPlaceHolderMaker } from 'domains/myPage/utils';
import { clearUser, setUser } from 'store/user';
import { useCancelId } from 'domains/myPage/hooks/useCancelId';
import Modal from 'component/modal/modal_component/modal';
import CancelButton from 'component/cancelButton/cancelButton';
import { useModalState } from 'hooks/useModalCustom';
import { toast } from 'react-toastify';
import { clearStep } from 'store/loginStep';
import { useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';

const Mypage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });
  const [imageFile, setImageFile] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const uploadUserImage = useUploadImage();
  const { isLoading, data } = useGetUserInfo(user.id);
  const { mutate: updateUserInfo } = useUpdateUserInfo();
  const { modalVisible, openModal, closeModal } = useModalState();
  const deleteAccount = useCancelId();
  const history = useHistory();
  const userSkillOptionFlat = Object.values(userSkillOption).flat();

  const {
    formState: { isDirty, dirtyFields, errors },
    control,
    handleSubmit,
    register,
    reset,
    getValues,
  } = useForm({ resolver: zodResolver(validationSchema) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'urls',
  });

  const onSubmit = async (inputData) => {
    if (!isDirty && !imageFile) return;

    let imageUrl = null;
    if (imageFile) {
      const { preSignedUrl, fileName } = await studyService.getPresignedUrl(user.nickName);
      imageUrl = fileName;
      await uploadUserImage({ preSignedUrl, imageFile, fileName });
    }

    const submitData = {
      ...(dirtyFields.nickName && { nickName: inputData.nickName }),
      likeLanguages: inputData.likeLanguages.map((lang) => lang.value),
      organizationName: inputData.organizationName,
      organizationIsOpen: inputData.organizationIsOpen,
      position: inputData.position.value,
      introduce: inputData.introduce,
      workExperience: inputData.workExperience.value,
      image: imageUrl ?? getValues('image'),
      urls: inputData.urls.map(({ url, urlType }) => ({ url, urlType: urlType.value })),
    };

    updateUserInfo(
      { id: user.id, userData: submitData },
      {
        onSuccess: (res) => {
          const { isExists } = res.user.data;

          if (isExists) {
            toast.error('닉네임이 중복되었어요!', {
              position: 'top-right',
              autoClose: 3000,
            });
            return;
          }
          dispatch(setUser({ key: 'nickName', value: inputData.nickName }));
          toast.success('변경이 완료되었어요!', {
            position: 'top-right',
            autoClose: 3000,
          });
        },
      },
    );
  };

  useEffect(() => {
    if (user.id === undefined) {
      toast.error('로그인이 필요한 페이지입니다.', {
        position: 'top-right',
        autoClose: 3000,
      });
      history.push('/');
    }
  }, [history, user.id, user.nickName]);

  useEffect(() => {
    if (isLoading) return;

    const urls = data?.urls.map((urlInfo) => ({
      url: urlInfo.url,
      urlType: fotmatToReactSelect(urlOption, urlInfo.urlType),
    }));

    const {
      nickName,
      organizationName,
      organizationIsOpen,
      introduce,
      workExperience,
      position,
      likeLanguages,
      image,
    } = data;

    const valueTobeUpdated = {
      nickName,
      organizationName,
      organizationIsOpen,
      introduce,
      workExperience: fotmatToReactSelect(workExperienceOption, workExperience),
      position: fotmatToReactSelect(positionsExceptAllOption, position),
      likeLanguages: fotmatToReactSelect(userSkillOptionFlat, likeLanguages),
      image,
      urls,
    };

    reset(valueTobeUpdated);
  }, [data]);

  const customStyleMaker = (styles) => {
    return {
      control: (css) => ({
        ...css,
        ...styles,
      }),
      indicatorSeparator: (base) => ({ ...base, display: 'none' }),
    };
  };

  if (isLoading) return <></>;
  return (
    <>
      <Navbar isBackBtn={isMobile} />
      <S.Container>
        <UserImageUpload
          imageUrl={getValues('image')}
          imageFile={imageFile}
          handleImageChange={(file) => {
            setImageFile(file);
          }}
        />
        <S.Nickname>{user.nickName}님 환영해요.</S.Nickname>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Group>
            <S.FormItemTitle>
              닉네임 <S.RequiredDot>*</S.RequiredDot>
            </S.FormItemTitle>
            <S.FormInput placeholder='닉네임을 입력해주세요' {...register('nickName')} />
            {errors.nickName && <S.ErrorText>{errors.nickName.message}</S.ErrorText>}
          </S.Group>
          <S.Group>
            <S.FormItemTitle>
              직무 <S.RequiredDot>*</S.RequiredDot>
            </S.FormItemTitle>
            <Controller
              name='position'
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    styles={customStyleMaker({
                      maxWidth: '500px',
                      width: '100%',
                      minHeight: '48px',
                    })}
                    options={positionsExceptAllOption}
                  />
                );
              }}
            />
          </S.Group>
          <S.Group>
            <S.OrganizationInfo>
              <S.FormItemTitle>소속</S.FormItemTitle>
              <Controller
                name='organizationIsOpen'
                control={control}
                render={({ field }) => <OrginazationRadioGroup {...field} />}
              />
            </S.OrganizationInfo>
            <S.FormInput
              placeholder='소속을 입력해주세요. ex) 올라 회사, 올라 대학교... '
              {...register('organizationName')}
            />
          </S.Group>
          <S.Group>
            <S.FormItemTitle>
              경력 <S.RequiredDot>*</S.RequiredDot>
            </S.FormItemTitle>
            <Controller
              name='workExperience'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  styles={customStyleMaker({ maxWidth: '500px', width: '100%', minHeight: '48px' })}
                  options={workExperienceOption}
                />
              )}
            />
          </S.Group>

          <S.Group>
            <S.FormItemTitle>자기소개</S.FormItemTitle>
            <S.FormTextArea
              placeholder={textareaPlaceHolderMaker({
                workExperience: getValues('workExperience')?.label,
                position: getValues('position')?.label,
                nickName: getValues('nickName'),
              })}
              {...register('introduce')}
            />
          </S.Group>

          <S.Group>
            <S.FormItemTitle>
              관심분야 <S.RequiredDot>*</S.RequiredDot>
            </S.FormItemTitle>
            <Controller
              name='likeLanguages'
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    isMulti
                    styles={customStyleMaker({
                      maxWidth: '500px',
                      width: '100%',
                      minHeight: '48px',
                    })}
                    {...field}
                    options={userSkillOptionFlat}
                  />
                );
              }}
            />
            {errors.likeLanguages && <S.ErrorText>{errors.likeLanguages.message}</S.ErrorText>}
          </S.Group>

          <S.Group>
            <S.FormItemTitle>링크</S.FormItemTitle>
            <S.UrlGroup>
              {fields.map((urlItem, index) => {
                const { id } = urlItem;

                return (
                  <S.UrlContainer key={id}>
                    <S.UrlSet>
                      <S.FormInput {...register(`urls.${index}.url`)} />
                      <Controller
                        name={`urls.${index}.urlType`}
                        control={control}
                        render={({ field }) => {
                          return (
                            <Select
                              styles={customStyleMaker({ width: '160px', minHeight: '48px' })}
                              components={{ Option: CustomOption }}
                              {...field}
                              options={urlOption}
                            />
                          );
                        }}
                      />
                      <S.Trashbin src={'/images/info/delete.png'} onClick={() => remove(index)} />
                    </S.UrlSet>
                    {errors?.urls && errors.urls[index] && (
                      <S.ErrorText>{errors?.urls[index].url.message}</S.ErrorText>
                    )}
                  </S.UrlContainer>
                );
              })}
            </S.UrlGroup>
            <S.AddButton
              onClick={() => {
                append({ url: '', urlType: { value: 'Link', label: 'Link' } });
              }}
            >
              + 추가
            </S.AddButton>
          </S.Group>
          <S.ButtonContainer>
            <S.Button type='submit'>프로필 저장</S.Button>
            <S.CancelId onClick={openModal}>회원 탈퇴</S.CancelId>
          </S.ButtonContainer>
        </S.Form>
      </S.Container>
      <Modal visible={modalVisible} onClose={closeModal}>
        <CancelButton
          confirmMsg='HOLA! 정말 계정을 삭제하시겠어요?'
          positiveMsg='네, 삭제할래요'
          negativeMsg='아니요'
          onPublish={() => {
            deleteAccount(user.id, {
              onSuccess: () => {
                toast.success('회원 탈퇴가 완료되었어요!', {
                  position: 'top-right',
                  autoClose: 3000,
                });
                dispatch(clearUser());
                dispatch(clearStep());
                history.push('/');
              },
            });
          }}
          onCancel={closeModal}
        ></CancelButton>
      </Modal>
    </>
  );
};

export default Mypage;
