import CountdownTimer from "@/app/common/CountdownTimerProps/CountdownTimerProps";
import ColorSelector from "./ColorSelector/ColorSelector";
import ProductGallery from "./ProductGallery/ProductGallery";
import ProductSlider from "../ProductSlider/ProductSlider";
import ProductTabs from "./ProductTabs/ProductTabs";

interface Attr {
  attr: string;
}

const product = {
  title: "سماعات ريمكس بلوتوث موديل RB-S1",
  image: "/images/Image_product_slider/product-1.webp",
  price: 12100000,
  discount: 10,
  rating: 4.2,
  reviewsCount: 38,
  remainingCount: 3,
  description:
    "سماعات ريمكس لاسلكية بتصميم ergonomi، جودة صوت ممتازة وإمكانية إجراء المكالمات.",
  brand: "ريمكس",
  category: "سماعات، هيدست وسماعات رأس",
  warranty: "ضمان ١٨ شهر شركة",
  seller: "المتجر الرسمي",
  specifications: [
    { label: "نوع الاتصال", value: "لاسلكي وسلكي" },
    { label: "واجهة الاتصال", value: "بلوتوث وجاك 3.5 ملم" },
    { label: "إصدار البلوتوث", value: "5.0" },
    { label: "ميكروفون", value: "مدعم" },
  ],
};

const productList = [
  {
    id: 1,
    title: "جوال سامسونج جلاكسي A73",
    image: "/images/Image_product_slider/product-1.webp",
    price: 12000000,
    oldPrice: 15000000,
    discount: 20,
    link: "/products/1",
  },
  {
    id: 2,
    title: "لابتوب اسوس فيفوبوك 15",
    image: "/images/Image_product_slider/product-2.webp",
    price: 25000000,
    oldPrice: 28000000,
    discount: 11,
    link: "/products/2",
  },
  {
    id: 3,
    title: "سماعات بي سيز موديل Q20",
    image: "/images/Image_product_slider/product-3.webp",
    price: 3500000,
    oldPrice: 4000000,
    discount: 13,
    link: "/products/3",
  },
  {
    id: 4,
    title: "ماوس قيمنق ريبو",
    image: "/images/Image_product_slider/product-4.webp",
    price: 1200000,
    oldPrice: 1500000,
    discount: 20,
    link: "/products/4",
  },
  {
    id: 5,
    title: "كيبورد ميكانيكال كورسير",
    image: "/images/Image_product_slider/product-5.webp",
    price: 4500000,
    oldPrice: 5000000,
    discount: 10,
    link: "/products/5",
  },
  {
    id: 6,
    title: "شاشة ال جي 24 انش",
    image: "/images/Image_product_slider/product-6.webp",
    price: 8000000,
    oldPrice: 8500000,
    discount: 6,
    link: "/products/6",
  },
  {
    id: 7,
    title: "سماعة بلوتوث جي بي ال",
    image: "/images/Image_product_slider/product-7.webp",
    price: 3200000,
    oldPrice: 3500000,
    discount: 9,
    link: "/products/7",
  },
  {
    id: 8,
    title: "هارد خارجي سيجيت 1 تيرابايت",
    image: "/images/Image_product_slider/product-8.webp",
    price: 2800000,
    oldPrice: 3000000,
    discount: 7,
    link: "/products/8",
  },
  {
    id: 9,
    title: "تابلت سامسونج جلاكسي تاب A8",
    image: "/images/Image_product_slider/product-9.webp",
    price: 10000000,
    oldPrice: 12000000,
    discount: 17,
    link: "/products/9",
  },
  {
    id: 10,
    title: "شاحن لاسلكي شاومي",
    image: "/images/Image_product_slider/product-10.webp",
    price: 1800000,
    oldPrice: 2000000,
    discount: 10,
    link: "/products/10",
  },
];

const targetTime = new Date(Date.now() + 2 * 60 * 60 * 1000);
const finalPrice = product.price - (product.price * product.discount) / 100;

