"use client";
import { useState } from "react";

import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  Clock,
  Percent,
  Box,
} from "react-feather";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  isFavorite: boolean;
  seller: string;
  guarantee: string;
};

const SpecialOffers = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "جوال سامسونج جلاكسي S23 Ultra ثنائي الشريحة سعة 256 جيجابايت",
      price: 45000000,
      originalPrice: 52000000,
      discount: 13,
      rating: 4.7,
      image: "/images/Image_product_slider/product-1.webp",
      isFavorite: true,
      seller: "المتجر الرسمي",
      guarantee: "١٨ شهر ضمان شركة",
    },
    {
      id: 2,
      name: "لابتوب 15.6 انش اسوس موديل Vivobook 15 X1500EA-EJ3378",
      price: 32000000,
      originalPrice: 37000000,
      discount: 14,
      rating: 4.3,
      image: "/images/Image_product_slider/product-2.webp",
      isFavorite: false,
      seller: "الموزع الرسمي لاسوس",
      guarantee: "٢٤ شهر ضمان شركة",
    },
    {
      id: 3,
      name: "سماعات سوني لاسلكية موديل WH-1000XM4",
      price: 15000000,
      originalPrice: 18000000,
      discount: 17,
      rating: 4.9,
      image: "/images/Image_product_slider/product-3.webp",
      isFavorite: false,
      seller: "المتجر الرسمي",
      guarantee: "١٢ شهر ضمان شركة",
    },
    {
      id: 4,
      name: "كاميرا كانون موديل EOS R6 Mark II Body",
      price: 68000000,
      originalPrice: 75000000,
      discount: 9,
      rating: 4.8,
      image: "/images/Image_product_slider/product-4.webp",
      isFavorite: true,
      seller: "متجر الكاميرات المتخصص",
      guarantee: "١٨ شهر ضمان شركة",
    },
    {
      id: 5,
      name: "بلايستيشن 5 النسخة الرقمية",
      price: 28000000,
      originalPrice: 32000000,
      discount: 13,
      rating: 4.9,
      image: "/images/Image_product_slider/product-5.webp",
      isFavorite: true,
      seller: "المتجر الرسمي",
      guarantee: "١٢ شهر ضمان شركة",
    },
    {
      id: 6,
      name: "بلايستيشن 5 النسخة الرقمية",
      price: 28000000,
      originalPrice: 32000000,
      discount: 13,
      rating: 4.9,
      image: "/images/Image_product_slider/product-6.webp",
      isFavorite: true,
      seller: "المتجر الرسمي",
      guarantee: "١٢ شهر ضمان شركة",
    },
    {
      id: 7,
      name: "بلايستيشن 5 النسخة الرقمية",
      price: 28000000,
      originalPrice: 32000000,
      discount: 13,
      rating: 4.9,
      image: "/images/Image_product_slider/product-7.webp",
      isFavorite: true,
      seller: "المتجر الرسمي",
      guarantee: "١٢ شهر ضمان شركة",
    },
    {
      id: 8,
      name: "بلايستيشن 5 النسخة الرقمية",
      price: 28000000,
      originalPrice: 32000000,
      discount: 13,
      rating: 4.9,
      image: "/images/Image_product_slider/product-8.webp",
      isFavorite: true,
      seller: "المتجر الرسمي",
      guarantee: "١٢ شهر ضمان شركة",
    },
    {
      id: 9,
      name: "بلايستيشن 5 النسخة الرقمية",
      price: 28000000,
      originalPrice: 32000000,
      discount: 13,
      rating: 4.9,
      image: "/images/Image_product_slider/product-9.webp",
      isFavorite: true,
      seller: "المتجر الرسمي",
      guarantee: "١٢ شهر ضمان شركة",
    },
    {
      id: 10,
      name: "بلايستيشن 5 النسخة الرقمية",
      price: 28000000,
      originalPrice: 32000000,
      discount: 13,
      rating: 4.9,
      image: "/images/Image_product_slider/product-10.webp",
      isFavorite: true,
      seller: "المتجر الرسمي",
      guarantee: "١٢ شهر ضمان شركة",
    },
  ]);

  const toggleFavorite = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  return (
    <div className='min-h-screen'>
      <header className='bg-[#ef394e] text-white py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div className='bg-white text-[#ef394e] rounded-lg px-3 py-1 font-bold ml-2'>
                <Percent size={20} />
              </div>
              <h1 className='text-xl font-bold'>العروض الخاصة</h1>
            </div>
            <div className='flex items-center text-sm'>
              <Clock size={16} className='ml-1' />
              <span>ينتهي في: ١٢:٤٥:٢٣</span>
            </div>
          </div>
        </div>
      </header>

      <main className='lg:container mx-auto px-4 py-6'>
        <div className='bg-white rounded-lg  mb-8 border border-gray-200'>
          <div className='p-4 border-b border-gray-200'>
            <div className='flex items-center justify-between '>
              <h2 className='text-lg font-bold text-gray-800'>
                <span className='text-[#ef394e]'>خاص</span> اليوم
              </h2>
              <div className='flex items-center text-[11px] text-gray-500'>
                <span className='flex items-center gap-1 '>
                  <Box size={16} /> عرض <span>10</span> منتج
                </span>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 overflow-hidden'>
            {products.map((product) => (
              <div
                key={product.id}
                className='border-l border-b  border-gray-200 hover:shadow-lg'
              >
                <div className='p-3 h-full relative '>
                  <div className='absolute top-3 right-3 bg-[#ef394e] text-white text-xs font-bold px-2 py-1 rounded-lg'>
                    %{product.discount}
                  </div>

                  <div className='h-40 flex items-center justify-center mb-3'>
                    <img
                      src={product.image}
                      alt={product.name}
                      className='max-h-full max-w-full'
                    />
                  </div>

                  <div>
                    <h3 className='text-sm text-gray-800 line-clamp-2 h-12 mb-2'>
                      {product.name}
                    </h3>

                    <div className='flex items-center justify-between mb-3'>
                      <div>
                        <div className='text-lg font-bold text-gray-800'>
                          {product.price.toLocaleString("ar-SA")} ريال
                        </div>
                        <div className='text-xs text-gray-500 line-through'>
                          {product.originalPrice.toLocaleString("ar-SA")}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-1 rounded-full ${
                          product.isFavorite
                            ? "text-[#ef394e]"
                            : "text-gray-400"
                        }`}
                      >
                        <Heart
                          fill={product.isFavorite ? "#ef394e" : "none"}
                          size={20}
                        />
                      </button>
                    </div>

                    <div className='text-xs text-gray-500 mb-2'>
                      <div>البائع: {product.seller}</div>
                      <div>الضمان: {product.guarantee}</div>
                    </div>

                    <button className='w-full bg-[#ef394e] text-white py-2 rounded-lg flex items-center justify-center text-sm hover:bg-[#d8384c] transition-colors'>
                      <ShoppingCart size={16} className='ml-1' />
                      أضف إلى السلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SpecialOffers;
