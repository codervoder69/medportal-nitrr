import collegeImg from '../assets/nitrr-img.jpeg';
import collegeImg5 from '../assets/clgImg5.jpg';
import collegeImg6 from '../assets/clgImg6.jpg';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const images = [collegeImg,collegeImg5,collegeImg6];

  return (
    <div className="w-screen h-[56vh] overflow-hidden relative z-0">
    <Slider {...settings} className="pb-6">
    {
        images.map((url, index) => (
            <div key={index}>
            <img
                src={url}
                alt={`slide-${index}`}
                className="w-full h-[56vh] object-cover"
            />
            </div>
        ))
    }
</Slider>

    </div>

  );
};

export default HomeSlider;
