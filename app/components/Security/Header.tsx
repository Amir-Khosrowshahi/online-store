// app/components/Header.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
} from "react-feather";

interface HeaderProps {
  toggleSidebar: () => void;
  language: string;
  changeLanguage: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  language,
  changeLanguage,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const [notifications] = useState([
    {
      id: 1,
      title: "تهدید امنیتی جدید",
      description: "آسیب‌پذیری بحرانی در سیستم شناسایی شد",
      time: "۲ ساعت پیش",
      read: false,
      type: "critical",
    },
    {
      id: 2,
      title: "به‌روزرسانی سیستم",
      description: "نسخه جدید ۲.۵.۰ آماده نصب است",
      time: "۱ روز پیش",
      read: true,
      type: "info",
    },
    {
      id: 3,
      title: "لاگ‌های سیستمی",
      description: "۵ خطای جدید در لاگ‌های سیستم ثبت شده است",
      time: "۳ روز پیش",
      read: true,
      type: "warning",
    },
  ]);

  // بستن پنل هنگام کلیک خارج از آن
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getText = (en: string, fa: string, ar: string) => {
    switch (language) {
      case "fa":
        return fa;
      case "ar":
        return ar;
      default:
        return en;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle size={16} className='text-red-500' />;
      case "warning":
        return <AlertTriangle size={16} className='text-yellow-500' />;
      default:
        return <Info size={16} className='text-blue-500' />;
    }
  };

  return (
    <header className='bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50'>
      <div className='flex items-center justify-between px-6 py-3'>
        {/* سمت چپ هدر */}
        <div className='flex items-center gap-4'>
          <button
            onClick={toggleSidebar}
            className='text-gray-600 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md p-1'
            aria-label={getText(
              "Toggle menu",
              "نمایش/پنهان کردن منو",
              "تبديل القائمة"
            )}
          >
            <Menu size={20} className='stroke-current' />
          </button>

          <h1 className='text-xl font-bold text-gray-800 flex items-center'>
            <span className='hidden md:inline bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
              {getText(
                "Security Risk Management",
                "مدیریت ریسک امنیتی",
                "إدارة مخاطر الأمن"
              )}
            </span>
            <span className='md:hidden bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
              {getText("SRM", "م.ر.ا", "إ.م.أ")}
            </span>
          </h1>
        </div>

        {/* سمت راست هدر */}
        <div className='flex items-center space-x-4'>
          {/* انتخاب زبان */}
          <div className='relative'>
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className='block appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer text-sm'
            >
              <option value='en'>English</option>
              <option value='fa'>فارسی</option>
              <option value='ar'>العربية</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500'>
              <ChevronDown size={16} />
            </div>
          </div>

          {/* نوتیفیکیشن */}
          <div className='relative' ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className='mr-2 relative p-1.5 text-gray-500 hover:text-blue-600 focus:outline-none rounded-full hover:bg-blue-50 transition-colors duration-200'
              aria-label={getText("Notifications", "اطلاعیه‌ها", "الإشعارات")}
            >
              <Bell size={20} className='stroke-current' />
              {unreadCount > 0 && (
                <span className='absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs'>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* پنل نوتیفیکیشن‌ها */}
            {showNotifications && (
              <div className='absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 transform transition-all duration-200 ease-out'>
                <div className='p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-gray-50 rounded-t-xl'>
                  <h3 className='font-semibold text-gray-800 flex items-center gap-2'>
                    <Bell size={18} className='text-blue-600' />
                    {getText("Notifications", "اطلاعیه‌ها", "الإشعارات")}
                    {unreadCount > 0 && (
                      <span className='bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full'>
                        {unreadCount} جدید
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100'
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className='max-h-96 overflow-y-auto'>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className='flex gap-3'>
                          <div className='mt-0.5'>
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className='flex-1'>
                            <div className='flex justify-between items-start'>
                              <h4
                                className={`font-medium ${
                                  !notification.read
                                    ? "text-gray-900"
                                    : "text-gray-700"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className='w-2 h-2 bg-blue-500 rounded-full mt-2'></span>
                              )}
                            </div>
                            <p className='text-sm text-gray-600 mt-1'>
                              {notification.description}
                            </p>
                            <div className='flex justify-between items-center mt-2'>
                              <p className='text-xs text-gray-400'>
                                {notification.time}
                              </p>
                              {!notification.read && (
                                <button className='text-xs text-blue-600 hover:text-blue-800'>
                                  علامت‌گذاری به عنوان خوانده شده
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='p-6 text-center'>
                      <CheckCircle
                        size={40}
                        className='mx-auto text-gray-300 mb-3'
                      />
                      <p className='text-gray-500'>
                        {getText(
                          "No notifications",
                          "هیچ اطلاعیه‌ای وجود ندارد",
                          "لا توجد إشعارات"
                        )}
                      </p>
                    </div>
                  )}
                </div>
                <div className='p-3 border-t border-gray-200 text-center bg-gray-50 rounded-b-xl'>
                  <button className='text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-1 w-full'>
                    {getText(
                      "View all notifications",
                      "مشاهده همه اطلاعیه‌ها",
                      "عرض جميع الإشعارات"
                    )}
                    <ChevronDown size={16} className='mt-0.5' />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* پروفایل کاربر */}
          <div className='flex items-center gap-2 cursor-pointer group'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 flex items-center justify-center text-white font-semibold shadow-sm'>
              {getText("A", "م", "أ")}
            </div>
            <div className='hidden md:flex flex-col items-start'>
              <span className='text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200'>
                {getText("Admin", "مدیر سیستم", "مدير النظام")}
              </span>
              <span className='text-xs text-gray-500'>
                {getText("Superuser", "کاربر ارشد", "مستخدم رئيسي")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
