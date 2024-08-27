import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Slide {
  image: string;
  caption: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

const SliderWrapper = styled.div`
  width: 100%;
  margin: auto;

  .slick-slide img {
    display: block;
    margin: auto;
    width: 100%;
    max-width: none;
  }

  .slick-dots li button:before {
    color: rgb(237, 58, 86);
  }
`;

const Caption = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  color: #333;
`;

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <Caption>{slide.caption}</Caption>
          </div>
        ))}
      </Slider>
    </SliderWrapper>
  );
};

export default ImageSlider;
