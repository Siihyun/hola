import React from 'react';
import EmptyList from 'component/empty_list/emptyList';
import StudyList from 'component/study_list/studyList';
import Pagination from '@mui/material/Pagination';
import styles from './posts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { useStudySearch } from 'domains/main/hooks/useStudySearch';
import { useGetPage } from 'domains/main/hooks/useGetPage';
import { changeField, changePage } from 'store/language';
import { useGetMyLikes } from 'domains/main/hooks/useGetMyLikes';

const Posts = React.memo(() => {
  const { isLiked, search } = useSelector((state) => state.language);
  const { commonData, isLoading, page } = useStudySearch();
  const { pageData, isPageLoading } = useGetPage();
  const { likeData, isLikeLoading } = useGetMyLikes(isLiked);
  const dispatch = useDispatch();

  if (isLoading || isPageLoading || isLikeLoading) return null;

  const { lastPage } = pageData;
  const renderedPosts = isLiked ? likeData?.posts : commonData?.posts;

  return (
    <>
      {!!renderedPosts?.length ? (
        <StudyList type={search === '' ? 'organic' : 'search'} studyList={renderedPosts} />
      ) : (
        <EmptyList />
      )}
      {!isLiked && !isPageLoading && (
        <div className={styles.paginationWrapper}>
          <Pagination
            count={lastPage}
            page={page}
            onChange={(_, value) => {
              dispatch(changePage(value));
            }}
            color='primary'
            showFirstButton
            showLastButton
            size={isMobile ? 'small' : 'medium'}
            sx={{
              '& .Mui-selected, & .Mui-selected:hover': {
                backgroundColor: '#FFE579!important',
                color: '#333333!important',
              },
              '& button:hover': { backgroundColor: '#F1F1F1' },
            }}
          />
        </div>
      )}
    </>
  );
});

export default Posts;
