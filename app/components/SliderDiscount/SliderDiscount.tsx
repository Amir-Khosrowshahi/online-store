"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "سماعات بلوتوث ريمكس موديل RB-S۱",
    image: "/images/Product_details_image/Image_details.jpg",
    price: 12100000,
    oldPrice: 11000000,
    discount: 89,
    link: "product/product-1",
    category: "جوال",
  },
  {
    id: 2,
    name: "سماعات بي سيز موديل Q20",
    image: "/images/Image_product_slider/product-2.webp",
    price: 1450000,
    oldPrice: 1200000,
    discount: 88,
    link: "product/product-2",
    category: "إكسسوارات",
  },
  {
    id: 3,
    name: "لابتوب اسوس موديل Vivobook 15",
    image: "/images/Image_product_slider/product-3.webp",
    price: 18500000,
    oldPrice: 15000000,
    discount: 88,
    link: "product/product-3",
    category: "لابتوب",
  },
  {
    id: 4,
    name: "تلفزيون ال جي 55 انش",
    image: "/images/Image_product_slider/product-4.webp",
    price: 22500000,
    oldPrice: 18000000,
    discount: 0,
    link: "product/product-4",
    category: "تلفزيون",
  },
  {
    id: 5,
    name: "ثلاجة سايد باي سايد دوو",
    image: "/images/Image_product_slider/product-5.webp",
    price: 32500000,
    oldPrice: 25000000,
    discount: 86,
    link: "product/product-5",
    category: "أجهزة منزلية",
  },
  {
    id: 6,
    name: "غسالة ملابس ال جي 8 كيلو",
    image: "/images/Image_product_slider/product-6.webp",
    price: 18500000,
    oldPrice: 15000000,
    discount: 85,
    link: "product/product-6",
    category: "أجهزة منزلية",
  },
  {
    id: 7,
    name: "كاميرا كانون EOS 2000D",
    image: "/images/Image_product_slider/product-7.webp",
    price: 28500000,
    oldPrice: 22000000,
    discount: 84,
    link: "product/product-7",
    category: "كاميرا",
  },
  {
    id: 8,
    name: "بلايستيشن 5",
    image: "/images/Image_product_slider/product-8.webp",
    price: 24500000,
    oldPrice: 19000000,
    discount: 83,
    link: "product/product-8",
    category: "ألعاب",
  },
  {
    id: 9,
    name: "تابلت سامسونج جالاكسي تاب A8",
    image: "/images/Image_product_slider/product-9.webp",
    price: 12500000,
    oldPrice: 10000000,
    discount: 82,
    link: "product/product-9",
    category: "تابلت",
  },
  {
    id: 10,
    name: "ساعة أذكى أبل سيريس 8",
    image: "/images/Image_product_slider/product-10.webp",
    price: 18500000,
    oldPrice: 15000000,
    discount: 81,
    link: "product/product-10",
    category: "أدوات ذكية",
  },
];

type TimeKey = "hours" | "minutes" | "seconds";

function SliderDiscount() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1;
        const newMinutes = newSeconds < 0 ? prev.minutes - 1 : prev.minutes;
        const newHours = newMinutes < 0 ? prev.hours - 1 : prev.hours;

        return {
          hours: newHours >= 0 ? newHours : 0,
          minutes: newMinutes >= 0 ? newMinutes : 59,
          seconds: newSeconds >= 0 ? newSeconds : 59,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className='container mx-auto p-5 mt-4 bg-[#dd314e] rounded-md relative'>
      <div className='flex flex-col lg:flex-row w-full gap-5 items-start h-auto lg:h-[316px]'>
        <div className='w-[20%] h-full p-3 text-center hidden lg:flex lg:flex-col gap-[15px]'>
          <h2 className='font-bold  sm:text-[29px] xl:text-[32px] leading-[37px]'>
            عرض رائع
          </h2>
          <div className='text-white p-2 rounded-md mb-4'>
            <div className='flex gap-[4px] justify-center items-center right-0 h-6 order-3 lg:order-2'>
              <div className='flex flex-col items-center justify-center bg-white w-[30px] h-[30px] rounded-sm'>
                <div className='flex justify-center items-center text-subtitle-strong text-neutral-800 text-center w-[30px] h-[30px]'>
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
              </div>
              <div className='text-subtitle-strong text-white w-1'>:</div>
              <div className='flex flex-col items-center justify-center bg-white w-[30px] h-[30px] rounded-sm'>
                <div className='flex justify-center items-center text-subtitle-strong text-neutral-800 text-center w-[30px] h-[30px]'>
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
              </div>
              <div className='text-subtitle-strong text-white w-1'>:</div>
              <div className='flex flex-col items-center justify-center bg-white w-[30px] h-[30px] rounded-sm'>
                <div className='flex justify-center items-center text-subtitle-strong text-neutral-800 text-center w-[30px] h-[30px]'>
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={"/images/Image__static/discount.png"}
              width={70}
              height={70}
              alt=''
              title=''
              className='mx-auto'
            />
          </div>
          <div className='space-y-3'>
            <Link
              href={"/special-offers"}
              className='w-full px-4 mt-2 bg-[#dd314e] text-white py-1.5 rounded-md text-sm hover:bg-[#c02a45] transition'
            >
              شاهد الكل
            </Link>
          </div>
        </div>

        <div className='w-full block lg:hidden  lg:w-[20%] h-auto lg:h-full p-3 text-center flex flex-row lg:flex-col gap-[10px] items-center justify-center flex-wrap lg:flex-nowrap'>
          <div className='shrink-0'>
            <Image
              src={"/images/Image__static/discount.png"}
              width={30}
              height={30}
              alt=''
              title=''
              className='mx-auto'
            />
          </div>
          <h2 className='font-bold text-[14px] lg:text-[25px] leading-[20px] lg:leading-[37px] text-white whitespace-nowrap'>
            عرض رائع
          </h2>

          <div className='text-white p-2 rounded-md mb-0 lg:mb-4'>
            <div className='flex flex-row gap-[4px] justify-center items-center h-6'>
              {(["seconds", "minutes", "hours"] as TimeKey[]).map(
                (key, idx) => (
                  <React.Fragment key={key}>
                    <div className='flex flex-col items-center justify-center bg-white w-[30px] h-[30px] rounded-sm'>
                      <div className='text-neutral-800 text-center'>
                        {timeLeft[key].toString().padStart(2, "0")}
                      </div>
                    </div>
                    {idx !== 2 && <div className='text-white w-1'>:</div>}
                  </React.Fragment>
                )
              )}
            </div>
          </div>

          <div className='space-y-3'>
            <Link
              href={"/special-offers"}
              className='w-full px-4 mt-2 bg-[#dd314e] text-white py-1.5 rounded-md text-sm hover:bg-[#c02a45] transition'
            >
              شاهد الكل
            </Link>
          </div>
        </div>

        <div className='w-full lg:w-[80%]'>
          <Swiper
            slidesPerView={2}
            spaceBetween={8}
            grabCursor={true}
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            observer={true}
            observeParents={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              500: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className='mySwiper'
          >
            {products.map((item) => (
              <SwiperSlide key={item.id}>
                <div className='bg-white p-2 rounded-lg shadow-md mx-1 hover:shadow-lg transition-all duration-300 relative flex flex-col h-[280px] sm:h-[300px]'>
                  <Link href={item.link} className='block h-full flex flex-col'>
                    <div className='relative h-32 sm:h-36 mb-2'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={132}
                        height={132}
                        className='object-contain w-full h-full rounded-t-lg'
                      />
                    </div>
                    <h3 className='text-[13px] font-bold text-[#787c82] leading-[20px] line-clamp-2'>
                      {item.name}
                    </h3>
                    <div className='mt-auto'>
                      {item.discount ? (
                        <div className='flex flex-col gap-1'>
                          <div className='flex items-center justify-between px-1'>
                            <span className='bg-[#f3534f] text-white px-1.5 py-0.5 rounded-md text-[11px]'>
                              %{item.discount}
                            </span>
                            <div className='flex items-center text-gray-800'>
                              <span>{item.price.toLocaleString()}</span>
                              <span className='text-[10px] mr-1'>ريال</span>
                            </div>
                          </div>
                          <div className='text-left px-1'>
                            <span className='text-gray-400 line-through text-[11px]'>
                              {item.oldPrice.toLocaleString()} ريال
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className='text-left px-1'>
                          <div className='text-gray-800'>
                            <span>{item.price.toLocaleString()}</span>
                            <span className='text-[10px] mr-1'>ريال</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}

            <div className='swiper-button-next text-white'></div>
            <div className='swiper-button-prev text-white'></div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default SliderDiscount;
