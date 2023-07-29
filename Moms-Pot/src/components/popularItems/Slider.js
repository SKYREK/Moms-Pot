import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Slider = () => {
  return (
    <div className="bg-black h-screen bg-center">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full"
      >
        <SwiperSlide>
          <div className="bg-black z-20 absolute top-0 w-full h-full opacity-50">
            <img
              className="object-cover bg-center w-full h-full"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt="image slide 1"
            />
          </div>
          <div className="z-20 absolute bottom-96 justify-center flex items-end w-full h-full">
            <div className="text-9xl font-semibold text-white">
             Food made with love...
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-black z-20 absolute top-0 w-full h-full opacity-50">
            <img
              className="object-cover bg-center w-full h-full"
              src="https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80"
              alt="image slide 2"
            />
          </div>
          <div className="z-20 absolute bottom-96 justify-center flex items-end w-full h-full">
            <div className="text-9xl font-semibold text-white">
            Deliciously homemade...
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-black z-20 absolute top-0 w-full h-full opacity-50">
            <img
              className="object-cover bg-center w-full h-full"
              src="https://images.unsplash.com/photo-1535007813616-79dc02ba4021?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
              alt="image slide 3"
            />
          </div>
          <div className="z-20 absolute bottom-96 justify-center flex items-end w-full h-full">
            <div className="text-9xl font-semibold text-white">
              A taste you'll remember...
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
