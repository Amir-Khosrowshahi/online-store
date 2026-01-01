// app/components/Services.tsx
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ServicesProps {
  language: string;
}

const Services: React.FC<ServicesProps> = ({ language }) => {
  const [showModal, setShowModal] = useState(false);
  const [serviceData, setServiceData] = useState({
    name: "",
    type: "WEB",
    protocol: "HTTP",
    port: "",
    description: "",
    owner: "",
    criticality: "MEDIUM",
  });

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const services = [
    {
      id: 1,
      name: getText("Web Server", "سرور وب", "خادم الويب"),
      type: getText("Web", "وب", "ويب"),
      protocol: "HTTP/HTTPS",
      port: "80, 443",
      owner: getText(
        "IT Department",
        "دپارتمان فناوری اطلاعات",
        "قسم تكنولوجيا المعلومات"
      ),
      criticality: getText("High", "بالا", "عالي"),
    },
    {
      id: 2,
      name: getText("Database Service", "سرویس دیتابیس", "خدمة قاعدة البيانات"),
      type: getText("Database", "دیتابیس", "قاعدة بيانات"),
      protocol: "MySQL",
      port: "3306",
      owner: getText(
        "IT Department",
        "دپارتمان فناوری اطلاعات",
        "قسم تكنولوجيا المعلومات"
      ),
      criticality: getText("Critical", "بحرانی", "حرج"),
    },
    {
      id: 3,
      name: getText("Email Service", "سرویس ایمیل", "خدمة البريد"),
      type: getText("Email", "ایمیل", "بريد إلكتروني"),
      protocol: "SMTP/IMAP",
      port: "25, 143",
      owner: getText(
        "IT Department",
        "دپارتمان فناوری اطلاعات",
        "قسم تكنولوجيا المعلومات"
      ),
      criticality: getText("Medium", "متوسط", "متوسط"),
    },
  ];

  const serviceTypeChartOptions: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Yekan Bakh",
    },
    labels: [
      getText("Web", "وب", "ويب"),
      getText("Database", "دیتابیس", "قاعدة بيانات"),
      getText("Email", "ایمیل", "بريد إلكتروني"),
      getText("Other", "سایر", "أخرى"),
    ],
    colors: ["#3B82F6", "#10B981", "#F59E0B", "#6366F1"],
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

  const serviceTypeChartSeries = [12, 5, 3, 2];

  const protocolChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Yekan Bakh",
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      foreColor: "#111111",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["HTTP", "HTTPS", "MySQL", "SMTP", "IMAP", "SSH", "FTP"],
    },
    colors: ["#3B82F6"],
    tooltip: {
      style: {
        fontFamily: "Yekan Bakh",
      },
      theme: "dark",
    },
  };

  const protocolChartSeries = [
    {
      name: getText("Services", "سرویس‌ها", "الخدمات"),
      data: [15, 12, 8, 6, 5, 4, 3],
    },
  ];

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-800'>
          {getText("Services Management", "مدیریت سرویس‌ها", "إدارة الخدمات")}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        >
          {getText("Add Service", "افزودن سرویس", "إضافة خدمة")}
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
                  d='M18 10H16.74C16.3659 8.551 15.2143 7.36387 13.7117 6.86061C12.2091 6.35735 10.5696 6.60196 9.3 7.5C7.4085 8.7895 7.03 11.3895 8.48 13.09C6.6175 13.4385 5.3 15.0265 5.3 16.9C5.3 19.1865 7.2135 21 9.5 21H18C20.2091 21 22 19.2091 22 17C22 14.7909 20.2091 13 18 13V10Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M8 17H5.5C4.11929 17 3 15.8807 3 14.5C3 13.1193 4.11929 12 5.5 12H6.5'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText("Service Types", "انواع سرویس‌ها", "أنواع الخدمات")}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={serviceTypeChartOptions}
              series={serviceTypeChartSeries}
              type='pie'
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
                  d='M5 12H19'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 5V19'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3 3L6 6'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M18 18L21 21'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M3 21L6 18'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M18 6L21 3'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <circle
                  cx='12'
                  cy='12'
                  r='3'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText(
                "Protocol Distribution",
                "توزیع پروتکل‌ها",
                "توزيع البروتوكولات"
              )}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={protocolChartOptions}
              series={protocolChartSeries}
              type='bar'
              height='100%'
            />
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className='mt-8'>
        <h3 className='text-lg font-semibold text-gray-700 mb-4'>
          {getText("All Services", "تمامی سرویس‌ها", "جميع الخدمات")}
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Name", "نام", "الاسم")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Type", "نوع", "النوع")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Protocol", "پروتکل", "البروتوكول")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Port", "پورت", "المنفذ")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Criticality", "اهمیت", "الأهمية")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Actions", "عملیات", "إجراءات")}
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {services.map((service) => (
                <tr key={service.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {service.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {service.type}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {service.protocol}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {service.port}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full 
                      ${
                        service.criticality ===
                        getText("Critical", "بحرانی", "حرج")
                          ? "bg-red-100 text-red-800"
                          : service.criticality ===
                            getText("High", "بالا", "عالي")
                          ? "bg-orange-100 text-orange-800"
                          : service.criticality ===
                            getText("Medium", "متوسط", "متوسط")
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {service.criticality}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button className='text-blue-600 hover:text-blue-900 ml-3'>
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

      {/* Add Service Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add New Service",
                    "افزودن سرویس جدید",
                    "إضافة خدمة جديدة"
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
                      {getText("Service Name", "نام سرویس", "اسم الخدمة")}
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={serviceData.name}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. Web Server",
                        "مثلا سرور وب",
                        "مثال: خادم الويب"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='type'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Service Type", "نوع سرویس", "نوع الخدمة")}
                    </label>
                    <select
                      id='type'
                      name='type'
                      value={serviceData.type}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='WEB'>{getText("Web", "وب", "ويب")}</option>
                      <option value='DATABASE'>
                        {getText("Database", "دیتابیس", "قاعدة بيانات")}
                      </option>
                      <option value='EMAIL'>
                        {getText("Email", "ایمیل", "بريد إلكتروني")}
                      </option>
                      <option value='API'>
                        {getText("API", "API", "واجهة برمجة التطبيقات")}
                      </option>
                      <option value='OTHER'>
                        {getText("Other", "سایر", "أخرى")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='protocol'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Protocol", "پروتکل", "البروتوكول")}
                    </label>
                    <select
                      id='protocol'
                      name='protocol'
                      value={serviceData.protocol}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='HTTP'>HTTP</option>
                      <option value='HTTPS'>HTTPS</option>
                      <option value='FTP'>FTP</option>
                      <option value='SSH'>SSH</option>
                      <option value='SMTP'>SMTP</option>
                      <option value='IMAP'>IMAP</option>
                      <option value='MYSQL'>MySQL</option>
                      <option value='OTHER'>
                        {getText("Other", "سایر", "أخرى")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='port'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Port", "پورت", "المنفذ")}
                    </label>
                    <input
                      type='text'
                      id='port'
                      name='port'
                      value={serviceData.port}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder='e.g. 80, 443'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='owner'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Owner", "مالک", "المالك")}
                    </label>
                    <input
                      type='text'
                      id='owner'
                      name='owner'
                      value={serviceData.owner}
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
                      htmlFor='criticality'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Criticality", "اهمیت", "الأهمية")}
                    </label>
                    <select
                      id='criticality'
                      name='criticality'
                      value={serviceData.criticality}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='CRITICAL'>
                        {getText("Critical", "بحرانی", "حرج")}
                      </option>
                      <option value='HIGH'>
                        {getText("High", "بالا", "عالي")}
                      </option>
                      <option value='MEDIUM'>
                        {getText("Medium", "متوسط", "متوسط")}
                      </option>
                      <option value='LOW'>
                        {getText("Low", "پایین", "منخفض")}
                      </option>
                    </select>
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
                      value={serviceData.description}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "Service description...",
                        "توضیحات سرویس...",
                        "وصف الخدمة..."
                      )}
                    />
                  </div>
                </div>

                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Save Service", "ذخیره سرویس", "حفظ الخدمة")}
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
    </div>
  );
};

export default Services;
