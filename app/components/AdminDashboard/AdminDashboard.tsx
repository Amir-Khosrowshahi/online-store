"use client";
import { useState } from "react";
import {
  User,
  ShoppingCart,
  Settings,
  LogOut,
  Bell,
  Search,
  Package,
  Users,
  BarChart2,
  Tag,
  Mail,
  MessageSquare,
  HelpCircle,
  Plus,
  Trash,
  DollarSign,
  Layers,
} from "react-feather";
import Orders from "./Orders/Orders";
import Inventory from "./Inventory/Inventory";
import Customers from "./Customers/Customers";
import Reviews from "./Reviews/Reviews";
import Products from "./Products/Products";
import Discounts from "./Discounts/Discounts";
import Reports from "./Reports/Reports";
import Financial from "./Financial/Financial";
import SettingsSite from "./Settings/SettingsSite";

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

// أنواع البيانات
type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  color: string;
  size: string;
  price: number;
  discount: number;
  tax: number;
  stock: number;
  minStock: number;
  images: string[];
  features: { title: string; value: string }[];
  description?: string;
  status: "active" | "inactive";
  sales: number;
  createdAt: string;
};

type Order = {
  id: number;
  customer: string;
  date: string;
  status:
    | "pending"
    | "processing"
    | "ready"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded"
    | "returned";
  total: number;
  payment: string;
  trackingCode: string;
  items: { name: string; quantity: number; price: number }[];
  shippingAddress: string;
  cancelReason?: string;
  returned?: string;
  returnReason?: string;
};

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  registerDate: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "blocked" | "new" | "inactive";
  notes: string[];
  address?: string;
};

type Review = {
  id: number;
  product: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  status: "approved" | "pending" | "rejected";
  reply?: string;
};

type Discount = {
  id: number;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  startDate: string;
  endDate: string;
  products: string[];
  categories: string[];
  minOrder: number;
  usageLimit: number | null;
  used: number;
  description?: string;
};

type InventoryLog = {
  id: number;
  product: string;
  type: "in" | "out";
  quantity: number;
  date: string;
  reason: string;
  operator: string;
};

type FinancialTransaction = {
  id: number;
  orderId: number;
  amount: number;
  type: "income" | "expense" | "refund";
  date: string;
  description: string;
  status: "success" | "failed" | "pending";
};

