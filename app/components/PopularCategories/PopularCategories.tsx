import Image from "next/image";
import Link from "next/link";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "المواد الأساسية وبقالة",
      image: "/images/Image_categories/categories1.png",
      link: "/categories/mobiles",
    },
    {
      id: 2,
      title: "منتجات الألبان",
      image: "/images/Image_categories/categories2.png",
      link: "/categories/laptops",
    },
    {
      id: 3,
      title: " snacks",
      image: "/images/Image_categories/categories3.png",
      link: "/categories/home-appliances",
    },
    {
      id: 4,
      title: "البروتينات والبيض",
      image: "/images/Image_categories/categories4.png",
      link: "/categories/fashion",
    },
    {
      id: 5,
      title: "فطور",
      image: "/images/Image_categories/categories5.png",
      link: "/categories/books",
    },
    {
      id: 6,
      title: "مشروبات باردة",
      image: "/images/Image_categories/categories6.png",
      link: "/categories/sports",
    },
    {
      id: 7,
      title: "فواكه وخضروات",
      image: "/images/Image_categories/categories7.png",
      link: "/categories/beauty",
    },
  ];

  return (
    <section className='container mx-auto mt-[60px] my-12 px-4'>
      <h2 className='text-xl  text-center text-[#000000] mb-9'>
        الفئات الأكثر شيوعاً
      </h2>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-[10px]'>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.link}
            className='group flex flex-col items-center'
          >
            <div className='relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-primary transition-all'>
              <Image
                src={category.image}
                alt={category.title}
                fill
                className='object-cover p-3'
                sizes='(max-width: 640px) 20vw, (max-width: 768px) 15vw, 10vw'
              />
            </div>
            <h3 className='mt-3 text-[13px] text-[#1f1e1e] text-center'>
              {category.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