export default function ShowProduct({ attr }: Attr) {
  return (
    <div className='container mx-auto'>
      <div className='mt-[40px] p-2 pb-4 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white rounded-xl rtl'>
        {/* العمود الأول: معرض الصور */}
        <div className='col-span-1 flex items-center justify-center relative'>
          <CountdownTimer targetTime={targetTime} />
          <ProductGallery
            images={[
              "/images/Product_details_image/Image_details.jpg",
              "/images/Product_details_image/Image_details2.webp",
              "/images/Product_details_image/Image_details3.webp",
              "/images/Product_details_image/Image_details4.webp",
              "/images/Product_details_image/Image_details5.webp",
            ]}
            title='سماعات ريمكس بلوتوث'
          />
        </div>

        {/* العمود الثاني: المعلومات العامة للمنتج */}
        <div className='col-span-1 space-y-4'>
          <h1 className='text-2xl font-bold text-gray-800'>{product.title}</h1>
          <p className='text-sm text-gray-500'>
            العلامة التجارية: {product.brand}
          </p>
          <p className='text-sm text-gray-500'>الفئة: {product.category}</p>

          <div className='flex items-center gap-2'>
            <span className='text-yellow-400 text-lg'>★ {product.rating}</span>
            <span className='text-sm text-gray-500'>
              ({product.reviewsCount} تقييم مسجل)
            </span>
          </div>

          <div className='space-y-2'>
            <p className='text-gray-600 text-sm leading-relaxed'>
              {product.description}
            </p>
            {/* الوسوم */}
            <div className='flex flex-wrap gap-2 text-sm'>
              <span className='bg-gray-100 px-3 py-1 rounded-full text-gray-600'>
                {product.warranty}
              </span>
            </div>
            <div className='flex flex-wrap gap-2 text-sm'>
              <ColorSelector />
            </div>
          </div>

          <div className='mt-4'>
            <h2 className='text-lg font-semibold text-gray-800 mb-2'>
              المواصفات :
            </h2>
            <ul className='text-sm text-gray-700 space-y-1'>
              {product.specifications.map((item, index) => (
                <li key={index} className='flex justify-between border-b p-2'>
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* العمود الثالث: السعر والشراء */}
        <div className='col-span-1 relative'>
          <div className='sticky top-6 w-full rounded-2xl border p-5  bg-white space-y-5 max-w-lg'>
            {/* قسم المقارنة والمفضلة */}
            <div className='flex justify-between items-center text-sm text-gray-600'>
              <button className='hover:text-blue-600 transition'>
                ❤️ إضافة إلى المفضلة
              </button>
              <button className='hover:text-blue-600 transition'>
                🔁 إضافة للمقارنة
              </button>
            </div>

            {/* السعر والخصم */}
            <div className='space-y-1'>
              {product.discount > 0 && (
                <div className='text-red-400 line-through text-sm'>
                  {product.price.toLocaleString("ar-SA")} ريال
                </div>
              )}
              <div className='text-2xl text-[#23254e] font-bold'>
                {finalPrice.toLocaleString("ar-SA")} ريال
              </div>
              {product.discount > 0 && (
                <div className='text-xs bg-red-100 text-red-600 w-max px-2 py-1 rounded-full'>
                  خصم {product.discount}% خاص
                </div>
              )}
            </div>

            {/* معلومات إضافية */}
            <ul className='space-y-2 text-sm text-gray-700'>
              <li className='flex justify-between border-b pb-2'>
                <span>الكمية المتبقية:</span>
                <span className=''>
                  {product.remainingCount > 0
                    ? `${product.remainingCount} قطعة`
                    : "غير متوفر"}
                </span>
              </li>
              <li className='flex justify-between border-b pb-2'>
                <span>طريقة التوصيل:</span>
                <span className=''>بريد سريع</span>
              </li>
              <li className='flex justify-between'>
                <span>توصيل مجاني:</span>
                <span className='text-green-600 '>لطلبات فوق ١٠٠٠٠٠٠ ريال</span>
              </li>
            </ul>

            {/* زر الشراء */}
            <button className='w-full bg-[#ef4056] hover:bg-[#f13851] transition text-white text-sm py-3 rounded-xl '>
              أضف إلى السلة
            </button>
          </div>
        </div>
      </div>
      <hr className='w-full border-b border-4 border-[#ececee] px-4 mx-auto mt-3 mb-3' />
      {/* سلايدر المنتجات */}
      <div className='mt-5'>
        <ProductSlider title='منتجات مشابهة' products={productList} />
      </div>
      {/* التبويبات */}
      <ProductTabs />
    </div>
  );
}
