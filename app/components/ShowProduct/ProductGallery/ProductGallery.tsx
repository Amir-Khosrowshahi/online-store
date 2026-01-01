"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<null>(null);

  const openModal = (index: number) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const renderThumbnails = () => {
    if (images.length <= 3) {
      return images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${title} - ${idx}`}
          className={`w-16 h-16 rounded-md border cursor-pointer object-cover hover:scale-105 transition transform ${
            activeIndex === idx
              ? "border-green-600 scale-110"
              : "border-gray-300"
          }`}
          onClick={() => openModal(idx)}
        />
      ));
    } else {
      const firstThree = images.slice(0, 4);
      return (
        <>
          {firstThree.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title} - ${idx}`}
              className={`w-16 h-16 rounded-md border cursor-pointer object-cover hover:scale-105 transition transform ${
                activeIndex === idx ? " scale-110" : "border-gray-300"
              }`}
              onClick={() => openModal(idx)}
            />
          ))}
          <div
            className='w-16 h-16 rounded-md border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100'
            onClick={() => openModal(3)}
            title={`عرض ${images.length - 3} صورة إضافية`}
          >
            <div className='flex gap-1 items-center justify-between h-6'>
              <span className='w-1 h-1 bg-gray-500 rounded-full block'></span>
              <span className='w-1 h-1 bg-gray-500 rounded-full block'></span>
              <span className='w-1 h-1 bg-gray-500 rounded-full block'></span>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      {/* الصورة الرئيسية */}
      <div className='col-span-1 flex flex-col items-center justify-center'>
        <img
          src={images[0]}
          alt={title}
          className='rounded-lg max-h-[400px] w-full object-contain cursor-pointer'
          onClick={() => openModal(0)}
        />

        {/* الصور المصغرة تحت الصورة الرئيسية */}
        <div className='mt-4 flex flex-wrap gap-3 justify-center'>
          {renderThumbnails()}
        </div>
      </div>

      {/* النافذة المنبثقة */}
      {showModal && (
        <div
          className='fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={onBackdropClick}
        >
          <div className='relative max-w-4xl w-full rounded-xl bg-white shadow-2xl p-6 flex flex-col items-center'>
            {/* زر الإغلاق */}
            <button
              className='absolute z-10 top-4 right-4 text-gray-600 hover:text-gray-900 transition'
              onClick={closeModal}
              aria-label='إغلاق النافذة'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-7 h-7'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>

            <div className='flex items-center justify-center w-full relative'>
              {/* زر الصورة السابقة */}
              <button
                className='absolute left-0 text-gray-700 hover:text-gray-900 p-2 bg-white rounded-full shadow swiper-button-next'
                aria-label='الصورة السابقة'
              ></button>

              <Swiper
                onSwiper={(swiper) => {
                  swiper.slideTo(activeIndex, 0);
                }}
                modules={[Navigation]}
                initialSlide={activeIndex}
                grabCursor={true}
                keyboard={{ enabled: true }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-prev",
                  prevEl: ".swiper-button-next",
                }}
                observer={true}
                observeParents={true}
                className='max-h-[80vh] w-full max-w-3xl rounded-lg'
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`صورة رقم ${idx + 1}`}
                      className='mx-auto max-h-[80vh] object-contain rounded-lg'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* زر الصورة التالية */}
              <button
                className='absolute right-0 text-gray-700 hover:text-gray-900 p-2 bg-white rounded-full shadow swiper-button-prev'
                aria-label='الصورة التالية'
              ></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGallery;
