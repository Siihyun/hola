import Navbar from 'component/nav_bar/navbar';
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import { getBadgeColor, getBadgeTitle } from 'domains/eventPage/utils/getBadgeTitle';
import { differenceInDays } from 'date-fns';
import {
  getFormattedApplicationDate,
  getFormattedDate,
} from 'domains/eventPage/utils/getFormattedDate';
import useSocialShare from 'hooks/useSocialShare';
import { useSelector } from 'react-redux';
import { useAddEventLikes } from 'domains/eventPage/hooks/useAddEventLikes';
import { useDeleteEventLikes } from 'domains/eventPage/hooks/useDeleteEventLikes';
import { toast } from 'react-toastify';
import { HolaLogEvent } from 'common/GA';

const DetailMobile = ({ detailData, relativeEvents }) => {
  const { shareToKakaoTalk } = useSocialShare();
  const { id: userId } = useSelector((state) => state.user);
  const { mutate: addLikes } = useAddEventLikes();
  const { mutate: deleteLikes } = useDeleteEventLikes();
  const [liked, setLiked] = useState(false);
  const mutateFn = liked ? deleteLikes : addLikes;

  useEffect(() => {
    setLiked(detailData?.isLiked);
  }, [detailData?.isLiked]);

  //TODO:: 공유 템플릿 적용
  const handleShareClick = () => {
    HolaLogEvent('share_button_click');
    shareToKakaoTalk({
      templateId: 105815,
      templateArgs: {
        id: detailData?._id,
        title: detailData?.title,
      },
    });
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();

    if (userId === undefined) {
      toast.info('로그인이 필요합니다.');
      return;
    }
    const toastText = liked ? '관심 목록에서 제거했어요!' : '관심 목록에 추가했어요!';
    setLiked((prev) => !prev);

    mutateFn(detailData?._id, {
      onSuccess: () => {
        toast.success(toastText, {
          position: 'top-right',
          autoClose: 3000,
        });
      },
      onError: () => {
        setLiked((prev) => !prev);
        toast.error('잠시 후 다시 시도해주세요', {
          position: 'top-right',
          autoClose: 3000,
        });
      },
    });
  };

  if (!detailData) return null;

  return (
    <>
      <Navbar isBackBtn={true} />
      <section className={styles.info}>
        <div className={styles.infoWrapper}>
          <ul className={styles.badgeList}>
            <li
              style={{
                border: `1px solid ${getBadgeColor(detailData?.eventType)}`,
                color: getBadgeColor(detailData?.eventType),
              }}
              className={styles.badge}
            >
              {getBadgeTitle(detailData?.eventType)}
            </li>
            <li className={styles.deadline}>
              🔥 마감 {differenceInDays(new Date(), new Date(detailData?.applicationEndDate))}일전
            </li>
          </ul>
          <img className={styles.thumbnail} src={detailData?.imageUrl} alt='thumbnail' />
          <div className={styles.titleAndOrganization}>
            <h1 className={styles.title}>{detailData?.title}</h1>
            <span className={styles.description}>주최 | {detailData?.organization}</span>
          </div>

          <div className={styles.scheduleInfo}>
            <div className={styles.evantInfoWrapper}>
              <span className={styles.eventTitle}>일시</span>
              <span className={styles.eventSubTitle}>
                {getFormattedDate(detailData?.startDate)}
              </span>
            </div>

            <div className={styles.evantInfoWrapper}>
              <span className={styles.eventTitle}>신청</span>
              <span className={styles.eventSubTitle}>
                <span className={styles.eventSubTitle}>{`${getFormattedApplicationDate(
                  detailData?.applicationStartDate,
                )} ~\n${getFormattedApplicationDate(detailData?.applicationEndDate)}`}</span>
              </span>
            </div>

            <div className={styles.evantInfoWrapper}>
              <span className={styles.eventTitle}>장소</span>
              <span className={styles.eventSubTitle}>{detailData?.place}</span>
            </div>
          </div>
        </div>

        <div className={styles.introduceWrapper}>
          <div className={styles.introduce}>소개</div>
          <p className={styles.content} dangerouslySetInnerHTML={{ __html: detailData?.content }} />
          <div className={styles.warning}>
            * 행사의 주최는 HOLA가 아니며 자세한 정보는 신청하기 버튼을 확인하세요
          </div>

          <div>
            <span>조회수 2회</span>
            <span>북마크 2개</span>
          </div>
        </div>
      </section>

      <div className={styles.applyContainer}>
        <button
          className={styles.applyButton}
          onClick={() => (window.location.href = detailData?.link)}
        >
          지원하기
        </button>
        <button className={styles.shareButton} onClick={handleShareClick}>
          공유하기
        </button>

        <div className={styles.likeContainer}>
          <img
            onClick={handleLikeClick}
            alt='likes'
            className={styles.likesImg}
            src={liked ? '/images/info/bookmark_filled.svg' : '/images/info/bookmark.svg'}
          />
        </div>
      </div>
    </>
  );
};

export default DetailMobile;
