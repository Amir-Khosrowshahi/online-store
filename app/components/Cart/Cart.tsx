"use client";
import { useState, FC } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  Eye,
  Store,
} from "lucide-react";
import Image from "next/image";

type ProductType = {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  color: string;
  seller: string;
  stock: number;
};

const Cart: FC = () => {
  const initialProducts: ProductType[] = [
    {
      id: 1,
      title: "سماعة بلوتوث أنكر موديل Liberty 4 Pro",
      price: 8090000,
      originalPrice: 8990000,
      quantity: 1,
      image: "/images/Product_details_image/Image_details3.webp",
      color: "#ffffff",
      seller: "تي تي موبايل",
      stock: 7,
    },
    {
      id: 2,
      title: "سماعة لاسلكية سوني موديل WF-1000XM4",
      price: 7200000,
      originalPrice: 8000000,
      quantity: 1,
      image: "/images/Product_details_image/Image_details3.webp",
      color: "#000000",
      seller: "الوكالة",
      stock: 5,
    },
  ];

  const [products, setProducts] = useState<ProductType[]>(initialProducts);

  const handleIncrease = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity < p.stock
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const handleDecrease = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const handleRemove = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const totalPrice = products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const totalDiscount = products.reduce((sum, p) => {
    if (p.originalPrice && p.originalPrice > p.price) {
      return sum + (p.originalPrice - p.price) * p.quantity;
    }
    return sum;
  }, 0);

  return (
    <div className='bg-white min-h-screen p-6 max-w-6xl mx-auto flex flex-col lg:flex-row gap-6'>
      <div className='flex-1'>
        <h1 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-5'>
          سلة تسوقك{" "}
          <span className='text-sm text-gray-400'>{products.length} طرد</span>
        </h1>
        {products.map((product) => (
          <div
            key={product.id}
            className='flex flex-col sm:flex-row justify-between  gap-6 border-b pb-6 mb-3'
          >
            <Image
              src={product.image}
              alt={product.title}
              className='rounded-xl object-contain'
              width={256}
              height={256}
            />

            <div className='flex-1 text-right'>
              <h2 className='text-neutral-800 text-body1-strong mb-2'>
                {product.title}
              </h2>

              <ul className='text-sm text-[#62666d] leading-6'>
                <li>
                  اللون:{" "}
                  <span
                    className='inline-block w-3 h-3 rounded-full border ml-1'
                    style={{ backgroundColor: product.color }}
                  ></span>
                  {product.color === "#ffffff" ? "أبيض" : "أسود"}
                </li>
                <li className='flex items-center gap-1'>
                  <ShieldCheck className='w-4 h-4 text-[#62666d]' />
                  ضمان ۱۸ شهراً من باديه نو
                </li>
                <li className='flex items-center gap-1'>
                  <Store className='w-4 h-4 text-[#62666d]' />
                  {product.seller}
                </li>
                <li className='flex items-center gap-1 text-[#62666d]'>
                  <Truck className='w-4 h-4 text-[#ec4c6c]' />
                  شحن من البائع
                </li>
                <li className='flex items-center gap-1 text-[#62666d]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#3b82f6'
                    className='bi bi-clock-history w-4 h-4'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z' />
                    <path d='M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z' />
                    <path d='M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5' />
                  </svg>
                  شحن اليوم (طهران و كرج)
                </li>
              </ul>
              <div className='flex flex-col justify-between mt-4 gap-3'>
                <div className='text-[#62666d] font-bold text-lg'>
                  {product.originalPrice &&
                  product.originalPrice > product.price ? (
                    <div className='flex flex-col'>
                      <span className='line-through text-sm text-gray-400'>
                        {(
                          product.originalPrice * product.quantity
                        ).toLocaleString("ar-IR")}{" "}
                        تومان
                      </span>
                      <span>
                        {(product.price * product.quantity).toLocaleString(
                          "ar-IR"
                        )}{" "}
                        تومان
                      </span>
                      <span className='text-[#2e7b32] text-sm font-medium'>
                        (
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        ٪ خصم)
                      </span>
                    </div>
                  ) : (
                    <span>
                      {(product.price * product.quantity).toLocaleString(
                        "ar-IR"
                      )}{" "}
                      تومان
                    </span>
                  )}
                </div>

                <div className='flex items-center gap-5'>
                  <div className='flex items-center justify-center gap-2 border rounded-md p-3 w-[120px]'>
                    <button
                      className={`text-blue-600  ${
                        product.quantity >= product.stock
                          ? "opacity-30 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => handleIncrease(product.id)}
                      disabled={product.quantity >= product.stock}
                    >
                      <Plus className='text-[#ef4b5f]' size={16} />
                    </button>

                    <span className='font-medium text-[#62666d] w-[40px] text-center block'>
                      {product.quantity}
                    </span>
                    <button
                      className={`text-blue-600 `}
                      onClick={() => handleDecrease(product.id)}
                    >
                      {product.quantity === 1 ? (
                        <div
                          className='text-red-500 hover:text-red-700'
                          onClick={() => handleRemove(product.id)}
                        >
                          <Trash2 size={18} />
                        </div>
                      ) : (
                        <Minus className='text-[#ef4b5f]' size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* قسم ملخص الدفع - العمود الأيسر */}
      <div className='w-full lg:w-[300px] h-fit border rounded-xl p-4 shadow-sm sticky top-10'>
        <h2 className='text-lg font-bold text-gray-700 mb-4'>ملخص الدفع</h2>
        <div className='flex items-center justify-between text-sm text-gray-600 mb-3'>
          <span>المجموع الكلي للمنتجات</span>
          <span>{totalPrice.toLocaleString("ar-IR")} تومان</span>
        </div>
        {totalDiscount > 0 && (
          <div className='flex items-center justify-between text-sm text-[#2e7b32] mb-2'>
            <span>مدخراتك من الخصم</span>
            <span>{totalDiscount.toLocaleString("ar-IR")} تومان</span>
          </div>
        )}

        <button className='w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-colors text-center mt-4'>
          متابعة عملية الشراء
        </button>
      </div>
    </div>
  );
};

export default Cart;
