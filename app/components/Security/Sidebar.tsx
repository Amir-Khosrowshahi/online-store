// app/components/Sidebar.tsx
import React from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  language: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  language,
}) => {
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

  return (
    <div
      className={`bg-blue-800 text-white ${
        isOpen ? "w-64" : "w-20 items-center"
      } transition-all duration-300 ease-in-out flex flex-col`}
      dir={language === "ar" || language === "fa" ? "rtl" : "ltr"}
    >
      <div className='p-4 flex items-center justify-center border-b border-blue-700'>
        {isOpen ? (
          <h1 className='text-xl font-bold'>
            {getText("Admin Dashboard", "پنل مدیریتی", "لوحة التحكم الإدارية")}
          </h1>
        ) : (
          <span className='text-xl font-bold'>SRM</span>
        )}
      </div>

      <nav className='flex-1 overflow-y-auto'>
        <ul className='space-y-1 p-2'>
          <li>
            <button
              onClick={() => setActiveTab("cve")}
              className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
                activeTab === "cve" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                />
              </svg>
              {isOpen && (
                <span className='ml-3'>
                  {getText("CVE Scoring", "امتیازدهی CVE", "تقييم CVE")}
                </span>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("environmental")}
              className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
                activeTab === "environmental"
                  ? "bg-blue-600 "
                  : "hover:bg-blue-700"
              }`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                />
              </svg>
              {isOpen && (
                <span className='ml-3'>
                  {getText("Environmental", "محیطی", "بيئي")}
                </span>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("mitigation")}
              className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
                activeTab === "mitigation" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
                />
              </svg>
              {isOpen && (
                <span className='ml-3'>
                  {getText("Mitigation", "کاهش ریسک", "تخفيف")}
                </span>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("assets")}
              className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
                activeTab === "assets" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                />
              </svg>
              {isOpen && (
                <span className='ml-3'>
                  {getText("Assets", "دارایی‌ها", "الأصول")}
                </span>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("management")}
              className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
                activeTab === "management" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              {isOpen && (
                <span className='ml-3'>
                  {getText("Management", "مدیریت", "الإدارة")}
                </span>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("services")}
              className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
                activeTab === "services" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
                />
              </svg>
              {isOpen && (
                <span className='ml-3'>
                  {getText("Services", "سرویس‌ها", "الخدمات")}
                </span>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("departments")}
              className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
                activeTab === "departments"
                  ? "bg-blue-600"
                  : "hover:bg-blue-700"
              }`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                />
              </svg>
              {isOpen && (
                <span className='ml-3'>
                  {getText("Departments", "دپارتمان‌ها", "الأقسام")}
                </span>
              )}
            </button>
          </li>

          <li>
            <button
              onClick={() => setActiveTab("risk")}
              className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
                activeTab === "risk" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                />
              </svg>
              {isOpen && (
                <span className='ml-3'>
                  {getText("Risk Assessment", "ارزیابی ریسک", "تقييم المخاطر")}
                </span>
              )}
            </button>
          </li>
        </ul>
      </nav>

      <div className='p-4 border-t border-blue-700'>
        {isOpen ? (
          <div className='text-sm text-blue-200'>
            {getText(
              "Security Risk Management v1.0",
              "مدیریت ریسک امنیتی نسخه ۱.۰",
              "إدارة مخاطر الأمن الإصدار 1.0"
            )}
          </div>
        ) : (
          <div className='text-center text-blue-200'>v1.0</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
// app/components/Sidebar.tsx
// import React, { useState } from "react";
// import {
//   Shield,
//   Layout,
//   Settings,
//   Database,
//   Layers,
//   Users,
//   Server,
//   BarChart2,
//   ChevronDown,
//   ChevronUp,
//   HardDrive,
//   Network,
//   Cloud,
//   Lock,
//   AlertTriangle,
// } from "react-feather";

// interface SidebarProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
//   isOpen: boolean;
//   language: string;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   activeTab,
//   setActiveTab,
//   isOpen,
//   language,
// }) => {
//   const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
//     assets: false,
//     services: false,
//     risk: false,
//     management: false,
//   });

//   const toggleMenu = (menu: string) => {
//     setExpandedMenus((prev) => ({
//       ...prev,
//       [menu]: !prev[menu],
//     }));
//   };

//   const getText = (en: string, fa: string, ar: string) => {
//     switch (language) {
//       case "fa":
//         return fa;
//       case "ar":
//         return ar;
//       default:
//         return en;
//     }
//   };

//   const menuItems = [
//     {
//       id: "dashboard",
//       icon: <Layout size={20} />,
//       text: getText("Dashboard", "داشبورد", "لوحة التحكم"),
//     },
//     {
//       id: "cve",
//       icon: <Shield size={20} />,
//       text: getText("CVE Scoring", "امتیازدهی CVE", "تقييم CVE"),
//     },
//     {
//       id: "environmental",
//       icon: <BarChart2 size={20} />,
//       text: getText("Environmental", "محیطی", "بيئي"),
//     },
//     {
//       id: "assets",
//       icon: <HardDrive size={20} />,
//       text: getText("Assets", "دارایی‌ها", "الأصول"),
//       subItems: [
//         { id: "physical", text: getText("Physical", "فیزیکی", "مادي") },
//         { id: "virtual", text: getText("Virtual", "مجازی", "افتراضي") },
//         { id: "cloud", text: getText("Cloud", "ابری", "سحابي") },
//       ],
//     },
//     {
//       id: "services",
//       icon: <Server size={20} />,
//       text: getText("Services", "سرویس‌ها", "الخدمات"),
//       subItems: [
//         { id: "network", text: getText("Network", "شبکه", "شبكة") },
//         { id: "web", text: getText("Web", "وب", "ويب") },
//         {
//           id: "database",
//           text: getText("Database", "پایگاه داده", "قاعدة بيانات"),
//         },
//       ],
//     },
//     {
//       id: "risk",
//       icon: <AlertTriangle size={20} />,
//       text: getText("Risk Assessment", "ارزیابی ریسک", "تقييم المخاطر"),
//       subItems: [
//         { id: "critical", text: getText("Critical", "بحرانی", "حرج") },
//         { id: "high", text: getText("High", "بالا", "عالي") },
//         { id: "medium", text: getText("Medium", "متوسط", "متوسط") },
//       ],
//     },
//     {
//       id: "management",
//       icon: <Settings size={20} />,
//       text: getText("Management", "مدیریت", "الإدارة"),
//       subItems: [
//         { id: "users", text: getText("Users", "کاربران", "المستخدمين") },
//         { id: "roles", text: getText("Roles", "نقش‌ها", "الأدوار") },
//         { id: "logs", text: getText("Logs", "لاگ‌ها", "السجلات") },
//       ],
//     },
//     {
//       id: "mitigation",
//       icon: <Lock size={20} />,
//       text: getText("Mitigation", "کاهش ریسک", "تخفيف"),
//     },
//     {
//       id: "departments",
//       icon: <Users size={20} />,
//       text: getText("Departments", "دپارتمان‌ها", "الأقسام"),
//     },
//   ];

//   return (
//     <div
//       className={`bg-blue-800 text-white ${
//         isOpen ? "w-64" : "w-20 items-center"
//       } transition-all duration-300 ease-in-out flex flex-col h-screen sticky top-0`}
//       dir={language === "ar" || language === "fa" ? "rtl" : "ltr"}
//     >
//       <div className='p-4 flex items-center justify-center border-b border-blue-700'>
//         {isOpen ? (
//           <h1 className='text-xl font-bold flex items-center gap-2'>
//             <Shield size={24} />
//             {getText("SRM", "مدیریت ریسک امنیتی", "إدارة مخاطر الأمن")}
//           </h1>
//         ) : (
//           <span className='text-xl font-bold'>SRM</span>
//         )}
//       </div>

//       <nav className='flex-1 overflow-y-auto'>
//         <ul className='space-y-1 p-2'>
//           {menuItems.map((item) => (
//             <li key={item.id}>
//               {item.subItems ? (
//                 <>
//                   <button
//                     onClick={() => toggleMenu(item.id)}
//                     className={`w-full text-left p-3 rounded-md flex items-center justify-between gap-3 ${
//                       activeTab === item.id
//                         ? "bg-blue-600"
//                         : "hover:bg-blue-700"
//                     }`}
//                   >
//                     <div className='flex items-center gap-3'>
//                       {item.icon}
//                       {isOpen && <span>{item.text}</span>}
//                     </div>
//                     {isOpen &&
//                       (expandedMenus[item.id] ? (
//                         <ChevronUp size={16} />
//                       ) : (
//                         <ChevronDown size={16} />
//                       ))}
//                   </button>

//                   {isOpen && expandedMenus[item.id] && (
//                     <ul className='ml-8 mt-1 space-y-1'>
//                       {item.subItems.map((subItem) => (
//                         <li key={subItem.id}>
//                           <button
//                             onClick={() =>
//                               setActiveTab(`${item.id}-${subItem.id}`)
//                             }
//                             className={`w-full text-left p-2 pl-4 rounded-md flex items-center gap-2 text-sm ${
//                               activeTab === `${item.id}-${subItem.id}`
//                                 ? "bg-blue-500 text-white"
//                                 : "text-blue-100 hover:bg-blue-600"
//                             }`}
//                           >
//                             <span className='w-1 h-1 rounded-full bg-current'></span>
//                             {subItem.text}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </>
//               ) : (
//                 <button
//                   onClick={() => setActiveTab(item.id)}
//                   className={`w-full text-left p-3 rounded-md flex items-center gap-3 ${
//                     activeTab === item.id ? "bg-blue-600" : "hover:bg-blue-700"
//                   }`}
//                 >
//                   {item.icon}
//                   {isOpen && <span>{item.text}</span>}
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>

//       <div className='p-4 border-t border-blue-700'>
//         {isOpen ? (
//           <div className='text-sm text-blue-200 flex flex-col'>
//             <span>
//               {getText(
//                 "Security Risk Management",
//                 "مدیریت ریسک امنیتی",
//                 "إدارة مخاطر الأمن"
//               )}
//             </span>
//             <span className='text-xs'>v1.0.0</span>
//           </div>
//         ) : (
//           <div className='text-center text-blue-200'>v1.0</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
