import React from "react";
import dynamic from "next/dynamic";
import { Users, BarChart2, PieChart } from "react-feather";

// تعريف أنواع TypeScript
type Product = {
  id: number;
  name: string;
  sales: number;
  price: number;
  // خصائص المنتج الأخرى
};

type Customer = {
  id: number;
  name: string;
  registerDate: string;
  // خصائص العميل الأخرى
};

type ColorPalette = {
  primary: string;
  secondary: string;
  dark: string;
  light: string;
  gray: string; // إضافة هذا السطر
  success?: string;
  danger?: string;
  warning?: string;
};

// Dynamic import لـ ApexCharts
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ReportsProps {
  colors: ColorPalette;
  products: Product[];
  customers: Customer[];
  orders?: any[]; // يمكنك تعريف نوع الطلبات أيضًا إذا لزم الأمر
}

const Reports: React.FC<ReportsProps> = ({ colors, products, customers }) => {
  // إعدادات مخطط المبيعات الأسبوعي
  const salesChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Yekan Bakh",
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    colors: [colors.primary],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      },
    },
    xaxis: {
      categories: [
        "السبت",
        "الأحد",
        "الإثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
      ],
      labels: {
        style: {
          colors: colors.dark,
          fontFamily: "Yekan Bakh",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: colors.dark,
          fontFamily: "Yekan Bakh",
        },
        formatter: (value) => `${value}M`,
      },
    },
    tooltip: {
      y: { formatter: (val) => `${val} مليون تومان` },
    },
    grid: {
      borderColor: colors.gray,
      strokeDashArray: 4,
    },
  };

  const salesChartSeries = [
    {
      name: "المبيعات",
      data: [12, 18, 14, 21, 24, 19, 15],
    },
  ];

  // إعدادات مخطط المنتجات الأكثر مبيعاً
  const topProductsChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      height: 350,
    },
    colors: [colors.primary, colors.secondary, "#F59E0B", "#10B981", "#EF4444"],
    labels: products
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5)
      .map((p) => p.name.substring(0, 15) + (p.name.length > 15 ? "..." : "")),
    legend: {
      position: "right",
      labels: {
        colors: colors.dark,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "إجمالي المبيعات",
              color: colors.dark,
              formatter: () =>
                products.reduce((sum, p) => sum + p.sales, 0).toString(),
            },
          },
        },
      },
    },
  };

  const topProductsChartSeries = products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)
    .map((p) => p.sales);

  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <h2 className='text-xl font-bold mb-6' style={{ color: colors.dark }}>
        التقارير والإحصائيات
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        {/* مخطط المبيعات الأسبوعي */}
        <div className='bg-gray-50 rounded-lg p-6'>
          <h3 className='font-bold mb-4 flex items-center text-[#1e293b]'>
            <BarChart2
              size={18}
              className='ml-2 '
              style={{ color: colors.primary }}
            />
            <span>إحصائيات المبيعات</span>
          </h3>
          <div className='flex justify-between items-center mb-4'>
            <div>
              <p className='text-sm text-gray-500'>مبيعات اليوم</p>
              <p className='font-bold' style={{ color: colors.dark }}>
                12,450,000 تومان
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>عدد الطلبات</p>
              <p className='font-bold' style={{ color: colors.dark }}>
                8 طلبات
              </p>
            </div>
          </div>
          <div className='h-64'>
            <ApexChart
              options={salesChartOptions}
              series={salesChartSeries}
              type='area'
              height='100%'
            />
          </div>
        </div>

        {/* مخطط المنتجات الأكثر مبيعاً */}
        <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-200'>
          <h3 className='font-bold mb-4 flex items-center text-gray-800'>
            <PieChart size={20} className='ml-2 text-blue-600' />
            <span className='text-lg'>المنتجات الأكثر مبيعاً</span>
          </h3>
          <div className='h-[300px]'>
            <ApexChart
              options={{
                chart: {
                  type: "donut",
                  fontFamily: "Vazir, sans-serif",
                },
                colors: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
                labels: products
                  .sort((a, b) => b.sales - a.sales)
                  .slice(0, 5)
                  .map((p) =>
                    p.name.length > 150
                      ? p.name.substring(0, 15) + "..."
                      : p.name
                  ),
                legend: {
                  position: "right",
                  horizontalAlign: "center",
                  fontSize: "13px",

                  itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                plotOptions: {
                  pie: {
                    donut: {
                      size: "70%",
                      labels: {
                        show: true,

                        name: {
                          fontSize: "14px",
                        },
                        value: {
                          fontSize: "16px",
                          fontWeight: "bold",

                          formatter: (val) => `${val} مبيعات`,
                        },
                        total: {
                          show: true,
                          label: "إجمالي المبيعات",
                          color: "#4b5563",
                          formatter: () =>
                            products
                              .slice(0, 5)
                              .reduce((sum, p) => sum + p.sales, 0)
                              .toString(),
                        },
                      },
                    },
                  },
                },
                responsive: [
                  {
                    breakpoint: 768,
                    options: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  },
                ],
              }}
              series={products
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 5)
                .map((p) => p.sales)}
              type='donut'
              height='100%'
            />
          </div>
        </div>
      </div>

      {/* إحصائيات المستخدمين */}
      <div className='bg-gray-50 rounded-lg p-6'>
        <h3 className='font-bold mb-4 flex items-center text-[#1e293b]'>
          <Users size={18} className='ml-2' style={{ color: colors.primary }} />
          <span>إحصائيات المستخدمين</span>
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-white rounded-lg p-4 border border-gray-200'>
            <p className='text-sm text-gray-500'>المستخدمون الجدد اليوم</p>
            <p className='font-bold text-lg' style={{ color: colors.dark }}>
              {
                customers.filter(
                  (c) =>
                    c.registerDate === new Date().toLocaleDateString("ar-IR")
                ).length
              }{" "}
              مستخدم
            </p>
          </div>
          <div className='bg-white rounded-lg p-4 border border-gray-200'>
            <p className='text-sm text-gray-500'>إجمالي المستخدمين</p>
            <p className='font-bold text-lg' style={{ color: colors.dark }}>
              {customers.length} مستخدم
            </p>
          </div>
          <div className='bg-white rounded-lg p-4 border border-gray-200'>
            <p className='text-sm text-gray-500'>نسبة التحويل</p>
            <p className='font-bold text-lg' style={{ color: colors.dark }}>
              {customers.length > 0
                ? ((8 / customers.length) * 100).toFixed(1)
                : 0}
              %
            </p>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .apexcharts-tooltip-active {
          color: black !important;
        }
        .apexcharts-tooltip {
        }
      `}</style>
    </div>
  );
};

export default Reports;