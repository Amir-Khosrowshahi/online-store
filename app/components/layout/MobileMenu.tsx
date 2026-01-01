"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type MenuItem = {
  title: string;
  href?: string;
  children?: MenuItem[];
};
const menu: MenuItem[] = [
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
    title: "الرياضة والسفر",
    children: [
      {
        title: "معدات رياضية",
        children: [
          { title: "دمبل ووزن", href: "/sports/fitness/dumbbell" },
          { title: "حبل قفز", href: "/sports/fitness/rope" },
          { title: "سجادة يوجا", href: "/sports/yoga/mat" },
          { title: "كرة رياضية", href: "/sports/ball" },
        ],
      },
      {
        title: "ملابس رياضية",
        children: [
          { title: "ملابس رياضية رجالية", href: "/sports/wear/men" },
          { title: "ملابس رياضية نسائية", href: "/sports/wear/women" },
          { title: "أحذية رياضية", href: "/sports/wear/shoes" },
        ],
      },
      {
        title: "دراجات وسكوتر",
        children: [
          { title: "دراجة مدينة", href: "/sports/bike/city" },
          { title: "دراجة جبلية", href: "/sports/bike/mountain" },
          { title: "سكوتر كهربائي", href: "/sports/scooter/electric" },
        ],
      },
      {
        title: "مستلزمات السفر",
        children: [
          { title: "أمتعة وحقائب", href: "/travel/bags" },
          { title: "حقائب ظهر", href: "/travel/backpack" },
          { title: "خيام وأكياس نوم", href: "/travel/tent" },
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

export default function MenuWithBottomSheet() {
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<MenuItem | null>(null);
  const [menuHistory, setMenuHistory] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (showBottomSheet) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setCurrentCategory(null);
      setMenuHistory([]);
    }
  }, [showBottomSheet]);

  const openCategory = (category: MenuItem) => {
    setCurrentCategory(category);
    if (!currentCategory) {
      setMenuHistory((prev) => [...prev, category]);
    }
  };

  const openSubMenu = (item: MenuItem) => {
    if (item.children) {
      setCurrentCategory(item);
      setMenuHistory((prev) => [...prev, item]);
    }
  };

  const goBack = () => {
    if (menuHistory.length > 0) {
      const newHistory = menuHistory.slice(0, -1);
      setMenuHistory(newHistory);
      setCurrentCategory(newHistory[newHistory.length - 1] || null);
    }
  };
  return (
    <div className='xl:hidden'>
      {/* شريط التنقل السفلي */}
      <nav className='fixed bottom-0 left-0 right-0 bg-white shadow-md z-50  border border-black/10 px-[6px] py-[6px] text-[12px] rounded-t-[29px] rounded-b-none'>
        <ul className='flex justify-around items-center text-sm text-gray-700'>
          <li>
            <Link href='/' className='block py-2 px-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mx-auto mb-1'
                fill='none'
                viewBox='0 0 24 24'
                width='19'
                height='19'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 10l9-7 9 7v10a1 1 0 01-1 1h-5a1 1 0 01-1-1V12H9v8a1 1 0 01-1 1H4a1 1 0 01-1-1V10z'
                />
              </svg>
              الرئيسية
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowBottomSheet(true)}
              className='py-2 px-3'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mx-auto mb-1'
                fill='none'
                viewBox='0 0 24 24'
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
            </button>
          </li>
          <li>
            <Link href='/about' className='block py-2 px-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mx-auto mb-1'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                width='19'
                height='19'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z'
                />
              </svg>
              من نحن
            </Link>
          </li>
          <li>
            <Link href='/contact' className='block py-2 px-3'>
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
                className='mx-auto mb-1'
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
            </Link>
          </li>
          <li>
            <Link href='/rules' className='block py-2 px-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                width='19'
                height='19'
                viewBox='0 0 28 28'
                stroke='currentColor'
                className='mx-auto mb-1'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 12h6m-6 4h6M12 6v6m0 0v6m8-12h-4a2 2 0 01-2-2V2m-4 0H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z'
                />
              </svg>
              الشروط
            </Link>
          </li>
        </ul>
      </nav>

      {/* خلفية شفافة */}
      {showBottomSheet && (
        <div
          onClick={() => setShowBottomSheet(false)}
          className='fixed inset-0 bg-black bg-opacity-40 z-40'
        />
      )}

      {/* القائمة المنزلقة */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl p-6 transition-transform duration-300 ease-in-out
        ${showBottomSheet ? "translate-y-0" : "translate-y-full"}`}
        style={{ willChange: "transform" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-4 text-[#0c0c0c]'>
          <h2 className='text-lg font-bold'>
            {currentCategory ? currentCategory.title : "فئات المنتجات"}
          </h2>
          <div className='flex items-center gap-4'>
            {menuHistory.length > 0 && (
              <button
                onClick={goBack}
                className='text-[#0c0c0c] text-xs'
                aria-label='عودة'
              >
                عودة
              </button>
            )}
            <button
              onClick={() => setShowBottomSheet(false)}
              aria-label='إغلاق'
              className='text-[#0c0c0c] hover:text-gray-900 border border-opacity-10 border-black p-1.5 text-xs rounded-[5px] '
            >
              &times; إغلاق
            </button>
          </div>
        </div>

        {!currentCategory &&
          menu?.map((cat, ci) => (
            <button
              key={ci}
              onClick={() => openCategory(cat)}
              className='w-full text-right py-2 px-4 mb-2 bg-gray-100 rounded hover:bg-gray-200 text-[#0c0c0c]'
            >
              {cat.title}
            </button>
          ))}

        {currentCategory && currentCategory.children && (
          <div>
            {currentCategory.children.map((subCategory, subIndex) =>
              subCategory.children ? (
                <button
                  key={subIndex}
                  onClick={() => openSubMenu(subCategory)}
                  className='w-full text-right py-2 px-4 mb-2 bg-gray-100 rounded text-[#0c0c0c]'
                >
                  {subCategory.title}
                </button>
              ) : (
                <Link
                  key={subIndex}
                  href={subCategory.href || "#"}
                  className='block w-full text-right py-2 px-4 mb-2 text-[#0c0c0c] hover:text-[#f3534f]'
                  onClick={() => setShowBottomSheet(false)}
                >
                  {subCategory.title}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
