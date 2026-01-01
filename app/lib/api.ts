interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  rating?: number;
}

export async function getCategoryData(slug: string): Promise<{
  category: Category;
  subCategories: Category[];
  products: Product[];
}> {
  // در حالت واقعی این داده‌ها از API دریافت می‌شوند
  const mockCategories: Category[] = [
    { id: 1, name: "الکترونیک", slug: "electronics", parentId: null },
    { id: 2, name: "موبایل", slug: "mobile", parentId: 1 },
    { id: 3, name: "لپ‌تاپ", slug: "laptop", parentId: 1 },
    { id: 4, name: "هدفون", slug: "headphones", parentId: 1 },
    { id: 5, name: "پوشاک", slug: "clothing", parentId: null },
    { id: 6, name: "خانه", slug: "home", parentId: null },
  ];

  const mockProducts: Product[] = [
    {
      id: 1,
      name: "گوشی سامسونگ گلکسی S23",
      price: 25000000,
      image: "/products/s23.jpg",
      discount: 10,
      rating: 4.7,
    },
    {
      id: 2,
      name: "لپ‌تاپ اپل مک‌بوک پرو",
      price: 65000000,
      image: "/products/macbook.jpg",
      rating: 4.8,
    },
    {
      id: 3,
      name: "هدفون بی‌سیم سونی",
      price: 8500000,
      image: "/products/sony-headphones.jpg",
      discount: 15,
      rating: 4.5,
    },
    {
      id: 4,
      name: "گوشی شیائومی ردمی نوت 12",
      price: 12000000,
      image: "/products/redmi.jpg",
      rating: 4.3,
    },
    {
      id: 5,
      name: "لپ‌تاپ ایسوس ویووبوک",
      price: 32000000,
      image: "/products/asus.jpg",
      discount: 5,
      rating: 4.2,
    },
  ];

  const category = mockCategories.find((c) => c.slug === slug)!;
  const subCategories = mockCategories.filter(
    (c) => c.parentId === category?.id
  );

  // در حالت واقعی این فیلتراسیون در سرور انجام می‌شود
  const products = mockProducts.filter((p) =>
    subCategories.length > 0 ? true : p.id % 2 === 0
  );

  return {
    category,
    subCategories,
    products,
  };
}
