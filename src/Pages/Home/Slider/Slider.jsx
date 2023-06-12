import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "./Slider.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";

import img1 from "../../../assets/slider-04.jpg";
import img2 from "../../../assets/slider-05.jpg";
import img3 from "../../../assets/slider-06.jpg";

const Slider = () => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={"1"}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
          1536: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        loop
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper mt-7"
      >
        <SwiperSlide className="relative ">
          <div className=" absolute top-0 left-0 text-[#721227] h-full w-full  grid grid-cols-1 content-center space-y-3 md:space-y-5 pl-4 md:pl-8 rounded-lg">
            <h1 className=" hidden md:block text-4xl lg:text-6xl font-bold">
              Master the Art of <br></br> Design at<br></br> Couture Castle
            </h1>
            <h1 className=" text-4xl font-bold md:hidden">
              Master the Art of Design at<br></br> Couture Castle
            </h1>
            <p className=" text-[#ac546c] text-xl">
              Discover the secrets of haute couture and turn your passion for
              fashion <br></br>into a thriving career.
            </p>
          </div>
          <img
            src={img1}
            className="rounded-lg h-[400px] md:h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="relative ">
          <div className=" absolute top-0 left-0 text-[#721227] h-full w-full  grid grid-cols-1 content-center space-y-3 md:space-y-5 pl-4 md:pl-8 rounded-lg">
            <h1 className=" hidden md:block text-4xl lg:text-6xl font-bold">
              Enroll today and become <br></br>the next fashion sensation!
            </h1>
            <h1 className=" text-4xl font-bold md:hidden">
              Enroll today <br></br> and become<br></br> the next fashion
              sensation!
            </h1>
            <p className=" text-[#ac546c] text-xl">
              Elevate your fashion aspirations to new heights<br></br> with
              Couture Castle!
            </p>
          </div>
          <img
            src={img2}
            className="rounded-lg h-[400px] md:h-full w-full  object-fill"
          />
        </SwiperSlide>
        <SwiperSlide className="relative ">
          <div className=" absolute top-0 left-0 text-[#721227] h-full w-full  grid grid-cols-1 content-center space-y-3 md:space-y-5 pl-4 md:pl-8 rounded-lg">
            <h1 className=" hidden md:block text-4xl lg:text-6xl font-bold">
              Unlock Your Fashion <br></br> Potential
            </h1>
            <h1 className=" text-4xl font-bold md:hidden">
              Unlock Your Fashion Potential
            </h1>
            <p className=" text-[#ac546c] text-xl">
              From sketch to runway, Couture Castle is your gateway <br></br>to
              designing your fashion empire.
            </p>
          </div>
          <img
            src={img3}
            className="rounded-lg h-[400px] md:h-full w-full  object-cover "
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
