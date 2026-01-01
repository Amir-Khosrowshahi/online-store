"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

const stories = [
  {
    id: 1,
    title: "القصة الأولى",
    image: "/images/Image__story/Story1.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "القصة الثانية",
    image: "/images/Image__story/Story2.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "القصة الثالثة",
    image: "/images/Image__story/Story3.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "القصة الرابعة",
    image: "/images/Image__story/Story4.jpg",
    link: "#",
  },
  {
    id: 5,
    title: "القصة الخامسة",
    image: "/images/Image__story/Story5.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "القصة السادسة",
    image: "/images/Image__story/Story6.jpg",
    link: "#",
  },
  {
    id: 7,
    title: "القصة السابعة",
    image: "/images/Image__story/Story7.jpg",
    link: "#",
  },
  {
    id: 8,
    title: "القصة الثامنة",
    image: "/images/Image__story/Story8.jpg",
    link: "#",
  },
  {
    id: 9,
    title: "القصة التاسعة",
    image: "/images/Image__story/Story9.jpg",
    link: "#",
  },
  {
    id: 10,
    title: "القصة العاشرة",
    image: "/images/Image__story/Story10.jpg",
    link: "#",
  },
  {
    id: 11,
    title: "القصة الحادية عشرة",
    image: "/images/Image__story/Story11.jpg",
    link: "#",
  },
  {
    id: 12,
    title: "القصة الأخيرة",
    image: "/images/Image__story/Story12.jpg",
    link: "#",
  },
];

function SliderStory() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const skeletonSlides = Array.from({ length: 10 });

  return (
    <div className='lg:container mx-auto p-5'>
      <Swiper
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[]}
        observer={true}
        observeParents={true}
        breakpoints={{
          320: { slidesPerView: 4 },
          500: { slidesPerView: 4 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 10 },
        }}
        className='mySwiper'
      >
        {loading
          ? skeletonSlides.map((_, index) => (
              <SwiperSlide key={index}>
                <div className='w-[70px] h-[70px] md:w-[86px] md:h-[86px] rounded-full bg-gray-200 animate-pulse mx-auto' />
                <div className='w-[60px] h-3 bg-gray-200 animate-pulse mt-2 rounded mx-auto'></div>
              </SwiperSlide>
            ))
          : stories.map((story) => (
              <SwiperSlide key={story.id}>
                <div
                  className='w-[70px] h-[70px] md:w-[86px] md:h-[86px] overflow-hidden rounded-full flex items-center justify-center text-white text-xs md:text-sm'
                  style={{
                    background: "linear-gradient(315deg,#e03d96,#7d4c9e)",
                  }}
                >
                  <Link
                    href={story.link}
                    className='rounded-circle shrink-0 w-full aspect-square relative flex items-center justify-center'
                    style={{ width: "calc(100% - 1px)" }}
                  >
                    <div
                      className='rounded-full overflow-hidden bg-white aspect-square flex items-center justify-center'
                      style={{ width: "calc(100% - 3px)" }}
                    >
                      <div
                        className='rounded-full overflow-hidden flex items-center justify-center'
                        style={{
                          background: "linear-gradient(315deg,#e03d96,#7d4c9e)",
                          width: "calc(100% - 6px)",
                          height: "calc(100% - 6px)",
                        }}
                      >
                        <Image
                          src={story.image}
                          width={100}
                          height={100}
                          alt={story.title}
                          title={story.title}
                          className='w-full inline-block'
                          loading='lazy'
                        />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='md:w-[89px] text-[#0c0c0c] text-[12px] text-center mt-2 break-words'>
                  <p>{story.title}</p>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default SliderStory;
