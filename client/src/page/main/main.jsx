import React, { useEffect } from 'react';
import Navbar from 'component/nav_bar/navbar';
import Rating from 'component/rating/rating';
import { MainContent } from 'domains/main/component/mainContent';
import { Carousel } from 'domains/main/component/mainCarousel';
import TopButton from 'component/top_button/TopButton';
import Footer from 'component/footer/footer';
import Trending from 'domains/main/component/trending';
import { useEventLog } from 'domains/main/hooks/useEventLog';

const Main = () => {
  const { mutate } = useEventLog();

  useEffect(() => {
    if (window.innerWidth < 767) return;
    mutate({ advertisementId: '664b61d9f0265e00139fba51', logType: 'impression' });
  }, []);

  return (
    <>
      <Navbar />
      <Carousel />
      <Trending />
      <MainContent />
      <TopButton />
      <Rating />
      <Footer />
    </>
  );
};
export default Main;