type ProductDetailModalProps = {
  isOpen: boolean;
  order: Product | null;
  onClose: () => void;
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentDiscount, setCurrentDiscount] = useState<Discount | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

  const [features, setFeatures] = useState<{ title: string; value: string }[]>([
    { title: "", value: "" },
  ]);
  const addNewFeature = () => {
    setFeatures([...features, { title: "", value: "" }]);
  };
  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };
  const handleFeatureChange = (
    index: number,
    field: "title" | "value",
    newValue: string
  ) => {
    const newFeatures = [...features];
    newFeatures[index][field] = newValue;
    setFeatures(newFeatures);
  };

  const openDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProduct(null);
  };

  const openOrderDetailModal = (order: Product) => {
    // منطق عرض مودال تفاصيل الطلب
    setSelectedOrder(order);
    setIsOrderDetailModalOpen(true);
  };

  // بيانات نموذجية
  const products: Product[] = [
    {
      id: 1001,
      name: "هاتف سامسونج S23",
      category: "هواتف",
      brand: "سامسونج",
      color: "أسود",
      size: "",
      price: 15000000,
      discount: 10,
      tax: 9,
      stock: 25,
      minStock: 5,
      images: [
        "/images/products/samsung-s23-1.webp",
        "/images/products/samsung-s23-2.webp",
      ],
      features: [
        { title: "التخزين الداخلي", value: "256GB" },
        { title: "الذاكرة العشوائية", value: "8GB" },
        { title: "المعالج", value: "Snapdragon 8 Gen 2" },
        { title: "الشاشة", value: "6.1 بوصة AMOLED" },
        { title: "البطارية", value: "3900mAh" },
      ],
      status: "active",
      sales: 42,
      createdAt: "1402/05/10",
    },
    {
      id: 1002,
      name: "سماعة لاسلكية سوني WH-1000XM4",
      category: "ملحقات",
      brand: "سوني",
      color: "أسود",
      size: "",
      price: 4500000,
      discount: 15,
      tax: 9,
      stock: 18,
      minStock: 3,
      images: [
        "/images/products/sony-wh1000xm4-1.webp",
        "/images/products/sony-wh1000xm4-2.webp",
      ],
      features: [
        { title: "النوع", value: "لاسلكي" },
        { title: "تقنية إلغاء الضوضاء", value: "مدعوم" },
        { title: "مدة البطارية", value: "30 ساعة" },
        { title: "الوزن", value: "254 جرام" },
      ],
      status: "active",
      sales: 28,
      createdAt: "1402/05/12",
    },
    // ... باقي المنتجات
  ];

  const orders: Order[] = [
    {
      id: 5001,
      customer: "علي محمدي",
      date: "۱۴۰۲/۰۶/۱۵",
      status: "shipped",
      total: 18500000,
      payment: "إلكتروني",
      trackingCode: "TR123456789",
      items: [
        { name: "هاتف سامسونج S23", quantity: 1, price: 15000000 },
        { name: "غطاء واقي", quantity: 1, price: 3500000 },
      ],
      shippingAddress: "طهران، شارع وليعصر، زقاق الشهيد فلاني، الرقم ۱۲",
    },
    // ... باقي الطلبات
  ];

  const customers: Customer[] = [
    {
      id: 2001,
      name: "علي محمدي",
      email: "ali@example.com",
      phone: "09123456789",
      registerDate: "1402/03/15",
      orders: 5,
      totalSpent: 42000000,
      lastOrder: "۱۴۰۲/۰۶/۱۵",
      status: "active",
      notes: ["عميل مخلص", "يفضل الشحن عبر البريد السريع"],
      address: "طهران، شارع وليعصر، الرقم ۱۲۳٤",
    },
    // ... باقي العملاء
  ];

  const reviews: Review[] = [
    {
      id: 3001,
      product: "هاتف سامسونج S23",
      customer: "علي محمدي",
      rating: 5,
      comment: "جودة ممتازة وسعر مناسب",
      date: "۱۴۰۲/۰۶/۱۰",
      status: "approved",
      reply: "شكرًا لرأيك. سعدنا برضاك.",
    },
    // ... باقي التقييمات
  ];

  const discounts: Discount[] = [
    {
      id: 4001,
      code: "SUMMER2023",
      type: "percentage",
      value: 15,
      startDate: "1402/06/01",
      endDate: "1402/06/30",
      products: ["هاتف سامسونج S23"],
      categories: ["هواتف"],
      minOrder: 1000000,
      usageLimit: 100,
      used: 42,
    },
    // ... باقي الخصومات
  ];

  const inventoryLogs: InventoryLog[] = [
    {
      id: 6001,
      product: "هاتف سامسونج S23",
      type: "in",
      quantity: 50,
      date: "1402/05/10",
      reason: "شراء أولي",
      operator: "مدير النظام",
    },
    // ... باقي سجلات المخزون
  ];

  const transactions: FinancialTransaction[] = [
    {
      id: 7001,
      orderId: 5001,
      amount: 18500000,
      type: "income",
      date: "1402/06/15",
      description: "دفع الطلب #5001",
      status: "success",
    },
    // ... باقي المعاملات
  ];

  // تصفية البيانات بناءً على البحث
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // عرض محتوى التبويبات
  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <Products
            colors={colors}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentProduct={setCurrentProduct}
            setShowProductModal={setShowProductModal}
            filteredProducts={filteredProducts}
          />
        );
      case "inventory":
        return (
          <Inventory
            colors={colors}
            products={products}
            inventoryLogs={inventoryLogs}
          />
        );
      case "orders":
        return (
          <Orders
            colors={colors}
            orders={orders}
            openOrderDetailModal={openOrderDetailModal}
          />
        );
      case "customers":
        return <Customers colors={colors} customers={customers} />;
      case "reviews":
        return <Reviews colors={colors} reviews={reviews} />;
      case "discounts":
        return (
          <Discounts
            colors={colors}
            setCurrentDiscount={setCurrentDiscount}
            setShowDiscountModal={setShowDiscountModal}
            discounts={discounts}
          />
        );
      case "reports":
        return (
          <Reports colors={colors} products={products} customers={customers} />
        );
      case "financial":
        return <Financial colors={colors} transactions={transactions} />;
      case "settings":
        return <SettingsSite colors={colors} />;
      default:
        return null;
    }
  };

  // مودال إضافة/تعديل المنتج
  const ProductModal = () => {
    if (!showProductModal) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-bold' style={{ color: colors.dark }}>
                {currentProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className='text-gray-500 hover:text-gray-700 text-[24px]p-[5px] border w-[34px] h-[32px] flex items-center justify-center rounded-[9px]'
              >
                &times;
              </button>
            </div>

            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-gray-700 mb-1'>اسم المنتج</label>
                  <input
                    type='text'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentProduct?.name || ""}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>الفئة</label>
                  <select className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    <option>هواتف</option>
                    <option>لابتوب</option>
                    <option>سماعات</option>
                    <option>ملحقات</option>
                  </select>
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>
                    العلامة التجارية
                  </label>
                  <input
                    type='text'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentProduct?.brand || ""}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>اللون</label>
                  <input
                    type='text'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentProduct?.color || ""}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>
                    السعر (تومان)
                  </label>
                  <input
                    type='number'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentProduct?.price || ""}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>الخصم (%)</label>
                  <input
                    type='number'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentProduct?.discount || 0}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>المخزون</label>
                  <input
                    type='number'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentProduct?.stock || 0}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>
                    الحد الأدنى للمخزون
                  </label>
                  <input
                    type='number'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentProduct?.minStock || 0}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>الحالة</label>
                  <select
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentProduct?.status || "active"}
                  >
                    <option value='active'>نشط</option>
                    <option value='inactive'>غير نشط</option>
                  </select>
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-gray-700 mb-1'>صور المنتج</label>
                  <div className='flex flex-wrap gap-3'>
                    {currentProduct?.images.map((img, index) => (
                      <div key={index} className='relative'>
                        <div className='w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden'>
                          <img
                            src={img}
                            alt={`Product ${index + 1}`}
                            className='object-cover w-full h-full'
                          />
                        </div>
                        <button
                          type='button'
                          className='absolute top-1 left-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <div className='w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center'>
                      <Plus size={24} className='text-gray-400' />
                    </div>
                  </div>
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-gray-700 mb-1'>
                    المواصفات الفنية
                  </label>
                  <div className='space-y-3'>
                    {features.map((feature, index) => (
                      <div key={index} className='flex items-center gap-3'>
                        <input
                          type='text'
                          placeholder='العنوان'
                          className='flex-1 border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                          value={feature.title}
                          onChange={(e) =>
                            handleFeatureChange(index, "title", e.target.value)
                          }
                        />
                        <input
                          type='text'
                          placeholder='القيمة'
                          className='flex-1 border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                          value={feature.value}
                          onChange={(e) =>
                            handleFeatureChange(index, "value", e.target.value)
                          }
                        />
                        <button
                          type='button'
                          className='text-red-500 hover:text-red-700'
                          onClick={() => removeFeature(index)}
                          disabled={features.length <= 1}
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    ))}
                    <button
                      type='button'
                      className='text-blue-500 hover:text-blue-700 text-sm flex items-center'
                      onClick={addNewFeature}
                    >
                      <Plus size={14} className='ml-1' />
                      إضافة مواصفة جديدة
                    </button>
                  </div>
                </div>
              </div>

              <div className='flex justify-end gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowProductModal(false)}
                  className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100'
                >
                  إلغاء
                </button>
                <button
                  type='submit'
                  className='px-6 py-2 rounded-lg text-white'
                  style={{ backgroundColor: colors.primary }}
                >
                  {currentProduct ? "حفظ التغييرات" : "إضافة المنتج"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // مودال إضافة/تعديل كود الخصم
  const DiscountModal = () => {
    if (!showDiscountModal) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-lg font-bold' style={{ color: colors.dark }}>
                {currentDiscount ? "تعديل كود الخصم" : "إضافة كود خصم جديد"}
              </h3>
              <button
                onClick={() => setShowDiscountModal(false)}
                className='text-gray-500 hover:text-gray-700 text-[24px]p-[5px] border w-[34px] h-[32px] flex items-center justify-center rounded-[9px]'
              >
                &times;
              </button>
            </div>

            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-gray-700 mb-1'>كود الخصم</label>
                  <input
                    type='text'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentDiscount?.code || ""}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>نوع الخصم</label>
                  <select
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentDiscount?.type || "percentage"}
                  >
                    <option value='percentage'>نسبة مئوية</option>
                    <option value='fixed'>مبلغ ثابت</option>
                  </select>
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>
                    {currentDiscount?.type === "fixed"
                      ? "مبلغ الخصم (تومان)"
                      : "نسبة الخصم"}
                  </label>
                  <input
                    type='number'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentDiscount?.value || 0}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>
                    الحد الأدنى للطلب (تومان)
                  </label>
                  <input
                    type='number'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentDiscount?.minOrder || 0}
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>
                    تاريخ البدء
                  </label>
                  <input
                    type='text'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentDiscount?.startDate || ""}
                    placeholder='1402/06/01'
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>
                    تاريخ الانتهاء
                  </label>
                  <input
                    type='text'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentDiscount?.endDate || ""}
                    placeholder='1402/06/30'
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-1'>
                    حد الاستخدام
                  </label>
                  <input
                    type='number'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500'
                    defaultValue={currentDiscount?.usageLimit || 0}
                    placeholder='0 لغير المحدود'
                  />
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-gray-700 mb-1'>
                    المنتجات المسموحة (اختياري)
                  </label>
                  <select
                    multiple
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto min-h-[100px]'
                  >
                    {products.map((product) => (
                      <option
                        key={product.id}
                        value={product.name}
                        selected={currentDiscount?.products.includes(
                          product.name
                        )}
                      >
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='md:col-span-2'>
                  <label className='block text-gray-700 mb-1'>
                    الفئات المسموحة (اختياري)
                  </label>
                  <select
                    multiple
                    className='w-full border border-gray-300 rounded-lg px-4 py-2 text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500 h-auto min-h-[100px]'
                  >
                    {Array.from(new Set(products.map((p) => p.category))).map(
                      (category) => (
                        <option
                          key={category}
                          value={category}
                          selected={currentDiscount?.categories.includes(
                            category
                          )}
                        >
                          {category}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className='flex justify-end gap-3 pt-4'>
                <button
                  type='button'
                  onClick={() => setShowDiscountModal(false)}
                  className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100'
                >
                  إلغاء
                </button>
                <button
                  type='submit'
                  className='px-6 py-2 rounded-lg text-white'
                  style={{ backgroundColor: colors.primary }}
                >
                  {currentDiscount ? "حفظ التغييرات" : "إضافة كود الخصم"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
    isOpen,
    order,
    onClose,
  }) => {
    if (!isOpen || !order) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
        <div className='bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
          <div className='p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h3 className='text-xl font-bold'>تفاصيل المنتج: {order.name}</h3>
              <button
                onClick={onClose}
                className='text-gray-500 hover:text-gray-700 text-2xl'
              >
                &times;
              </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* العمود الأول - المعلومات الأساسية */}
              <div>
                <div className='mb-4'>
                  <h4 className='font-bold mb-2'>المعلومات الأساسية</h4>
                  <div className='space-y-2'>
                    <p>
                      <span className='font-medium'>معرف المنتج:</span> #
                      {order.id}
                    </p>
                    <p>
                      <span className='font-medium'>الفئة:</span>{" "}
                      {order.category}
                    </p>
                    <p>
                      <span className='font-medium'>السعر:</span>{" "}
                      {order.price.toLocaleString("ar-IR")} تومان
                    </p>
                    <p>
                      <span className='font-medium'>المخزون:</span>{" "}
                      {order.stock} قطعة
                    </p>
                    <p>
                      <span className='font-medium'>الحالة:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs mr-2 ${
                          order.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status === "active" ? "نشط" : "غير نشط"}
                      </span>
                    </p>
                    <p>
                      <span className='font-medium'>عدد المبيعات:</span>{" "}
                      {order.sales}
                    </p>
                    <p>
                      <span className='font-medium'>تاريخ الإنشاء:</span>{" "}
                      {order.createdAt}
                    </p>
                  </div>
                </div>

                <div className='mb-4'>
                  <h4 className='font-bold mb-2'>وصف المنتج</h4>
                  <p className='text-gray-700'>
                    {order.description || "لم يتم إدخال وصف"}
                  </p>
                </div>
              </div>

              {/* العمود الثاني - الصور والمواصفات */}
              <div>
                <div className='mb-4'>
                  <h4 className='font-bold mb-2'>صور المنتج</h4>
                  <div className='flex flex-wrap gap-3'>
                    {order.images.map((img, index) => (
                      <div
                        key={index}
                        className='w-24 h-24 bg-gray-200 rounded-lg overflow-hidden'
                      >
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className='font-bold mb-2'>المواصفات الفنية</h4>
                  <div className='space-y-2'>
                    {order.features.length > 0 ? (
                      order.features.map((feature, index) => (
                        <div key={index} className='flex'>
                          <span className='font-medium min-w-[100px]'>
                            {feature.title}:
                          </span>
                          <span className='text-gray-700'>{feature.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className='text-gray-500'>لم يتم تعريف مواصفات</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end mt-6'>
              <button
                onClick={onClose}
                className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='' style={{ backgroundColor: colors.light }}>
      {/* الهيدر */}
      <header className='bg-white shadow-sm'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <button
                className='md:hidden mr-3'
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
                لوحة إدارة المتجر
              </h1>
            </div>

            <div className='flex items-center space-x-4'>
              <div className='relative hidden ml-3 md:block'>
                <input
                  type='text'
                  placeholder='بحث...'
                  className='border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
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

              <div className='hidden md:flex items-center space-x-2'>
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
                  مدير النظام
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
          <div className='bg-white rounded-xl shadow-sm p-6 mb-6 ml-4 border border-gray-100'>
            <div className='flex items-center mb-6'>
              <div
                className='w-12 h-12 rounded-full flex items-center justify-center mr-3'
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                <User size={20} style={{ color: colors.primary }} />
              </div>
              <div>
                <h3 className='font-bold' style={{ color: colors.dark }}>
                  مدير النظام
                </h3>
                <p className='text-sm' style={{ color: colors.gray }}>
                  studio amozesh
                </p>
              </div>
            </div>

            <nav className='space-y-1'>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "products"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <Package size={18} className='ml-2' />
                  <span>إدارة المنتجات</span>
                </div>
                <span
                  className='text-xs px-2 py-1 rounded-full'
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("inventory")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "inventory"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <Layers size={18} className='ml-2' />
                  <span>إدارة المخزون</span>
                </div>
                <span
                  className='text-xs px-2 py-1 rounded-full'
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {products.filter((p) => p.stock <= p.minStock).length}
                </span>
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
                  <span>إدارة الطلبات</span>
                </div>
                <span
                  className='text-xs px-2 py-1 rounded-full'
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("customers")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "customers"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <Users size={18} className='ml-2' />
                  <span>إدارة العملاء</span>
                </div>
                <span
                  className='text-xs px-2 py-1 rounded-full'
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {customers.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("reviews")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "reviews"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <MessageSquare size={18} className='ml-2' />
                  <span>إدارة التقييمات</span>
                </div>
                <span
                  className='text-xs px-2 py-1 rounded-full'
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {reviews.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("discounts")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "discounts"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <Tag size={18} className='ml-2' />
                  <span>الخصومات والأكواد</span>
                </div>
                <span
                  className='text-xs px-2 py-1 rounded-full'
                  style={{
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {discounts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("reports")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "reports"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <BarChart2 size={18} className='ml-2' />
                  <span>التقارير والإحصائيات</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("financial")}
                className={`w-full flex items-center justify-between py-2 px-3 rounded-lg mb-1 ${
                  activeTab === "financial"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className='flex items-center'>
                  <DollarSign size={18} className='ml-2' />
                  <span>الإدارة المالية</span>
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
                  <Settings size={18} className='ml-2' />
                  <span>الإعدادات المتقدمة</span>
                </div>
              </button>

              <div className='pt-4 mt-4 border-t border-gray-200'>
                <button
                  className='w-full flex items-center py-3 px-4 rounded-lg text-gray-500 hover:bg-red-50'
                  style={{ color: colors.danger }}
                >
                  <LogOut size={18} className='ml-2' />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </nav>
          </div>

          {/* بطاقة المساعدة */}
          <div className='bg-white rounded-xl shadow-sm p-6 ml-4 border border-gray-100'>
            <h3 className='font-bold mb-4 flex items-center text-[#1e293b]'>
              <HelpCircle
                size={18}
                className='ml-2'
                style={{ color: colors.primary }}
              />
              <span>المساعدة والدعم</span>
            </h3>
            <p className='text-sm mb-4' style={{ color: colors.gray }}>
              للحصول على المساعدة والدعم الفني يمكنك الاتصال بالرقم أدناه.
            </p>
            <div className='flex items-center'>
              <Mail size={16} className='ml-2' style={{ color: colors.gray }} />
              <span className='text-sm text-[#1e293b]'>
                barnamenvican@gmail.com
              </span>
            </div>
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
                    مدير النظام
                  </h3>
                  <p className='text-xs' style={{ color: colors.gray }}>
                    barnamenvican@gmail.com
                  </p>
                </div>
              </div>

              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className='w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                style={{ color: colors.dark }}
              >
                <option value='products'>إدارة المنتجات</option>
                <option value='inventory'>إدارة المخزون</option>
                <option value='orders'>إدارة الطلبات</option>
                <option value='customers'>إدارة العملاء</option>
                <option value='reviews'>إدارة التقييمات</option>
                <option value='discounts'>الخصومات والأكواد</option>
                <option value='reports'>التقارير والإحصائيات</option>
                <option value='financial'>الإدارة المالية</option>
                <option value='settings'>الإعدادات المتقدمة</option>
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

      {/* المودالات */}
      <ProductModal />
      <DiscountModal />
      <ProductDetailModal
        isOpen={isOrderDetailModalOpen}
        order={selectedProduct}
        onClose={closeDetailModal}
      />
    </div>
  );
};

export default AdminDashboard;
