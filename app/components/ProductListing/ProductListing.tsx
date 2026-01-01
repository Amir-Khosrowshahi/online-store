"use client";
import { useState } from "react";
import {
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Heart,
} from "react-feather";

import SortComponent from "./handleSortSelect/SortComponent";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  image: string;
  isFavorite: boolean;
  brand: string;
  colors: string[];
  inStock: boolean;
};

type FilterOption = {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    count: number;
  }[];
};

const ProductListing = () => {
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({
    category: true,
    price: false,
    brand: false,
    color: false,
    availability: true,
  });

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    category: [],
    price: [],
    brand: [],
    color: [],
    availability: [],
  });

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "هاتف سامسونج جالكسي S23 أولترا بشريحتي اتصال سعة 256 جيجابايت",
      price: 45000000,
      originalPrice: 52000000,
      discount: 13,
      rating: 4.7,
      image: "/images/Image_product_slider/product-1.webp",
      isFavorite: true,
      brand: "سامسونج",
      colors: ["أسود", "أخضر"],
      inStock: true,
    },
    {
      id: 2,
      name: "هاتف آيفون 13 برو ماكس 128 جيجابايت",
      price: 62000000,
      originalPrice: 68000000,
      discount: 9,
      rating: 4.8,
      image: "/images/Image_product_slider/product-2.webp",
      isFavorite: false,
      brand: "أبل",
      colors: ["أسود", "فضي"],
      inStock: true,
    },
    {
      id: 3,
      name: "هاتف شاومي ريدمي نوت 11 برو",
      price: 12000000,
      originalPrice: 15000000,
      discount: 20,
      rating: 4.3,
      image: "/images/Image_product_slider/product-3.webp",
      isFavorite: true,
      brand: "شاومي",
      colors: ["أزرق", "أبيض"],
      inStock: false,
    },
    {
      id: 4,
      name: "هاتف شاومي ريدمي نوت 11 برو",
      price: 12000000,
      originalPrice: 15000000,
      discount: 20,
      rating: 4.3,
      image: "/images/Image_product_slider/product-4.webp",
      isFavorite: true,
      brand: "شاومي",
      colors: ["أزرق", "أبيض"],
      inStock: false,
    },
    {
      id: 5,
      name: "هاتف شاومي ريدمي نوت 11 برو",
      price: 12000000,
      originalPrice: 15000000,
      discount: 20,
      rating: 4.3,
      image: "/images/Image_product_slider/product-5.webp",
      isFavorite: true,
      brand: "شاومي",
      colors: ["أزرق", "أبيض"],
      inStock: false,
    },
    {
      id: 6,
      name: "هاتف شاومي ريدمي نوت 11 برو",
      price: 12000000,
      originalPrice: 15000000,
      discount: 20,
      rating: 4.3,
      image: "/images/Image_product_slider/product-6.webp",
      isFavorite: true,
      brand: "شاومي",
      colors: ["أزرق", "أبيض"],
      inStock: false,
    },
    {
      id: 7,
      name: "هاتف شاومي ريدمي نوت 11 برو",
      price: 12000000,
      originalPrice: 15000000,
      discount: 20,
      rating: 4.3,
      image: "/images/Image_product_slider/product-7.webp",
      isFavorite: true,
      brand: "شاومي",
      colors: ["أزرق", "أبيض"],
      inStock: false,
    },
    {
      id: 8,
      name: "هاتف شاومي ريدمي نوت 11 برو",
      price: 12000000,
      originalPrice: 15000000,
      discount: 20,
      rating: 4.3,
      image: "/images/Image_product_slider/product-8.webp",
      isFavorite: true,
      brand: "شاومي",
      colors: ["أزرق", "أبيض"],
      inStock: false,
    },
    {
      id: 9,
      name: "هاتف شاومي ريدمي نوت 11 برو",
      price: 12000000,
      originalPrice: 15000000,
      discount: 20,
      rating: 4.3,
      image: "/images/Image_product_slider/product-9.webp",
      isFavorite: true,
      brand: "شاومي",
      colors: ["أزرق", "أبيض"],
      inStock: false,
    },
    {
      id: 10,
      name: "هاتف شاومي ريدمي نوت 11 برو",
      price: 12000000,
      originalPrice: 15000000,
      discount: 20,
      rating: 4.3,
      image: "/images/Image_product_slider/product-10.webp",
      isFavorite: true,
      brand: "شاومي",
      colors: ["أزرق", "أبيض"],
      inStock: false,
    },
  ]);

  const filters: FilterOption[] = [
    {
      id: "category",
      name: "الفئة",
      options: [
        { value: "mobile", label: "هواتف", count: 124 },
        { value: "laptop", label: "لابتوب", count: 56 },
        { value: "tablet", label: "تابلت", count: 32 },
      ],
    },
    {
      id: "price",
      name: "نطاق السعر",
      options: [
        { value: "0-10000000", label: "أقل من ۱۰ مليون", count: 45 },
        { value: "10000000-30000000", label: "۱۰ إلى ۳۰ مليون", count: 89 },
        { value: "30000000-50000000", label: "۳۰ إلى ۵۰ مليون", count: 42 },
        { value: "50000000+", label: "أكثر من ۵۰ مليون", count: 23 },
      ],
    },
    {
      id: "brand",
      name: "العلامة التجارية",
      options: [
        { value: "samsung", label: "سامسونج", count: 76 },
        { value: "apple", label: "أبل", count: 54 },
        { value: "xiaomi", label: "شاومي", count: 48 },
        { value: "huawei", label: "هواوي", count: 32 },
      ],
    },
    {
      id: "color",
      name: "اللون",
      options: [
        { value: "black", label: "أسود", count: 87 },
        { value: "white", label: "أبيض", count: 45 },
        { value: "blue", label: "أزرق", count: 32 },
        { value: "green", label: "أخضر", count: 28 },
      ],
    },
    {
      id: "availability",
      name: "حالة التوفر",
      options: [
        { value: "in-stock", label: "متوفر في المخزن", count: 143 },
        { value: "out-of-stock", label: "غير متوفر", count: 12 },
      ],
    },
  ];

  const toggleFilter = (filterId: string) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterId] || [];
      if (currentFilters.includes(value)) {
        return {
          ...prev,
          [filterId]: currentFilters.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [filterId]: [...currentFilters, value],
        };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      price: [],
      brand: [],
      color: [],
      availability: [],
    });
  };

  return (
    <div className='min-h-screen'>
      {/* رأس الصفحة */}
      <header className='bg-white shadow-sm py-4'>
        <div className='container mx-auto px-4'>
          <h1 className='text-xl font-bold text-gray-800'>الهواتف والتابلت</h1>
          <div className='flex items-center text-sm text-gray-500 mt-1'>
            <span>المتجر الإلكتروني</span>
            <ChevronLeft className='mx-1' size={12} />
            <span>المنتجات الرقمية</span>
            <ChevronLeft className='mx-1' size={12} />
            <span className='text-[#3f4064]'>الهواتف والتابلت</span>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className='container mx-auto px-4 py-6'>
        <div className='flex flex-col md:flex-row gap-6'>
          {/* الشريط الجانبي للفلاتر - اليمين */}
          <aside className='md:w-1/4 lg:w-1/5'>
            <div className='bg-white rounded-lg shadow-sm p-4 sticky top-4 border border-gray-200'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='font-bold text-lg text-[#3f4064] flex items-center'>
                  <Filter className='ml-2 text-[#19bfd3]' size={18} />
                  الفلاتر
                </h2>
                <button
                  onClick={clearAllFilters}
                  className='text-[#19bfd3] text-sm transition-colors'
                >
                  حذف الكل
                </button>
              </div>

              {/* عرض الفلاتر المختارة */}
              {Object.values(selectedFilters).flat().length > 0 && (
                <div className='flex flex-wrap gap-2 mb-4'>
                  {Object.entries(selectedFilters).map(([filterId, values]) =>
                    values.map((value) => (
                      <div
                        key={`${filterId}-${value}`}
                        className='bg-blue-50 rounded-full px-3 py-1 text-sm flex items-center border border-blue-100'
                      >
                        <span className='text-blue-700'>
                          {
                            filters
                              .find((f) => f.id === filterId)
                              ?.options.find((o) => o.value === value)?.label
                          }
                        </span>
                        <button
                          onClick={() => handleFilterChange(filterId, value)}
                          className='mr-1 text-blue-400 hover:text-red-500 transition-colors'
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* قائمة الفلاتر */}
              <div className='space-y-6'>
                {filters.map((filter) => (
                  <div
                    key={filter.id}
                    className='border-b border-gray-100 pb-4 last:border-0'
                  >
                    <button
                      onClick={() => toggleFilter(filter.id)}
                      className='w-full flex items-center justify-between py-2 hover:bg-gray-50 px-1 rounded transition-colors'
                    >
                      <span className='font-medium text-gray-700'>
                        {filter.name}
                      </span>
                      <ChevronDown
                        className={`transition-transform text-gray-500 ${
                          openFilters[filter.id] ? "rotate-180" : ""
                        }`}
                        size={16}
                      />
                    </button>

                    {openFilters[filter.id] && (
                      <div className='mt-2 space-y-2 pl-1'>
                        {filter.options.map((option) => (
                          <label
                            key={option.value}
                            className='flex items-center justify-between py-1.5 px-1 rounded hover:bg-gray-50 transition-colors cursor-pointer'
                          >
                            <div className='flex items-center'>
                              <input
                                type='checkbox'
                                checked={
                                  selectedFilters[filter.id]?.includes(
                                    option.value
                                  ) || false
                                }
                                onChange={() =>
                                  handleFilterChange(filter.id, option.value)
                                }
                                className='rounded text-blue-600 ml-2 border-gray-300 focus:ring-blue-500 h-4 w-4'
                              />
                              <span className='text-gray-700'>
                                {option.label}
                              </span>
                            </div>
                            <span className='text-gray-400 text-xs'>
                              ({option.count})
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* قائمة المنتجات - اليسار */}
          <div className='md:w-3/4 lg:w-4/5'>
            {/* الترتيب والمعلومات */}

            <SortComponent />

            {/* قائمة المنتجات */}
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 overflow-hidden'>
              {products.map((product) => (
                <div
                  key={product.id}
                  className='border-l border-b  border-gray-200 hover:shadow-lg'
                >
                  <div className='p-3 h-full relative '>
                    <Link href={`/product/${product?.id}`}>
                      <div className='absolute top-3 left-3 bg-[#ef394e] text-white text-xs font-bold px-2 py-1 rounded-lg'>
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
                        <h3 className='text-sm text-gray-800 line-clamp-2 h-15 mb-2'>
                          {product.name}
                        </h3>

                        <div className='flex  mb-3'>
                          <div className='w-full text-sm text-gray-800 text-end'>
                            {product.price.toLocaleString("ar-IR")} تومان
                          </div>
                        </div>
                      </div>
                    </Link>
                    <button className=' text-white p-2 border border-[#2cc5d7] rounded-xl flex items-center justify-center text-sm transition-colors'>
                      <ShoppingCart size={16} className='text-[#2cc5d7]' />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* الترقيم */}
            <div className='flex justify-center mt-8'>
              <nav className='flex items-center space-x-1'>
                <button className='p-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors ml-1'>
                  <ChevronRight size={16} />
                </button>
                <button className='w-10 h-10 border border-blue-500 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors'>
                  1
                </button>
                <button className='w-10 h-10 border text-[#6b7280] border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'>
                  2
                </button>
                <button className='w-10 h-10 border text-[#6b7280] border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'>
                  3
                </button>
                <span className='px-2 text-gray-500'>...</span>
                <button className='w-10 h-10 border text-[#6b7280] border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'>
                  10
                </button>
                <button className='p-2 border  border-gray-300 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors'>
                  <ChevronLeft size={16} />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
