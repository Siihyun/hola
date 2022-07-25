import React from 'react';
import Navbar from 'component/nav_bar/navbar';
import { DesktopFilter } from 'component/filter/desktop';

import Rating from 'component/rating/rating';
import { MainContent } from 'component/mainContent';
import { Carousel } from 'component/carousel';
import TopButton from 'component/top_button/TopButton';

const Main = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      <DesktopFilter />
      <MainContent />
      <TopButton />
      <Rating />
    </>
  );
};
export default Main;
