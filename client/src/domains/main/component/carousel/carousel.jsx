import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FirstBanner, InstagramBanner, SecondBanner } from 'component/banner';
import CommonBanner from 'component/banner/commonBanner';

export const Carousel = () => {
  const settings = {
    dots: true, //화면아래 컨텐츠 갯수 표시
    autoplay: true, // 자동 스크롤 사용 여부
    autoplaySpeed: 5000, // 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
    draggable: true, //드래그 가능 여부
    infinite: true, //무한반복옵션
    lazyLoad: true,
    speed: 400, //다음버튼 누르고 다음화면 뜨는데까지 걸리는 시간
    slidesToShow: 1, //화면에 보여질 개수
    arrows: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          dots: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      <CommonBanner
        title='Hola! 공식 인스타그램 OPEN!'
        subTitle='지금 팔로우하고 다양한 올라 소식을 만나보세요 👋'
        imgSrc='/images/banner/33.png'
        link='https://instagram.com/holaworld_official'
        badgeTitle='NOTICE'
        bgColor='#ffeae9'
        badgeBgColor='#fb817f'
        badgeTextColor='#ffffff'
      />
      {/* <InstagramBanner />
      <SecondBanner />
      <FirstBanner /> */}
    </Slider>
  );
};
