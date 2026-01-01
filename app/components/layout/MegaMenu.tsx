"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Search from "./Search";
import MobileMenu from "./MobileMenu";

const menu = [
  {
    title: "المنتجات الرقمية",
    children: [
      {
        title: "الهواتف الذكية",
        children: [
          { title: "آيفون أبل", href: "/mobile/apple" },
          { title: "سامسونج جلاكسي", href: "/mobile/samsung" },
          { title: "شاومي", href: "/mobile/xiaomi" },
          { title: "هواوي", href: "/mobile/huawei" },
          { title: "هونر", href: "/mobile/honor" },
          { title: "نوكيا", href: "/mobile/nokia" },
          { title: "أوبو", href: "/mobile/oppo" },
          { title: "فيفو", href: "/mobile/vivo" },
          { title: "ريلمي", href: "/mobile/realme" },
          { title: "ون بلس", href: "/mobile/oneplus" },
        ],
      },
      {
        title: "لابتوب وألترابوك",
        children: [
          { title: "ماك بوك أبل", href: "/laptop/apple" },
          { title: "لابتوب اسوس", href: "/laptop/asus" },
          { title: "لابتوب لينوفو", href: "/laptop/lenovo" },
          { title: "لابتوب ديل", href: "/laptop/dell" },
          { title: "لابتوب إتش بي", href: "/laptop/hp" },
          { title: "لابتوب مايكروسوفت", href: "/laptop/microsoft" },
          { title: "لابتوب إيسر", href: "/laptop/acer" },
          { title: "لابتوب إم إس آي", href: "/laptop/msi" },
          { title: "لابتوب رازر", href: "/laptop/razer" },
        ],
      },
      {
        title: "أجهزة لوحية",
        children: [
          { title: "آيباد أبل", href: "/tablet/ipad" },
          { title: "تابلت سامسونج", href: "/tablet/samsung" },
          { title: "تابلت لينوفو", href: "/tablet/lenovo" },
          { title: "تابلت هواوي", href: "/tablet/huawei" },
          { title: "تابلت أمازون", href: "/tablet/amazon" },
        ],
      },
      {
        title: "أجهزة الكمبيوتر وملحقاتها",
        children: [
          { title: "صندوق الكمبيوتر", href: "/pc/case" },
          { title: "المعالج (CPU)", href: "/pc/cpu" },
          { title: "كرت الشاشة", href: "/pc/gpu" },
          { title: "اللوحة الأم", href: "/pc/motherboard" },
          { title: "الذاكرة العشوائية (RAM)", href: "/pc/ram" },
          { title: "الهارد و SSD", href: "/pc/storage" },
          { title: "الشاشات", href: "/pc/monitor" },
          { title: "لوحة المفاتيح والفأرة", href: "/pc/peripherals" },
        ],
      },
      {
        title: "إكسسوارات الجوال",
        children: [
          { title: "شاحن محمول", href: "/mobile-accessories/powerbank" },
          { title: "سماعات رأس", href: "/mobile-accessories/headphone" },
          { title: "شواحن", href: "/mobile-accessories/charger" },
          { title: "كابلات ومحولات", href: "/mobile-accessories/cable" },
          {
            title: "حامي الشاشة",
            href: "/mobile-accessories/screen-protector",
          },
          { title: "أغطية الجوال", href: "/mobile-accessories/cover" },
        ],
      },
    ],
  },
  {
    title: "الأجهزة المنزلية",
    children: [
      {
        title: "الثلاجات والمجمدات",
        children: [
          { title: "ثلاجة سايد باي سايد", href: "/appliances/side-by-side" },
          { title: "ثلاجة باب فرنسي", href: "/appliances/french-door" },
          { title: "ثلاجة عادية", href: "/appliances/regular" },
          { title: "مجمد رأسي", href: "/appliances/chest-freezer" },
        ],
      },
      {
        title: "الغسالات",
        children: [
          {
            title: "غسالة عادية",
            href: "/appliances/washing-machine",
          },
          {
            title: "غسالة مع نشافة",
            href: "/appliances/washer-dryer",
          },
        ],
      },
      {
        title: "المواقد والشفاطات",
        children: [
          { title: "موقد غاز", href: "/appliances/gas-cooker" },
          { title: "موقد مدمج", href: "/appliances/built-in-cooker" },
          { title: "شفاط مطبخ", href: "/appliances/hood" },
        ],
      },
      {
        title: "المكانس الكهربائية",
        children: [
          { title: "مكنسة عادية", href: "/appliances/vacuum" },
          { title: "مكنسة روبوت", href: "/appliances/robot-vacuum" },
          { title: "مكنسة يدوية", href: "/appliances/handheld-vacuum" },
        ],
      },
    ],
  },
  {
    title: "الأزياء والملابس",
    children: [
      {
        title: "ملابس رجالية",
        children: [
          { title: "تيشيرتات", href: "/fashion/men/t-shirt" },
          { title: "بناطيل", href: "/fashion/men/pants" },
          { title: "جاكيتات ومعاطف", href: "/fashion/men/jacket" },
          { title: "أحذية رجالية", href: "/fashion/men/shoes" },
        ],
      },
      {
        title: "ملابس نسائية",
        children: [
          { title: "بلوزات", href: "/fashion/women/blouse" },
          { title: "تنانير", href: "/fashion/women/skirt" },
          { title: "فساتين", href: "/fashion/women/dress" },
          { title: "أحذية نسائية", href: "/fashion/women/shoes" },
        ],
      },
      {
        title: "المجوهرات",
        children: [
          { title: "قلائد", href: "/fashion/jewelry/necklace" },
          { title: "أساور", href: "/fashion/jewelry/bracelet" },
          { title: "خواتم", href: "/fashion/jewelry/ring" },
        ],
      },
    ],
  },
  {
    title: "البقالة",
    children: [
      {
        title: "المواد الغذائية",
        children: [
          { title: "الزيوت والدهون", href: "/grocery/oil" },
          { title: "الأرز والبقوليات", href: "/grocery/rice" },
          { title: "المشروبات", href: "/grocery/beverage" },
          { title: "المعلبات والوجبات الجاهزة", href: "/grocery/canned-food" },
        ],
      },
      {
        title: "المنظفات ومستلزمات النظافة",
        children: [
          { title: "سائل الجلي", href: "/grocery/detergent" },
          { title: "مسحوق الغسيل", href: "/grocery/laundry" },
          { title: "معطرات الجو", href: "/grocery/air-freshener" },
        ],
      },
    ],
  },
  {
    title: "الكتب والقرطاسية",
    children: [
      {
        title: "الكتب",
        children: [
          { title: "روايات وقصص", href: "/books/novel" },
          { title: "كتب تاريخية", href: "/books/history" },
          { title: "كتب علمية وتعليمية", href: "/books/science" },
          { title: "كتب للأطفال واليافعين", href: "/books/children" },
        ],
      },
      {
        title: "القرطاسية",
        children: [
          { title: "أقلام", href: "/stationery/pen" },
          { title: "دفاتر وأوراق", href: "/stationery/notebook" },
          { title: "أقلام رصاص ومبراة", href: "/stationery/pencil" },
        ],
      },
    ],
  },
  {
    title: "الرياضة والسفر",
    children: [
      {
        title: "معدات رياضية",
        children: [
          { title: "مشاية رياضية", href: "/sports/treadmill" },
          { title: "دراجة ثابتة", href: "/sports/stationary-bike" },
          { title: "أوزان ودمبل", href: "/sports/weights" },
          { title: "سجادة يوجا", href: "/sports/yoga-mat" },
          { title: "حبل قفز", href: "/sports/jump-rope" },
          { title: "أحذية رياضية", href: "/sports/shoes" },
        ],
      },
      {
        title: "رياضات جماعية",
        children: [
          { title: "كرة قدم", href: "/sports/football" },
          { title: "كرة سلة", href: "/sports/basketball" },
          { title: "مضارب وكرة تنس", href: "/sports/tennis" },
          { title: "مستلزمات كرة طائرة", href: "/sports/volleyball" },
        ],
      },
      {
        title: "تسلق وتخييم",
        children: [
          { title: "حقائب ظهر", href: "/travel/backpack" },
          { title: "خيام", href: "/travel/tent" },
          { title: "أكياس نوم", href: "/travel/sleeping-bag" },
          { title: "مصابيح يدوية", href: "/travel/flashlight" },
          { title: "قوارير ماء", href: "/travel/flask" },
        ],
      },
      {
        title: "حقائب وأمتعة",
        children: [
          { title: "أمتعة سفر", href: "/travel/luggage" },
          { title: "حقائب يد", href: "/travel/duffle-bag" },
          { title: "حقائب لابتوب", href: "/travel/laptop-backpack" },
        ],
      },
    ],
  },
  {
    title: "الجمال والعناية",
    children: [
      {
        title: "مستحضرات تجميل",
        children: [
          { title: "مستحضرات الوجه", href: "/beauty/makeup/face" },
          { title: "مستحضرات العيون", href: "/beauty/makeup/eyes" },
          { title: "أحمر الشفاه", href: "/beauty/makeup/lip" },
          { title: "فرش وأدوات التجميل", href: "/beauty/makeup/tools" },
        ],
      },
      {
        title: "العناية بالبشرة والشعر",
        children: [
          { title: "مرطبات البشرة", href: "/beauty/skin/moisturizer" },
          { title: "ماسكات الوجه", href: "/beauty/skin/mask" },
          { title: "شامبو وبلسم", href: "/beauty/hair/shampoo" },
          { title: "زيوت الشعر", href: "/beauty/hair/oil" },
        ],
      },
      {
        title: "العطور",
        children: [
          { title: "عطور رجالية", href: "/beauty/fragrance/men" },
          { title: "عطور نسائية", href: "/beauty/fragrance/women" },
          { title: "مجموعات هدايا", href: "/beauty/fragrance/gift-set" },
        ],
      },
      {
        title: "النظافة الشخصية",
        children: [
          { title: "فرشاة ومعجون أسنان", href: "/beauty/personal/tooth" },
          { title: "مستلزمات الحلاقة", href: "/beauty/personal/shaving" },
          {
            title: "مستلزمات النظافة الشخصية",
            href: "/beauty/personal/intimate",
          },
        ],
      },
    ],
  },
  {
    title: "أدوات ومعدات صناعية",
    children: [
      {
        title: "أدوات كهربائية",
        children: [
          { title: "مثاقب", href: "/tools/electric/drill" },
          { title: "مطاحن", href: "/tools/electric/grinder" },
          {
            title: "مفكات براغي كهربائية",
            href: "/tools/electric/screwdriver",
          },
        ],
      },
      {
        title: "أدوات يدوية",
        children: [
          { title: "مطارق", href: "/tools/manual/hammer" },
          { title: "مفاتيح", href: "/tools/manual/wrench" },
          { title: "مفكات براغي", href: "/tools/manual/screwdriver" },
        ],
      },
      {
        title: "سلامة وأمان",
        children: [
          { title: "قفازات أمان", href: "/tools/safety/gloves" },
          { title: "خوذات أمان", href: "/tools/safety/helmet" },
          { title: "نظارات أمان", href: "/tools/safety/goggles" },
        ],
      },
    ],
  },
  {
    title: "سيارات ومستلزماتها",
    children: [
      {
        title: "مستلزمات السيارات",
        children: [
          { title: "زيت المحرك", href: "/car/consumables/oil" },
          { title: "فلتر الهواء", href: "/car/consumables/air-filter" },
          { title: "مساحات الزجاج", href: "/car/consumables/wiper" },
        ],
      },
      {
        title: "إكسسوارات السيارات",
        children: [
          { title: "أغطية المقاعد", href: "/car/accessories/seat-cover" },
          { title: "أنظمة الصوت", href: "/car/accessories/audio" },
          { title: "كاميرات السيارات", href: "/car/accessories/dashcam" },
        ],
      },
      {
        title: "أدوات إصلاح السيارات",
        children: [
          { title: "رافعات", href: "/car/tools/jack" },
          { title: "مفاتيح العجلات", href: "/car/tools/wrench" },
          { title: "مضخات هواء", href: "/car/tools/air-pump" },
        ],
      },
    ],
  },
];

