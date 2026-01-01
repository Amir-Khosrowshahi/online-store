"use client";

import Link from "next/link";
import { ShoppingBag, Home, Search, AlertCircle } from "react-feather";

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full text-center'>
        {/* آیکون خطا */}
        <div className='mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6'>
          <AlertCircle className='h-12 w-12 text-red-500' />
        </div>

        {/* متن خطا */}
        <h1 className='text-4xl font-bold text-gray-900 mb-3'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          صفحه مورد نظر یافت نشد
        </h2>
        <p className='text-gray-600 mb-8'>
          به نظر می‌رسد صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است حذف
          شده باشد.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2'
          >
            <Home className='h-5 w-5' />
            بازگشت به خانه
          </Link>
        </div>

        <div className='mt-8'>
          <h3 className='text-sm font-medium text-gray-500 mb-3'>
            پیشنهادات ما:
          </h3>
          <div className='grid grid-cols-2 gap-3 text-gray-700'>
            {["گوشی موبایل", "لپ‌تاپ", "هدفون", "ساعت هوشمند"].map((item) => (
              <Link
                key={item}
                href={`/search?q=${item}`}
                className='px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm'
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
