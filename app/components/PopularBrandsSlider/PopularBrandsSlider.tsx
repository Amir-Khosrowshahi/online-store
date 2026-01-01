"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";

import type SwiperCore from "swiper";

const popularBrands = [
  {
    id: 1,
    name: "سامسونج",
    logo: "/images/Images_brands/samsung.jpg",
    link: "/brands/samsung",
  },
  {
    id: 3,
    name: "هواوي",
    logo: "/images/Images_brands/huawei.png",
    link: "/brands/huawei",
  },
  {
    id: 4,
    name: "شاومي",
    logo: "/images/Images_brands/xiaomi.png",
    link: "/brands/xiaomi",
  },
  {
    id: 5,
    name: "سوني",
    logo: "/images/Images_brands/sony.jpg",
    link: "/brands/sony",
  },
  {
    id: 6,
    name: "إل جي",
    logo: "/images/Images_brands/lg.webp",
    link: "/brands/lg",
  },
  {
    id: 7,
    name: "نوكيا",
    logo: "/images/Images_brands/nokia.png",
    link: "/brands/nokia",
  },
  {
    id: 8,
    name: "انكر",
    logo: "/images/Images_brands/Anker.webp",
    link: "/brands/nokia",
  },
];

const PopularBrandsSlider = () => {
  const swiperRef = useRef<SwiperCore>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className='container mx-auto  my-12 border border-[#eae3e3] p-[29px] rounded-[9px]'>
      <h2 className='text-xl text-[#000000] text-center mb-8 flex items-center justify-center gap-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1024 1024'
          className='svg-icon'
          style={{
            width: "1em",
            height: "1em",
            verticalAlign: "middle",
            overflow: "hidden",
            fill: "#f9a825",
            fontSize: "22px",
          }}
        >
          <path d='M995.813 188.052c-0.859-1.92-1.76-3.82-2.809-5.72 0.81 2.68 1.34 5.36 1.619 8.07 0.01 0.09 0.01 0.18 0.03 0.28 0.11 1.06 0.159 2.14 0.18 3.2 0.011 0.5 0.021 0.97 0.011 1.47 0 0.37-0.011 0.78-0.031 1.15-3.149 68.159-169.078 147.988-290.876 218.907-12.399 7.221-24.479 14.32-36.22 21.36-108.988 52.089-190.634 122.249-251.697 195.919-21.095 24.569-40.37 50.979-58.165 80.089-101.169 159.528-118.579 311.217-118.579 311.217 46.944-63.819 90.649-115.229 131.889-157.688 1.23-1.29 2.51-2.57 3.755-3.84 3.22-3.3 6.43-6.56 9.62-9.729 71.104-70.27 155.499-126.439 231.408-172.339 91.029-51.409 175.788-91.429 268.566-185.588 38.221-38.8 67.1-76.849 87.47-113.168 17.159-29.23 22.35-47.1 22.97-49.41 20.189-55.191 19.4-104.65 0.859-144.18zM456.271 218.918c10.181 0 20.858-0.725 32.117-2.296 54.949-85.259 136.668-169.168 212.588-199.138-99.699 0-189.843 46.77-245.533 88.399-59.4-6.095-108.713-13.229-152.948-13.229-37.565 0-71.465 5.141-104.804 20.429 5.995 0.28 11.805 0.99 17.47 2.08 77.953 15.167 128.643 103.755 241.11 103.755z' />
          <path d='M683.801 55.271c140.297-0.005 217.465 105.948 220.303 218.359 10.551-7.18 29.57-21.419 29.57-21.419l5.8-4.55c9.81-7.83 18.58-15.629 26.12-23.37 3.74-12.25 6.609-24.41 8.52-36.319 1.92-11.93 2.88-23.62 2.84-34.97-0.199-37.79-11.779-71.679-37.569-97.159C903.486 20.361 857.473 0.007 806.701 0.006c-28.672-0.001-58.856 6.488-89.605 20.408-19.659 8.89-39.539 20.83-59.408 36.04a294.94 294.94 0 0 1 26.113-1.183zM33.858 348.35c-1.685 4.14-4.815 12.25-4.815 12.25l-6.1 32.29C-46.371 659.737 314.23 693.837 314.23 693.837S51.823 496.959 33.858 348.35z' />
          <path d='M239.276 139.112c-4.81-2.15-14.335-5.85-14.335-5.85l-20.21-6.87c-13.44-3.842-26.646-6.053-39.692-6.053-24.237 0-47.937 7.623-71.662 26.573-65.58 52.529-65.439 151.288-40.805 231.467 28.851-124.548 125.83-211.337 186.704-239.267z' />
        </svg>
        أشهر الماركات
      </h2>

      <div className='relative'>
        <Swiper
          modules={[Navigation, Autoplay]}
          grabCursor={true}
          observer={true}
          observeParents={true}
          navigation={{
            nextEl: ".brands-swiper-button-next",
            prevEl: ".brands-swiper-button-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 16 },
            480: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 24 },
            1024: { slidesPerView: 5, spaceBetween: 28 },
            1280: { slidesPerView: 6, spaceBetween: 32 },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          className='py-4'
        >
          {popularBrands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <Link href={brand.link} className='block'>
                <div className='flex flex-col items-center bg-white'>
                  <div className='relative w-24 h-24'>
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className='object-contain mx-auto transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-md'
                      sizes='(max-width: 640px) 100px, (max-width: 768px) 120px, 150px'
                    />
                  </div>
                  <span className='mt-3 text-[13px]  text-[#1f1e1e] font-medium'>
                    {brand.name}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={`brands-swiper-button-next absolute top-1/2 z-10 -translate-y-1/2  w-10 h-10 rounded-full shadow-md border border-gray-200 transition-all duration-300 flex items-center justify-center ${
            isEnd
              ? "opacity-30 cursor-not-allowed pointer-events-none"
              : "bg-white/80 hover:bg-black/80 text-gray-700 hover:text-white cursor-pointer hover:scale-110"
          }`}
          style={{ left: "5px" }}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </div>

        <div
          className={`brands-swiper-button-prev absolute top-1/2  z-10 -translate-y-1/2 w-10 h-10 rounded-full shadow-md border border-gray-200 transition-all duration-300 flex items-center justify-center ${
            isBeginning
              ? "opacity-30 cursor-not-allowed pointer-events-none"
              : "bg-white/80 hover:bg-black/80 text-gray-700 hover:text-white cursor-pointer hover:scale-110"
          }`}
          style={{ right: "5px" }}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default PopularBrandsSlider;
