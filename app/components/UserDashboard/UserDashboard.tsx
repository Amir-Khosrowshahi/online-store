"use client";

import { useState } from "react";

import {
  User,
  ShoppingCart,
  Heart,
  Home,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Search,
  Package,
  ChevronDown,
  Star,
  MapPin,
  Clock,
  CheckCircle,
} from "react-feather";

// الألوان المخصصة
const colors = {
  primary: "#4f46e5",
  secondary: "#10b981",
  danger: "#ef4444",
  warning: "#f59e0b",
  dark: "#1e293b",
  light: "#ffffff",
  gray: "#64748b",
  success: "#10b981",
};

type Order = {
  id: number;
  date: string;
  status: "processing" | "shipped" | "delivered";
  total: number;
  items: { name: string; quantity: number; price: number }[];
};

type Address = {
  id: number;
  title: string;
  address: string;
  isDefault: boolean;
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // بيانات نموذجية
  const orders: Order[] = [
    {
      id: 1001,
      date: "٢٠٢٤/٠٧/١٥",
      status: "shipped",
      total: 18500000,
      items: [
        { name: "جوال سامسونج S23", quantity: 1, price: 15000000 },
        { name: "غطاء حماية", quantity: 1, price: 3500000 },
      ],
    },
    {
      id: 1002,
      date: "٢٠٢٤/٠٧/١٠",
      status: "delivered",
      total: 8700000,
      items: [{ name: "سماعات سوني لاسلكية", quantity: 1, price: 8700000 }],
    },
  ];

  const addresses: Address[] = [
    {
      id: 1,
      title: "المنزل",
      address: "الرياض، حي الملز، شارع الملك فهد، عمارة ١٢، شقة ٣",
      isDefault: true,
    },
    {
      id: 2,
      title: "مكان العمل",
      address: "الخبر، حي الراكة، مجمع التجاري، الطابق ٤",
      isDefault: false,
    },
  ];

  // عرض محتوى التبويبات
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className='space-y-6'>
            {/* البطاقات الإحصائية */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-500 text-[#1e293b]'>
                      الطلبات النشطة
                    </p>
                    <h3
                      className='text-2xl font-bold mt-1'
                      style={{ color: colors.dark }}
                    >
                      ٢
                    </h3>
                  </div>
                  <div
                    className='p-3 rounded-lg'
                    style={{ backgroundColor: `${colors.primary}20` }}
                  >
                    <ShoppingCart size={20} style={{ color: colors.primary }} />
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-500 text-[#1e293b]'>المفضلة</p>
                    <h3
                      className='text-2xl font-bold mt-1'
                      style={{ color: colors.dark }}
                    >
                      ٥
                    </h3>
                  </div>
                  <div
                    className='p-3 rounded-lg'
                    style={{ backgroundColor: `${colors.danger}20` }}
                  >
                    <Heart size={20} style={{ color: colors.danger }} />
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-500'>العناوين</p>
                    <h3
                      className='text-2xl font-bold mt-1'
                      style={{ color: colors.dark }}
                    >
                      ٢
                    </h3>
                  </div>
                  <div
                    className='p-3 rounded-lg'
                    style={{ backgroundColor: `${colors.secondary}20` }}
                  >
                    <MapPin size={20} style={{ color: colors.secondary }} />
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-gray-500'>البطاقات البنكية</p>
                    <h3
                      className='text-2xl font-bold mt-1'
                      style={{ color: colors.dark }}
                    >
                      ١
                    </h3>
                  </div>
                  <div
                    className='p-3 rounded-lg'
                    style={{ backgroundColor: `${colors.warning}20` }}
                  >
                    <CreditCard size={20} style={{ color: colors.warning }} />
                  </div>
                </div>
              </div>
            </div>

            {/* آخر الطلبات */}
            <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
              <div className='flex items-center justify-between mb-6'>
                <h2
                  className='text-xl font-bold text-[#1e293b]'
                  style={{ color: colors.dark }}
                >
                  آخر الطلبات
                </h2>
                <button
                  onClick={() => setActiveTab("orders")}
                  className='text-sm flex items-center'
                  style={{ color: colors.primary }}
                >
                  عرض الكل
                  <ChevronDown
                    size={16}
                    className='mr-1 transform rotate-270'
                  />
                </button>
              </div>

              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr
                      className='text-right'
                      style={{ backgroundColor: colors.light }}
                    >
                      <th
                        className='p-4 font-medium'
                        style={{ color: colors.gray }}
                      >
                        رقم الطلب
                      </th>
                      <th
                        className='p-4 font-medium'
                        style={{ color: colors.gray }}
                      >
                        التاريخ
                      </th>
                      <th
                        className='p-4 font-medium'
                        style={{ color: colors.gray }}
                      >
                        الحالة
                      </th>
                      <th
                        className='p-4 font-medium'
                        style={{ color: colors.gray }}
                      >
                        المبلغ
                      </th>
                      <th
                        className='p-4 font-medium'
                        style={{ color: colors.gray }}
                      >
                        التفاصيل
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className='border-b border-gray-100'>
                        <td
                          className='p-4 font-medium'
                          style={{ color: colors.dark }}
                        >
                          #{order.id}
                        </td>
                        <td className='p-4' style={{ color: colors.gray }}>
                          {order.date}
                        </td>
                        <td className='p-4'>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status === "delivered"
                              ? "تم التوصيل"
                              : order.status === "shipped"
                              ? "تم الشحن"
                              : "قيد المعالجة"}
                          </span>
                        </td>
                        <td
                          className='p-4 font-medium'
                          style={{ color: colors.dark }}
                        >
                          {order.total.toLocaleString("ar-SA")} ريال
                        </td>
                        <td className='p-4'>
                          <button
                            className='flex items-center text-sm'
                            style={{ color: colors.primary }}
                          >
                            التفاصيل
                            <ChevronDown
                              size={16}
                              className='mr-1 transform rotate-270'
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
            <h2
              className='text-xl font-bold mb-6 text-[#1e293b]'
              style={{ color: colors.dark }}
            >
              طلباتي
            </h2>

            {orders.map((order) => (
              <div
                key={order.id}
                className='border border-gray-200 rounded-lg p-5 mb-6'
              >
                <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                  <div>
                    <h3 className='font-bold' style={{ color: colors.dark }}>
                      الطلب #{order.id}
                    </h3>
                    <p className='text-sm mt-1' style={{ color: colors.gray }}>
                      <Clock size={14} className='inline ml-1' />
                      {order.date}
                    </p>
                  </div>
                  <div className='mt-2 md:mt-0'>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status === "delivered"
                        ? "تم التوصيل"
                        : order.status === "shipped"
                        ? "تم الشحن"
                        : "قيد المعالجة"}
                    </span>
                  </div>
                </div>

                <div className='border-t border-gray-100 pt-4 mb-4'>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between py-2'
                    >
                      <div className='flex items-center'>
                        <div className='bg-gray-100 rounded-lg w-12 h-12 flex items-center justify-center mr-3 ml-3'>
                          <Package size={20} style={{ color: colors.gray }} />
                        </div>
                        <div>
                          <p
                            className='font-medium'
                            style={{ color: colors.dark }}
                          >
                            {item.name}
                          </p>
                          <p className='text-sm' style={{ color: colors.gray }}>
                            {item.quantity} قطعة
                          </p>
                        </div>
                      </div>
                      <p className='font-medium' style={{ color: colors.dark }}>
                        {item.price.toLocaleString("ar-SA")} ريال
                      </p>
                    </div>
                  ))}
                </div>

                <div className='flex flex-col md:flex-row md:items-center md:justify-between border-t border-gray-100 pt-4 '>
                  <div>
                    <p className='text-sm' style={{ color: colors.gray }}>
                      المبلغ الإجمالي:
                    </p>
                    <p
                      className='font-bold text-lg'
                      style={{ color: colors.dark }}
                    >
                      {order.total.toLocaleString("ar-SA")} ريال
                    </p>
                  </div>
                  <div className='mt-3 md:mt-0 space-x-2'>
                    <button
                      className='px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium ml-2'
                      style={{ color: colors.dark }}
                    >
                      متابعة الطلب
                    </button>
                    <button
                      className='px-4 py-2 rounded-lg text-sm font-medium'
                      style={{
                        backgroundColor: "#d8384c",
                        color: "white",
                      }}
                    >
                      إعادة الشراء
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "addresses":
        return (
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h2 className='text-xl font-bold mb-4 text-[#1e293b]'>عناويني</h2>
            <div className='grid md:grid-cols-2 gap-4'>
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border rounded-lg p-4 relative ${
                    address.isDefault
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  {address.isDefault && (
                    <span className='absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded'>
                      افتراضي
                    </span>
                  )}
                  <h3 className='font-bold mb-2 text-[#4b5563]'>
                    {address.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{address.address}</p>
                  <div className='flex gap-2'>
                    <button className='text-blue-500 hover:text-blue-700 text-sm'>
                      تعديل
                    </button>
                    {!address.isDefault && (
                      <button className='text-green-500 hover:text-green-700 text-sm'>
                        افتراضي
                      </button>
                    )}
                    <button className='text-red-500 hover:text-red-700 text-sm'>
                      حذف
                    </button>
                  </div>
                </div>
              ))}
              <button className='border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-blue-500 hover:border-blue-500 transition-colors'>
                + إضافة عنوان جديد
              </button>
            </div>
          </div>
        );
      case "favorites":
        return (
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h2 className='text-xl font-bold mb-4 text-[#1e293b]'>المفضلة</h2>
            <div className='text-center py-8 text-gray-500'>
              <Heart className='mx-auto mb-2 text-gray-300' size={48} />
              <p className='text-[#000]'>قائمة المفضلة فارغة</p>
            </div>
          </div>
        );
      case "payments":
        return (
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h2 className='text-xl font-bold mb-4 text-[#1e293b]'>طرق الدفع</h2>
            <div className='max-w-md mx-auto'>
              <div className='bg-gray-50 rounded-lg p-4 mb-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='font-medium'>بطاقة بنكية</span>
                  <button className='text-red-500 hover:text-red-700 text-sm'>
                    حذف
                  </button>
                </div>
                <div className='text-gray-600'>**** **** **** 1234</div>
              </div>
              <button className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors'>
                إضافة بطاقة جديدة
              </button>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className='bg-white rounded-lg shadow-sm p-4'>
            <h2 className='text-xl font-bold mb-4 text-[#1e293b]'>
              إعدادات الحساب
            </h2>
            <form className='max-w-md space-y-4'>
              <div>
                <label className='block text-gray-700 mb-1'>الاسم الكامل</label>
                <input
                  type='text'
                  className='w-full border text-[#4b5563] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  defaultValue='أحمد محمد'
                />
              </div>
              <div>
                <label className='block text-gray-700 mb-1'>
                  البريد الإلكتروني
                </label>
                <input
                  type='email'
                  className='w-full border border-gray-300 text-[#4b5563] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  defaultValue='ahmed@example.com'
                />
              </div>
              <div>
                <label className='block text-gray-700 mb-1'>رقم الجوال</label>
                <input
                  type='tel'
                  className='w-full border border-gray-300 text-[#4b5563] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  defaultValue='0512345678'
                />
              </div>
              <button
                type='submit'
                className='bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors'
              >
                حفظ التغييرات
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='' style={{ backgroundColor: colors.light }}>
      {/* الهيدر */}
      <header className='bg-white shadow-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center '>
              <button
                className='md:hidden mr-3 ml-3'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke={colors.dark}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
              <h1 className='text-xl font-bold' style={{ color: colors.dark }}>
                المتجر الإلكتروني
              </h1>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='relative hidden md:block ml-3'>
                <input
                  type='text'
                  placeholder='بحث...'
                  className='border border-gray-300 text-[#4b5563] rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  style={{ backgroundColor: colors.light }}
                />
                <Search
                  size={18}
                  className='absolute left-3 top-3'
                  style={{ color: colors.gray }}
                />
              </div>

              <button className='relative p-1'>
                <Bell size={20} style={{ color: colors.dark }} />
                <span
                  className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'
                  style={{ backgroundColor: colors.danger }}
                >
                  3
                </span>
              </button>

              <div className='hidden md:flex items-center space-x-2 '>
                <div
                  className='w-8 h-8 rounded-full flex items-center justify-center ml-1'
                  style={{ backgroundColor: `${colors.primary}20` }}
                >
                  <User size={18} style={{ color: colors.primary }} />
                </div>
                <span
                  className='text-sm font-medium'
                  style={{ color: colors.dark }}
                >
                  أحمد محمد
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <div className='container mx-auto px-4 py-6 flex flex-col md:flex-row'>
        {/* القائمة الجانبية - سطح المكتب */}
        <aside className='hidden md:block md:w-64 lg:w-72 pr-6'>
          <div className='bg-white rounded-xl shadow-sm p-6 mb-6 ml-3 border border-gray-100'>
            <div className='flex items-center mb-6'>
              <div
                className='w-12 h-12 rounded-full flex items-center justify-center mr-3'
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <User size={20} style={{ color: colors.primary }} />
              </div>
              <div>
                <h3 className='font-bold' style={{ color: colors.dark }}>
                  أحمد محمد
                </h3>
                <p className='text-sm' style={{ color: colors.gray }}>
                  ahmed@example.com
                </p>
              </div>
            </div>

            <nav className='space-y-1'>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "dashboard"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <Home size={18} className='ml-2' />
                  <span>لوحة التحكم</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "orders"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <ShoppingCart size={18} className='ml-2' />
                  <span>الطلبات</span>
                </div>
                {orders.length > 0 && (
                  <span
                    className='text-xs px-2 py-1 rounded-full'
                    style={{
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary,
                    }}
                  >
                    {orders.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "addresses"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <Home className='ml-2' size={18} />
                  <span>العناوين</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "favorites"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <Heart className='ml-2' size={18} />
                  <span>المفضلة</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "payments"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <CreditCard className='ml-2' size={18} />
                  <span>طرق الدفع</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "settings"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <Settings className='ml-2' size={18} />
                  <span>إعدادات الحساب</span>
                </div>
              </button>

              <button
                className='w-full flex items-center py-3 px-4 rounded-lg text-gray-500 hover:bg-red-50 mt-4'
                style={{ color: colors.danger }}
              >
                <LogOut size={18} className='ml-2' />
                <span>تسجيل الخروج</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* المحتوى الرئيسي */}
        <main className='flex-1'>
          {/* قائمة الجوال */}
          {mobileMenuOpen && (
            <div className='bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100 md:hidden'>
              <div className='flex items-center mb-4'>
                <div
                  className='w-10 h-10 rounded-full flex items-center justify-center mr-3'
                  style={{ backgroundColor: `${colors.primary}20` }}
                >
                  <User size={16} style={{ color: colors.primary }} />
                </div>
                <div>
                  <h3
                    className='font-bold text-sm'
                    style={{ color: colors.dark }}
                  >
                    أحمد محمد
                  </h3>
                  <p className='text-xs' style={{ color: colors.gray }}>
                    ahmed@example.com
                  </p>
                </div>
              </div>

              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className='w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                style={{ color: colors.dark }}
              >
                <option value='dashboard'>لوحة التحكم</option>
                <option value='orders'>الطلبات</option>
                <option value='addresses'>العناوين</option>
                <option value='favorites'>المفضلة</option>
                <option value='payments'>طرق الدفع</option>
                <option value='settings'>إعدادات الحساب</option>
              </select>

              <button
                className='w-full flex items-center justify-center py-2 px-3 rounded-lg border border-gray-300 text-sm mt-2'
                style={{ color: colors.danger }}
              >
                <LogOut size={16} className='ml-2' />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          )}

          {/* محتوى التبويبات */}
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
