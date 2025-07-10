import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { img } from '../carousel/img/data'; // Make sure the path is correct
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css'

function CarouselEffect() {
  return (
    <>
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
       showIndicators={false}
    >
      {img.map((imageItemLink, index) => (
        <div key={index}>
          <img src={imageItemLink} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>
    {/* <div className={img_hero}></div> */}
    <div className="img_hero"></div>

    </>
    
  );
  
}

export default CarouselEffect;
