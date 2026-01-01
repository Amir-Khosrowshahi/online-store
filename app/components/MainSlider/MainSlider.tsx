"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { Autoplay } from "swiper/modules";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const verticalSlides = [
  { id: 1, src: "/images/Main__silder/Main_slider1.webp" },
  { id: 2, src: "/images/Main__silder/Main_slider2.webp" },
  { id: 3, src: "/images/Main__silder/Main_slider3.webp" },
];

function MainSlider() {
  return (
    <div>
      <Swiper
        className='mySwiper swiper-h'
        spaceBetween={50}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-neutral-900" style="background: white;opacty:.3;width:7px;height:7px"></span>`;
          },
        }}
        modules={[Pagination, Autoplay, Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
      >
        {verticalSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={"#"}>
              <Image
                src={slide.src}
                alt=''
                width={2880}
                height={600}
                className='w-full h-[230px] sm:h-[400px] md:h-[400px] object-cover'
              />
            </Link>
          </SwiperSlide>
        ))}
        <div className='swiper-button-next'></div>
        <div className='swiper-button-prev'></div>
      </Swiper>
    </div>
  );
}

export default MainSlider;
