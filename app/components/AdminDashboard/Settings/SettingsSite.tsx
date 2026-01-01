import React from "react";
import {
  Settings,
  Shield,
  Truck,
  DollarSign,
  Image,
  CreditCard,
  Users,
  FileText,
} from "react-feather";

function SettingsSite({ colors }: any) {
  return (
    <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-[#1e293b]' style={{ color: colors.dark }}>
          الإعدادات المتقدمة للمتجر
        </h2>
        <div className='flex items-center space-x-3 space-x-reverse'>
          <button className='px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors'>
            رجوع
          </button>
          <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center'>
            <span>حفظ جميع التغييرات</span>
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* الإعدادات العامة */}
        <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm'>
          <div className='flex items-center mb-5 pb-3 border-b border-gray-100'>
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Settings size={20} style={{ color: colors.primary }} />
            </div>
            <h3 className='font-bold text-lg mr-3 text-[#1e293b]'>الإعدادات العامة</h3>
          </div>
          <form className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                اسم المتجر
              </label>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                defaultValue='المتجر الإلكتروني'
                placeholder='أدخل اسم متجرك'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                شعار المتجر
              </label>
              <div className='flex items-center'>
                <div className='w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300'>
                  <Image size={24} className='text-gray-400' />
                </div>
                <div className='mr-4'>
                  <button
                    type='button'
                    className='block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg mb-2 text-gray-700 hover:bg-gray-50 transition-colors'
                  >
                    رفع شعار جديد
                  </button>
                  <button
                    type='button'
                    className='block w-full px-4 py-2 text-sm bg-red-50 border border-red-100 rounded-lg text-red-600 hover:bg-red-100 transition-colors'
                  >
                    حذف الشعار
                  </button>
                </div>
              </div>
              <p className='text-xs text-gray-500 mt-2'>
                الصيغ المسموحة: JPG, PNG, SVG - الحد الأقصى للحجم: 2MB
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                اللون الرئيسي للمتجر
              </label>
              <div className='flex items-center space-x-3 space-x-reverse'>
                <div
                  className='w-10 h-10 rounded-lg border-2 border-gray-200 shadow-sm cursor-pointer'
                  style={{ backgroundColor: colors.primary }}
                ></div>
                <input
                  type='text'
                  className='flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  defaultValue={colors.primary}
                  placeholder='كود اللون HEX'
                />
                <button
                  type='button'
                  className='px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
                >
                  اختيار لون
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* إعدادات الشحن */}
        <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm'>
          <div className='flex items-center mb-5 pb-3 border-b border-gray-100'>
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Truck size={20} style={{ color: colors.primary }} />
            </div>
            <h3 className='font-bold text-lg mr-3 text-[#1e293b]'>إعدادات الشحن</h3>
          </div>
          <form className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                طرق الشحن النشطة
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='post'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                    defaultChecked
                  />
                  <label
                    htmlFor='post'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <Truck size={16} className='ml-1 text-gray-500' />
                    البريد السريع
                  </label>
                </div>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='express'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                    defaultChecked
                  />
                  <label
                    htmlFor='express'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <Truck size={16} className='ml-1 text-gray-500' />
                    البريد الممتاز
                  </label>
                </div>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='tipax'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='tipax'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <Truck size={16} className='ml-1 text-gray-500' />
                    تيباكس
                  </label>
                </div>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='personal'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='personal'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <Truck size={16} className='ml-1 text-gray-500' />
                    استلام شخصي
                  </label>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  تكلفة الشحن (تومان)
                </label>
                <input
                  type='number'
                  className='w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  defaultValue='35000'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  الحد الأدنى للشراء للتوصيل المجاني
                </label>
                <input
                  type='number'
                  className='w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  defaultValue='500000'
                />
              </div>
            </div>
            <div className='pt-2'>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-medium'
              >
                حفظ إعدادات الشحن
              </button>
            </div>
          </form>
        </div>

        {/* إدارة الصلاحيات */}
        <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm'>
          <div className='flex items-center mb-5 pb-3 border-b border-gray-100'>
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Shield size={20} style={{ color: colors.primary }} />
            </div>
            <h3 className='font-bold text-lg mr-3 text-[#1e293b]'>إدارة الصلاحيات</h3>
          </div>
          <form className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                دور المستخدم
              </label>
              <select className='w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+")] bg-no-repeat bg-[center_right_1rem]'>
                <option>مدير عام</option>
                <option>مدير المنتجات</option>
                <option>مدير الطلبات</option>
                <option>دعم فني</option>
                <option>محاسب</option>
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                مستوى الصلاحية
              </label>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='products'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                    defaultChecked
                  />
                  <label
                    htmlFor='products'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <FileText size={16} className='ml-1 text-gray-500' />
                    إدارة المنتجات
                  </label>
                </div>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='orders'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                    defaultChecked
                  />
                  <label
                    htmlFor='orders'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <CreditCard size={16} className='ml-1 text-gray-500' />
                    إدارة الطلبات
                  </label>
                </div>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='customers'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='customers'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <Users size={16} className='ml-1 text-gray-500' />
                    إدارة العملاء
                  </label>
                </div>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='reports'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='reports'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <FileText size={16} className='ml-1 text-gray-500' />
                    عرض التقارير
                  </label>
                </div>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='settings'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='settings'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <Settings size={16} className='ml-1 text-gray-500' />
                    إعدادات النظام
                  </label>
                </div>
                <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors'>
                  <input
                    type='checkbox'
                    id='discounts'
                    className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  />
                  <label
                    htmlFor='discounts'
                    className='mr-2 text-sm text-gray-700 flex items-center'
                  >
                    <DollarSign size={16} className='ml-1 text-gray-500' />
                    إدارة الخصومات
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* إعدادات الضرائب والدفع */}
        <div className='bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm'>
          <div className='flex items-center mb-5 pb-3 border-b border-gray-100'>
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <DollarSign size={20} style={{ color: colors.primary }} />
            </div>
            <h3 className='font-bold text-lg mr-3 text-[#1e293b]'>إعدادات المالية والدفع</h3>
          </div>
          <form className='space-y-5'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  معدل الضريبة (%)
                </label>
                <input
                  type='number'
                  className='w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  defaultValue='9'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  رسوم بوابة الدفع (%)
                </label>
                <input
                  type='number'
                  className='w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  defaultValue='1.5'
                  step='0.1'
                />
              </div>
            </div>
            <div className='space-y-3'>
              <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200'>
                <input
                  type='checkbox'
                  id='tax-included'
                  className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  defaultChecked
                />
                <label
                  htmlFor='tax-included'
                  className='mr-2 text-sm text-gray-700'
                >
                  الأسعار تشمل الضريبة
                </label>
              </div>
              <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200'>
                <input
                  type='checkbox'
                  id='online-payment'
                  className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  defaultChecked
                />
                <label
                  htmlFor='online-payment'
                  className='mr-2 text-sm text-gray-700'
                >
                  تفعيل الدفع الإلكتروني
                </label>
              </div>
              <div className='flex items-center bg-white p-3 rounded-lg border border-gray-200'>
                <input
                  type='checkbox'
                  id='cash-payment'
                  className='w-5 h-5 text-blue-600 rounded focus:ring-blue-500'
                  defaultChecked
                />
                <label
                  htmlFor='cash-payment'
                  className='mr-2 text-sm text-gray-700'
                >
                  تفعيل الدفع عند الاستلام
                </label>
              </div>
            </div>
            <div className='pt-2'>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-medium'
              >
                حفظ الإعدادات المالية
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsSite;