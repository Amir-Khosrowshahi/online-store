// app/components/AssetList.tsx
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AssetListProps {
  language: string;
}

const AssetList: React.FC<AssetListProps> = ({ language }) => {
  const [showModal, setShowModal] = useState(false);
  const [assetData, setAssetData] = useState({
    name: "",
    type: "SERVER",
    ipAddress: "",
    operatingSystem: "",
    owner: "",
    criticality: "MEDIUM",
    lastScanned: "",
    vulnerabilities: 0,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAssetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const assets = [
    {
      id: 1,
      name: getText("Web Server", "سرور وب", "خادم الويب"),
      type: getText("Server", "سرور", "خادم"),
      ipAddress: "192.168.1.100",
      operatingSystem: "Ubuntu 20.04",
      owner: getText(
        "IT Department",
        "دپارتمان فناوری اطلاعات",
        "قسم تكنولوجيا المعلومات"
      ),
      criticality: getText("High", "بالا", "عالي"),
      lastScanned: "2023-05-15",
      vulnerabilities: 5,
    },
    {
      id: 2,
      name: getText("Database Server", "سرور دیتابیس", "خادم قاعدة البيانات"),
      type: getText("Server", "سرور", "خادم"),
      ipAddress: "192.168.1.101",
      operatingSystem: "Windows Server 2019",
      owner: getText(
        "IT Department",
        "دپارتمان فناوری اطلاعات",
        "قسم تكنولوجيا المعلومات"
      ),
      criticality: getText("Critical", "بحرانی", "حرج"),
      lastScanned: "2023-05-10",
      vulnerabilities: 12,
    },
    {
      id: 3,
      name: getText("Employee Laptop", "لپتاپ کارمند", "حاسوب الموظف"),
      type: getText("Workstation", "ایستگاه کاری", "محطة عمل"),
      ipAddress: "192.168.1.50",
      operatingSystem: "Windows 10",
      owner: getText(
        "HR Department",
        "دپارتمان منابع انسانی",
        "قسم الموارد البشرية"
      ),
      criticality: getText("Medium", "متوسط", "متوسط"),
      lastScanned: "2023-04-22",
      vulnerabilities: 3,
    },
  ];

  const assetTypeChartOptions: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Yekan Bakh",
    },
    labels: [
      getText("Servers", "سرورها", "الخوادم"),
      getText("Workstations", "ایستگاه‌های کاری", "محطات العمل"),
      getText("Network Devices", "دستگاه‌های شبکه", "أجهزة الشبكة"),
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
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const assetTypeChartSeries = [15, 42, 8, 5];

  const criticalityChartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      fontFamily: "Yekan Bakh",
    },

    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
            fontFamily: "Yekan Bakh",
          },
          value: {
            fontSize: "16px",
            fontFamily: "Yekan Bakh",
          },
          total: {
            show: true,
            fontFamily: "Yekan Bakh",
            label: getText("Total", "مجموع", "المجموع"),
            formatter: function () {
              return "70";
            },
          },
        },
      },
    },
    labels: [
      getText("Critical", "بحرانی", "حرج"),
      getText("High", "بالا", "عالي"),
      getText("Medium", "متوسط", "متوسط"),
      getText("Low", "پایین", "منخفض"),
    ],
    colors: ["#EF4444", "#F59E0B", "#3B82F6", "#10B981"],
  };

  const criticalityChartSeries = [12, 18, 25, 15];

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-800'>
          {getText("Asset List", "لیست دارایی‌ها", "قائمة الأصول")}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        >
          {getText("Add Asset", "افزودن دارایی", "إضافة أصل")}
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
                className='text-blue-600'
              >
                <path
                  d='M4 6H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M4 6L12 2L20 6'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M8 10V14'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 10V14'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 10V14'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText("Asset Types", "انواع دارایی‌ها", "أنواع الأصول")}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={assetTypeChartOptions}
              series={assetTypeChartSeries}
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
                  d='M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText(
                "Criticality Distribution",
                "توزیع اهمیت",
                "توزيع الأهمية"
              )}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={criticalityChartOptions}
              series={criticalityChartSeries}
              type='radialBar'
              height='100%'
            />
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className='mt-8'>
        <h3 className='text-lg font-semibold text-gray-700 mb-4'>
          {getText("All Assets", "تمامی دارایی‌ها", "جميع الأصول")}
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
                  {getText("IP Address", "آدرس IP", "عنوان IP")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("OS", "سیستم عامل", "نظام التشغيل")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Criticality", "اهمیت", "الأهمية")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Vulnerabilities", "آسیب‌پذیری‌ها", "الثغرات")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Actions", "عملیات", "إجراءات")}
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {asset.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {asset.type}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {asset.ipAddress}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {asset.operatingSystem}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5  rounded-full 
                      ${
                        asset.criticality ===
                        getText("Critical", "بحرانی", "حرج")
                          ? "bg-red-100 text-red-800"
                          : asset.criticality ===
                            getText("High", "بالا", "عالي")
                          ? "bg-orange-100 text-orange-800"
                          : asset.criticality ===
                            getText("Medium", "متوسط", "متوسط")
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {asset.criticality}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full 
                      ${
                        asset.vulnerabilities > 10
                          ? "bg-red-100 text-red-800"
                          : asset.vulnerabilities > 5
                          ? "bg-orange-100 text-orange-800"
                          : asset.vulnerabilities > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {asset.vulnerabilities}
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

      {/* Add Asset Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add New Asset",
                    "افزودن دارایی جدید",
                    "إضافة أصل جديد"
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
                      {getText("Asset Name", "نام دارایی", "اسم الأصل")}
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={assetData.name}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      {getText("Asset Type", "نوع دارایی", "نوع الأصل")}
                    </label>
                    <select
                      id='type'
                      name='type'
                      value={assetData.type}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='SERVER'>
                        {getText("Server", "سرور", "خادم")}
                      </option>
                      <option value='WORKSTATION'>
                        {getText("Workstation", "ایستگاه کاری", "محطة عمل")}
                      </option>
                      <option value='NETWORK_DEVICE'>
                        {getText("Network Device", "دستگاه شبکه", "جهاز شبكة")}
                      </option>
                      <option value='DATABASE'>
                        {getText("Database", "دیتابیس", "قاعدة بيانات")}
                      </option>
                      <option value='APPLICATION'>
                        {getText("Application", "اپلیکیشن", "تطبيق")}
                      </option>
                      <option value='OTHER'>
                        {getText("Other", "سایر", "أخرى")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='ipAddress'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("IP Address", "آدرس IP", "عنوان IP")}
                    </label>
                    <input
                      type='text'
                      id='ipAddress'
                      name='ipAddress'
                      value={assetData.ipAddress}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder='192.168.1.1'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='operatingSystem'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Operating System",
                        "سیستم عامل",
                        "نظام التشغيل"
                      )}
                    </label>
                    <input
                      type='text'
                      id='operatingSystem'
                      name='operatingSystem'
                      value={assetData.operatingSystem}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. Windows 10",
                        "مثلا ویندوز ۱۰",
                        "مثال: ويندوز 10"
                      )}
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
                      value={assetData.owner}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      value={assetData.criticality}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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

                  <div>
                    <label
                      htmlFor='lastScanned'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Last Scanned", "آخرین اسکن", "آخر مسح")}
                    </label>
                    <input
                      type='date'
                      id='lastScanned'
                      name='lastScanned'
                      value={assetData.lastScanned}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='vulnerabilities'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Vulnerabilities", "آسیب‌پذیری‌ها", "الثغرات")}
                    </label>
                    <input
                      type='number'
                      id='vulnerabilities'
                      name='vulnerabilities'
                      value={assetData.vulnerabilities}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      min='0'
                    />
                  </div>
                </div>

                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Save Asset", "ذخیره دارایی", "حفظ الأصل")}
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

export default AssetList;
