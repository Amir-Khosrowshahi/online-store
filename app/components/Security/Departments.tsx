// app/components/Departments.tsx
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DepartmentsProps {
  language: string;
}
interface Department {
  id: number;
  name: string;
  head: string;
  employees: string;
  location: string;
  description?: string;
}

const Departments: React.FC<DepartmentsProps> = ({ language }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentData, setDepartmentData] = useState({
    name: "",
    head: "",
    employees: "",
    location: "",
    description: "",
  });

  const handleView = (dept: any) => {
    setSelectedDepartment(dept);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDepartmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const departments = [
    {
      id: 1,
      name: getText(
        "IT Department",
        "دپارتمان فناوری اطلاعات",
        "قسم تكنولوجيا المعلومات"
      ),
      head: getText("John Smith", "جان اسمیت", "جون سميث"),
      employees: "25",
      location: getText("Floor 3", "طبقه ۳", "الطابق الثالث"),
      description: getText(
        "Responsible for all technical infrastructure and systems",
        "مسئول تمام زیرساخت‌ها و سیستم‌های فنی",
        "مسؤولة عن جميع البنية التحتية والأنظمة التقنية"
      ),
    },
    {
      id: 2,
      name: getText("Finance", "مالی", "المالية"),
      head: getText("Sarah Johnson", "سارا جانسون", "سارة جونسون"),
      employees: "12",
      location: getText("Floor 2", "طبقه ۲", "الطابق الثاني"),
      description: getText(
        "Responsible for all technical infrastructure and systems",
        "مسئول تمام زیرساخت‌ها و سیستم‌های فنی",
        "مسؤولة عن جميع البنية التحتية والأنظمة التقنية"
      ),
    },
    {
      id: 3,
      name: getText("Human Resources", "منابع انسانی", "الموارد البشرية"),
      head: getText("Michael Brown", "مایکل براون", "مايكل براون"),
      employees: "8",
      location: getText("Floor 1", "طبقه ۱", "الطابق الأول"),
      description: getText(
        "Responsible for all technical infrastructure and systems",
        "مسئول تمام زیرساخت‌ها و سیستم‌های فنی",
        "مسؤولة عن جميع البنية التحتية والأنظمة التقنية"
      ),
    },
  ];

  const departmentSizeChartOptions: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Yekan Bakh",
    },
    labels: departments.map((dept) => dept.name),
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#6366F1", "#EC4899"],
    legend: {
      position: "bottom",
      fontFamily: "Yekan Bakh",
    },
    responsive: [
      {
        breakpoint: 480,

        options: {
          chart: {
            width: 200,
            fontFamily: "Yekan Bakh",
          },
          legend: {
            position: "bottom",
            fontFamily: "Yekan Bakh",
          },
        },
      },
    ],
  };

  const departmentSizeChartSeries = departments.map((dept) =>
    parseInt(dept.employees)
  );

  const departmentRiskChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: departments.map((dept) => dept.name),
    },
    yaxis: {
      title: {
        text: getText("Risk Level", "سطح ریسک", "مستوى المخاطر"),
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#3B82F6", "#10B981", "#F59E0B"],
    tooltip: {
      style: {
        fontFamily: "Yekan Bakh",
      },
      theme: "dark",
      y: {
        formatter: function (val) {
          return val.toString();
        },
      },
    },
  };

  const departmentRiskChartSeries = [
    {
      name: getText("Risk Level", "سطح ریسک", "مستوى المخاطر"),
      data: [7, 5, 3],
    },
  ];

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-800'>
          {getText(
            "Departments Management",
            "مدیریت دپارتمان‌ها",
            "إدارة الأقسام"
          )}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        >
          {getText("Add Department", "افزودن دپارتمان", "إضافة قسم")}
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 rounded-lg bg-blue-50'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='text-[#356fec]'
              >
                <path
                  d='M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText("Department Size", "اندازه دپارتمان‌ها", "حجم الأقسام")}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={departmentSizeChartOptions}
              series={departmentSizeChartSeries}
              type='donut'
              height='100%'
            />
          </div>
        </div>

        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 rounded-lg bg-blue-50'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='text-[#356fec]'
              >
                <path
                  d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 8V12'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 16H12.01'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3 12H5'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M19 12H21'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 3V5'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 19V21'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText(
                "Risk Level by Department",
                "سطح ریسک بر اساس دپارتمان",
                "مستوى المخاطر حسب القسم"
              )}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={departmentRiskChartOptions}
              series={departmentRiskChartSeries}
              type='bar'
              height='100%'
            />
          </div>
        </div>
      </div>

      {/* Departments Table */}
      <div className='mt-8'>
        <h3 className='text-lg font-semibold text-gray-700 mb-4'>
          {getText("All Departments", "تمامی دپارتمان‌ها", "جميع الأقسام")}
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Name", "نام", "الاسم")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Head", "رئیس", "رئيس")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Employees", "کارمندان", "الموظفين")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Location", "موقعیت", "الموقع")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Actions", "عملیات", "إجراءات")}
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {dept.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {dept.head}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {dept.employees}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {dept.location}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button
                      className='text-blue-600 hover:text-blue-900 ml-3'
                      onClick={() => handleView(dept)}
                    >
                      {getText("View", "مشاهده", "عرض")}
                    </button>
                    <button className='text-red-600 hover:text-red-900'>
                      {getText("Delete", "حذف", "حذف")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Department Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add New Department",
                    "افزودن دپارتمان جدید",
                    "إضافة قسم جديد"
                  )}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Department Name", "نام دپارتمان", "اسم القسم")}
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={departmentData.name}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. IT Department",
                        "مثلا دپارتمان فناوری اطلاعات",
                        "مثال: قسم تكنولوجيا المعلومات"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='head'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Department Head",
                        "رئیس دپارتمان",
                        "رئيس القسم"
                      )}
                    </label>
                    <input
                      type='text'
                      id='head'
                      name='head'
                      value={departmentData.head}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. John Smith",
                        "مثلا جان اسمیت",
                        "مثال: جون سميث"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='employees'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Number of Employees",
                        "تعداد کارمندان",
                        "عدد الموظفين"
                      )}
                    </label>
                    <input
                      type='text'
                      id='employees'
                      name='employees'
                      value={departmentData.employees}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder='e.g. 25'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='location'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Location", "موقعیت", "الموقع")}
                    </label>
                    <input
                      type='text'
                      id='location'
                      name='location'
                      value={departmentData.location}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. Floor 3",
                        "مثلا طبقه ۳",
                        "مثال: الطابق الثالث"
                      )}
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Description", "توضیحات", "الوصف")}
                    </label>
                    <textarea
                      id='description'
                      name='description'
                      rows={3}
                      value={departmentData.description}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "Department description...",
                        "توضیحات دپارتمان...",
                        "وصف القسم..."
                      )}
                    />
                  </div>
                </div>

                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Save Department", "ذخیره دپارتمان", "حفظ القسم")}
                  </button>
                  <button
                    type='button'
                    onClick={() => setShowModal(false)}
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Cancel", "انصراف", "إلغاء")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && selectedDepartment && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Department Details",
                    "جزئیات دپارتمان",
                    "تفاصيل القسم"
                  )}
                </h3>
                <button
                  onClick={closeModal}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h4 className='text-sm font-medium text-gray-500'>
                    {getText("Name", "نام", "الاسم")}
                  </h4>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedDepartment?.name}
                  </p>
                </div>

                <div>
                  <h4 className='text-sm font-medium text-gray-500'>
                    {getText("Head", "رئیس", "رئيس")}
                  </h4>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedDepartment.head}
                  </p>
                </div>

                <div>
                  <h4 className='text-sm font-medium text-gray-500'>
                    {getText("Employees", "کارمندان", "الموظفين")}
                  </h4>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedDepartment.employees}
                  </p>
                </div>

                <div>
                  <h4 className='text-sm font-medium text-gray-500'>
                    {getText("Location", "موقعیت", "الموقع")}
                  </h4>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedDepartment.location}
                  </p>
                </div>

                {/* بخش اضافی برای اطلاعات بیشتر */}
                <div className='md:col-span-2'>
                  <h4 className='text-sm font-medium text-gray-500'>
                    {getText("Description", "توضیحات", "الوصف")}
                  </h4>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedDepartment.description ||
                      getText(
                        "No description available",
                        "توضیحاتی موجود نیست",
                        "لا يوجد وصف متاح"
                      )}
                  </p>
                </div>
              </div>

              <div className='mt-6 pt-4 border-t border-gray-200 flex justify-end'>
                <button
                  onClick={closeModal}
                  className='px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200'
                >
                  {getText("Close", "بستن", "إغلاق")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