export default function MegaMenu() {
  const [openMain, setOpenMain] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const categoryChangeTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleOpen = (e: any) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMain(true);
    setActiveCategory(0);
    setHoveredItem(0);
  };

  const handleCloseWithDelay = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenMain(false);
      setActiveCategory(null);
      setHoveredItem(null);
    }, 300);
  };

  const handleCategoryHover = (idx: number) => {
    setHoveredItem(idx);

    if (categoryChangeTimeout.current) {
      clearTimeout(categoryChangeTimeout.current);
    }

    categoryChangeTimeout.current = setTimeout(() => {
      setActiveCategory(idx);
    }, 190);
  };

  const cancelClose = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    if (categoryChangeTimeout.current)
      clearTimeout(categoryChangeTimeout.current);
  };

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
      if (categoryChangeTimeout.current)
        clearTimeout(categoryChangeTimeout.current);
    };
  }, []);

  return (
    <header className='bg-white z-50 '>
      <div className='hidden xl:block'>
        {/* Top Menu */}
        <div className='container mx-auto text-[#62666d] p-4 flex gap-4 justify-between items-center'>
          <div className='flex gap-4 w-full max-w-[600px] items-center'>
            <span>الشعار</span>
            <Search />
          </div>

          <div className='flex gap-[42px] items-center'>
            <span>
              الدعم على مدار 24 ساعة:
              <span className='mr-3'>
                021 - <span className='text-[#f3534f] text-[27px]'>4444</span>
              </span>
            </span>
            <Link
              href={"/cart"}
              className='relative rounded-full w-[129px] h-[44px] p-1 bg-[#f3534f] flex items-center gap-4 cursor-pointer'
            >
              <span className='flex items-center justify-center rounded-full w-[34px] !bg-white h-[34px] block'>
                <svg
                  width={20}
                  height={20}
                  viewBox='0 0 30 30'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 4.8L4.8 12C6.34284 24.6 4.8 26.4 15.6 26.4C26.4 26.4 24.8571 24.6 26.4 12L19.2 4.8'
                    stroke={"#464646"}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M2.4 12H28.8'
                    stroke={"#464646"}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M13.2 16.8V21.6M18 16.8V21.6'
                    stroke={"#464646"}
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <span className='text-white text-[14px]'>
                <span className='ml-2'>0</span>
                ريال
              </span>
              <span
                className='absolute bg-white rounded-full top-0 p-1 h-5 min-w-[20px] text-[12px] flex items-center justify-center'
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 4px",
                  top: "-10px",
                  left: "-10px",
                }}
              >
                1
              </span>
            </Link>
          </div>
        </div>
        <hr className='border border-[1.5px] border-[#ececec]' />
        <div className='container mx-auto flex justify-between items-center'>
          <nav className='relative'>
            <ul className='  flex items-center px-6 py-4 gap-8 !text-[13px] text-[#62666d] text-base'>
              <li
                className={`hover:text-[#f3534f] relative ${
                  openMain && "text-[#f3534f]"
                }`}
                onMouseEnter={handleOpen}
                onMouseLeave={handleCloseWithDelay}
              >
                <span className='cursor-pointer transition flex items-center gap-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 28 28'
                    stroke='currentColor'
                    width='19'
                    height='19'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M10 3H5a2 2 0 00-2 2v5h7V3zM19 3h-5v7h7V5a2 2 0 00-2-2zM3 14v5a2 2 0 002 2h5v-7H3zm11 7h5a2 2 0 002-2v-5h-7v7z'
                    />
                  </svg>
                  المنتجات
                </span>
              </li>

              <li className='hover:text-[#f3534f] transition '>
                <Link href='/'>
                  <span className='cursor-pointer transition flex gap-1 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='19'
                      height='19'
                      viewBox='0 0 28 28'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M3 12l9-9 9 9M5 10v10a1 1 0 0 0 1 1h3m10-11v10a1 1 0 0 1-1 1h-3m-6 0h4' />
                      <rect
                        x='10'
                        y='15'
                        width='4'
                        height='6'
                        fill='currentColor'
                      />
                    </svg>
                    الصفحة الرئيسية
                  </span>
                </Link>
              </li>
              <li className='hover:text-[#f3534f] transition'>
                <Link href='/contact'>
                  <span className='flex gap-1 transition items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='19'
                      height='19'
                      viewBox='0 0 28 28'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                      <circle
                        cx='12'
                        cy='12'
                        r='10'
                        fill='currentColor'
                        opacity='0.1'
                      />
                      <path
                        d='M14 2h4a2 2 0 0 1 2 2v4'
                        className='animate-pulse'
                        style={{ animationDuration: "2s" }}
                      />
                    </svg>
                    اتصل بنا
                  </span>
                </Link>
              </li>
              <li className='hover:text-[#f3534f] transition'>
                <Link href='/about'>
                  <span className='flex gap-1 transition items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      width='19'
                      height='19'
                      viewBox='0 0 28 28'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z'
                      />
                    </svg>
                    من نحن
                  </span>
                </Link>
              </li>
              <li className='hover:text-[#f3534f] transition'>
                <Link href='/rules'>
                  <span className='flex gap-1 items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      width='19'
                      height='19'
                      viewBox='0 0 28 28'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6M12 6v6m0 0v6m8-12h-4a2 2 0 01-2-2V2m-4 0H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z'
                      />
                    </svg>
                    الشروط والأحكام
                  </span>
                </Link>
              </li>
            </ul>

            {openMain && (
              <div
                onMouseEnter={cancelClose}
                onMouseLeave={handleCloseWithDelay}
                className='absolute top-full right-0 w-[1000px] h-[400px] shadow-xl border rounded-md grid grid-cols-3 gap-6 z-50 bg-white'
              >
                <div className='border-l !bg-[#f4f4f4] overflow-y-auto'>
                  <ul>
                    {menu.map((cat, idx) => (
                      <li
                        key={idx}
                        className={`cursor-pointer px-3 py-3 rounded border-b last:border-b-0 text-[13px] transition ${
                          hoveredItem === idx || activeCategory === idx
                            ? "bg-[#fefffe] text-[#f3534f]"
                            : "text-gray-500"
                        } ${activeCategory === idx ? "font-medium" : ""}`}
                        onMouseEnter={() => handleCategoryHover(idx)}
                        onMouseLeave={() => {
                          if (activeCategory !== idx) {
                            setHoveredItem(null);
                          }
                        }}
                      >
                        {cat.title}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className='col-span-2 grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto p-2'
                  onMouseEnter={cancelClose}
                >
                  {activeCategory !== null &&
                    menu[activeCategory]?.children?.map((sub, i) => (
                      <div key={i} className='flex flex-col'>
                        <p className='text-[14px] text-gray-900 mt-3 mb-4 px-1 border-r border-r-[2px] border-[#f3534f] text-md'>
                          {sub.title}
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            width={14}
                            height={14}
                            className='inline-block mr-1'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 19l-7-7 7-7'
                            />
                          </svg>
                        </p>
                        <ul className='flex flex-col gap-1 text-xs text-[#7f8389]'>
                          {sub.children.map((item, j) => (
                            <li key={j}>
                              <Link
                                href={item.href}
                                className='hover:text-[#f3534f] transition text-[13px] transition block py-0.5 leading-[21px]'
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </nav>
          <div className='px-4 flex items-center gap-4'>
            <Link
              href={"/login"}
              className='cursor-pointer border border-[#e0e0e2] rounded-md flex text-[#0c0c0c] text-[12px] p-2'
            >
              <svg
                width={20}
                height={20}
                viewBox='0 0 30 30'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7.41667 22.7041C7.41667 20.0899 9.25544 17.8632 11.7544 17.4512L11.9795 17.4141C13.9805 17.0842 16.0195 17.0842 18.0205 17.4141L18.2456 17.4512C20.7446 17.8632 22.5833 20.0899 22.5833 22.7041C22.5833 23.834 21.6966 24.75 20.6029 24.75H9.39714C8.30336 24.75 7.41667 23.834 7.41667 22.7041Z'
                  stroke={"#464646"}
                  strokeWidth='2'
                />
                <path
                  d='M19.4236 9.51563C19.4236 11.8715 17.4431 13.7813 15 13.7813C12.5569 13.7813 10.5764 11.8715 10.5764 9.51563C10.5764 7.15979 12.5569 5.25 15 5.25C17.4431 5.25 19.4236 7.15979 19.4236 9.51563Z'
                  stroke={"#464646"}
                  strokeWidth='2'
                />
              </svg>
              تسجيل الدخول / إنشاء حساب
            </Link>
            <Link
              href={"/special-offers"}
              className='p-2 text-[12px] rounded-md flex items-center gap-2'
              style={{
                backgroundImage: " linear-gradient(to right,#ff3a30,#ff6a00)",
              }}
            >
              <span className='relative w-3 h-3'>
                <span className='absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75 animate-ping'></span>
                <span className='relative inline-flex rounded-full h-3 w-3 bg-white'></span>
              </span>
              عروض خاصة
            </Link>
          </div>
        </div>
        <hr className='border border-[1.5px] border-[#ececec]' />
      </div>

      <div className='p-4 flex gap-4 justify-between items-center xl:hidden'>
        <Search />
        <Link
          href={"/cart"}
          className='relative rounded-full h-[44px] p-1 bg-[#f3534f] flex items-center gap-4 cursor-pointer'
        >
          <span className='flex items-center justify-center rounded-full w-[34px] !bg-white h-[34px] block'>
            <svg
              width={20}
              height={20}
              viewBox='0 0 30 30'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M12 4.8L4.8 12C6.34284 24.6 4.8 26.4 15.6 26.4C26.4 26.4 24.8571 24.6 26.4 12L19.2 4.8'
                stroke={"#464646"}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M2.4 12H28.8'
                stroke={"#464646"}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M13.2 16.8V21.6M18 16.8V21.6'
                stroke={"#464646"}
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>

          <span
            className='absolute bg-white rounded-full top-0 p-1 h-5 min-w-[20px] text-[12px] text-[#1f2937] flex items-center justify-center'
            style={{
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 4px",
              top: "-10px",
              left: "-10px",
            }}
          >
            1
          </span>
        </Link>
      </div>
      <MobileMenu />
    </header>
  );
}
