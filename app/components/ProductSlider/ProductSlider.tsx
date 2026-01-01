"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import type SwiperCore from "swiper";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  link: string;
}

interface ProductSliderProps {
  title: string;
  products: Product[];
}

const ProductSlider = ({ title, products }: ProductSliderProps) => {
  const swiperRef = useRef<SwiperCore>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className='container mx-auto border border-gray-200 rounded-lg p-4 mb-8'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg text-gray-800 relative pb-2 after:content-[""] after:absolute after:right-0 after:bottom-0 after:w-1/2 after:h-[2px] after:bg-[#f3534f]'>
          {title}
        </h2>
        <Link href='/products' className='text-sm text-[#19bfd3]'>
          شاهد الكل
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        grabCursor={true}
        observer={true}
        observeParents={true}
        navigation={{
          nextEl: ".product-swiper-button-next",
          prevEl: ".product-swiper-button-prev",
        }}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
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
      >
        {products.map((product, index) => (
          <SwiperSlide key={product.id}>
            <div
              className={`p-3 transition-all h-full border-r border-gray-200 ${
                index === 0 ? "border-r-0" : ""
              } ${index === products.length ? "border-r-0" : ""}`}
            >
              <Link href={product.link} className='block h-full'>
                <div className='relative h-40 mb-3'>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className='object-contain'
                  />
                </div>
                <h3 className='text-sm font-medium text-gray-800 mb-2 line-clamp-2'>
                  {product.title}
                </h3>
                <div className='mt-auto'>
                  <div className='flex items-center justify-end mt-2'>
                    <span className='flex items-center text-gray-800'>
                      {product.price.toLocaleString()}{" "}
                      <span className='text-[10px] mr-1'>ريال</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}

        <div
          className={` product-swiper-button-next absolute top-1/2 z-10 -translate-y-1/2  w-10 h-10 rounded-full shadow-md border border-gray-200 transition-all duration-300 flex items-center justify-center ${
            isEnd
              ? "opacity-30 cursor-not-allowed pointer-events-none"
              : "bg-white/80 hover:bg-black/80 text-gray-700 hover:text-white cursor-pointer hover:scale-110"
          }`}
          style={{ left: "13px" }}
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
          className={`product-swiper-button-prev absolute top-1/2  z-10 -translate-y-1/2 w-10 h-10 rounded-full shadow-md border border-gray-200 transition-all duration-300 flex items-center justify-center ${
            isBeginning
              ? "opacity-30 cursor-not-allowed pointer-events-none"
              : "bg-white/80 hover:bg-black/80 text-gray-700 hover:text-white cursor-pointer hover:scale-110"
          }`}
          style={{ right: "13px" }}
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
      </Swiper>
    </section>
  );
};

export default ProductSlider;
