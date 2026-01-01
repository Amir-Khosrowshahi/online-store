import BannerGrid from "../components/BannerGrid/BannerGrid";
import MainSlider from "../components/MainSlider/MainSlider";
import PopularBrandsSlider from "../components/PopularBrandsSlider/PopularBrandsSlider";
import PopularCategories from "../components/PopularCategories/PopularCategories";
import ProductSlider from "../components/ProductSlider/ProductSlider";
import SliderDiscount from "../components/SliderDiscount/SliderDiscount";
import SliderStory from "../components/SliderStory/SliderStory";
const banners = [
  {
    image: "/images/Image__banners/small_baner1.jpg",
    alt: "خصومات على المنتجات الإلكترونية",
    title: "إلكترونيات",
    subtitle: "خصم حتى 40%",
    link: "/electronics",
    textPosition: "right",
  },
  {
    image: "/images/Image__banners/small_baner2.jpg",
    alt: "الأكثر مبيعاً",
    title: "الأكثر مبيعاً",
    subtitle: "شاهد القائمة",
    link: "/best-sellers",
    textPosition: "left",
  },
  {
    image: "/images/Image__banners/small_baner3.jpg",
    alt: "أحدث المنتجات",
    title: "وصل جديد",
    link: "/new-arrivals",
    textPosition: "right",
  },
  {
    image: "/images/Image__banners/small_baner4.jpg",
    alt: "أجهزة منزلية",
    title: "أجهزة منزلية",
    subtitle: "توصيل مجاني",
    link: "/home-appliances",
    textPosition: "left",
  },
];

const products = [
  {
    id: 1,
    title: "جوال سامسونج جالاكسي A73",
    image: "/images/Image_product_slider/product-1.webp",
    price: 12000000,
    oldPrice: 15000000,
    discount: 20,
    link: "/products/1",
  },
  {
    id: 2,
    title: "لابتوب اسوس فيڤوبوك 15",
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
    title: "تابلت سامسونج جالاكسي تاب A8",
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

export default function Home() {
  return (
    <main>
      <SliderStory />
      <MainSlider />
      <SliderDiscount />
      <BannerGrid banners={banners} />
      <PopularCategories />
      <ProductSlider title='أحدث المنتجات' products={products} />
      <PopularBrandsSlider />
    </main>
  );
}
