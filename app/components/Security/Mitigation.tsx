// app/components/Mitigation.tsx
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MitigationProps {
  language: string;
}

const Mitigation: React.FC<MitigationProps> = ({ language }) => {
  const [showModal, setShowModal] = useState(false);
  const [showMitigationModal, setShowMitigationModal] = useState(false);
  const [mitigationData, setMitigationData] = useState({
    name: "",
    type: "PATCH",
    status: "PLANNED",
    effectiveness: "HIGH",
    implementationDate: "",
    responsible: "",
    notes: "",
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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMitigationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const mitigationActions = [
    {
      id: 1,
      name: getText(
        "Apache Server Patch",
        "پچ سرور آپاچی",
        "تصحيح خادم أباتشي"
      ),
      type: getText("Patch", "پچ", "تصحيح"),
      status: getText("Implemented", "پیاده‌سازی شده", "مطبّق"),
      effectiveness: getText("High", "بالا", "عالي"),
      date: "2023-05-10",
      responsible: getText(
        "IT Team",
        "تیم فناوری اطلاعات",
        "فريق تكنولوجيا المعلومات"
      ),
    },
    {
      id: 2,
      name: getText(
        "Firewall Rule Update",
        "به‌روزرسانی قوانین فایروال",
        "تحديث قواعد الجدار الناري"
      ),
      type: getText("Configuration", "پیکربندی", "تهيئة"),
      status: getText("In Progress", "در حال انجام", "قيد التنفيذ"),
      effectiveness: getText("Medium", "متوسط", "متوسط"),
      date: "2023-04-15",
      responsible: getText("Security Team", "تیم امنیت", "فريق الأمن"),
    },
    {
      id: 3,
      name: getText("Employee Training", "آموزش کارکنان", "تدريب الموظفين"),
      type: getText("Training", "آموزش", "تدريب"),
      status: getText("Planned", "برنامه‌ریزی شده", "مخطط"),
      effectiveness: getText("High", "بالا", "عالي"),
      date: "2023-06-01",
      responsible: getText(
        "HR Department",
        "دپارتمان منابع انسانی",
        "قسم الموارد البشرية"
      ),
    },
  ];

  const statusChartOptions: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Yekan Bakh",
    },
    labels: [
      getText("Implemented", "پیاده‌سازی شده", "مطبّق"),
      getText("In Progress", "در حال انجام", "قيد التنفيذ"),
      getText("Planned", "برنامه‌ریزی شده", "مخطط"),
    ],
    colors: ["#10B981", "#3B82F6", "#F59E0B"],
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

  const statusChartSeries = [12, 5, 3];

  const effectivenessChartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      fontFamily: "Yekan Bakh",
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
      categories: [
        getText("High", "بالا", "عالي"),
        getText("Medium", "متوسط", "متوسط"),
        getText("Low", "پایین", "منخفض"),
      ],
    },
    yaxis: {
      title: {
        text: getText("Count", "تعداد", "العدد"),
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#10B981", "#3B82F6", "#F59E0B"],
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

  const effectivenessChartSeries = [
    {
      name: getText("Actions", "اقدامات", "إجراءات"),
      data: [8, 7, 5],
    },
  ];

  const handleAddMitigation = () => {};
  const handleViewMitigation = (id: number) => {};
  const handleDeleteMitigation = (id: number) => {};
  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-800'>
          {getText(
            "Mitigation Actions",
            "اقدامات کاهش ریسک",
            "إجراءات التخفيف"
          )}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        >
          {getText("Add Mitigation", "افزودن اقدام", "إضافة تخفيف")}
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
                  d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z'
                  fill='currentColor'
                />
                <path
                  d='M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z'
                  fill='currentColor'
                />
                <path
                  d='M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z'
                  fill='currentColor'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText("Mitigation Status", "وضعیت اقدامات", "حالة التخفيف")}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={statusChartOptions}
              series={statusChartSeries}
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
                  d='M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z'
                  fill='currentColor'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText(
                "Effectiveness Distribution",
                "توزیع اثربخشی",
                "توزيع الفعالية"
              )}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={effectivenessChartOptions}
              series={effectivenessChartSeries}
              type='bar'
              height='100%'
            />
          </div>
        </div>
      </div>

      {/* Mitigation Actions Card */}
      <div className='mt-8 bg-white rounded-lg shadow overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <h3 className='text-lg font-semibold text-gray-800'>
            {getText(
              "Recent Mitigation Actions",
              "اقدامات اخیر کاهش ریسک",
              "إجراءات التخفيف الأخيرة"
            )}
          </h3>
          <button
            onClick={() => setShowMitigationModal(true)}
            className='text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-md flex items-center'
          >
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            {getText("New Action", "اقدام جدید", "إجراء جديد")}
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Action", "اقدام", "الإجراء")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Type", "نوع", "النوع")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Status", "وضعیت", "الحالة")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Effectiveness", "اثربخشی", "الفعالية")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Target Date", "تاریخ هدف", "التاريخ المستهدف")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Responsible", "مسئول", "المسؤول")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Actions", "عملیات", "إجراءات")}
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {mitigationActions.map((action) => (
                <tr key={action.id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-5'>
                      <div className='flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600'>
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
                            d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                          />
                        </svg>
                      </div>
                      <div className='ml-4'>
                        <div className='text-sm font-medium text-gray-900'>
                          {action.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          ID: MA-{action.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {getText(
                      action.type,
                      action.type === "Patch"
                        ? "پچ"
                        : action.type === "Configuration"
                        ? "پیکربندی"
                        : action.type === "Workaround"
                        ? "راهکار موقت"
                        : "سایر",
                      action.type === "Patch"
                        ? "تصحيح"
                        : action.type === "Configuration"
                        ? "تهيئة"
                        : action.type === "Workaround"
                        ? "حل مؤقت"
                        : "أخرى"
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  action.status ===
                  getText("Implemented", "پیاده‌سازی شده", "مطبّق")
                    ? "bg-green-100 text-green-800"
                    : action.status ===
                      getText("In Progress", "در حال انجام", "قيد التنفيذ")
                    ? "bg-blue-100 text-blue-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
                    >
                      {action.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center gap-3'>
                      <div className='w-16 bg-gray-200 rounded-full h-2.5 mr-2'>
                        <div
                          className={`h-2.5 rounded-full 
                      ${
                        action.effectiveness === getText("High", "بالا", "عالي")
                          ? "bg-green-600"
                          : action.effectiveness ===
                            getText("Medium", "متوسط", "متوسط")
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                          style={{
                            width: `${
                              action.effectiveness ===
                              getText("High", "بالا", "عالي")
                                ? "100%"
                                : action.effectiveness ===
                                  getText("Medium", "متوسط", "متوسط")
                                ? "65%"
                                : "30%"
                            }`,
                          }}
                        ></div>
                      </div>
                      <span className='text-xs text-gray-700'>
                        {action.effectiveness}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    <div>{action.date}</div>
                    <div className='text-xs text-gray-400'>
                      {getText("Due in 5 days", "۵ روز مانده", "متبقي 5 أيام")}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex items-center'>
                      <div className='ml-2 text-sm text-gray-700'>
                        {action.responsible}
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <div className='flex space-x-2 gap-3'>
                      <button
                        onClick={() => handleViewMitigation(action.id)}
                        className='text-blue-600 hover:text-blue-900 flex items-center'
                      >
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          />
                        </svg>
                        {getText("View", "مشاهده", "عرض")}
                      </button>
                      <button
                        onClick={() => handleDeleteMitigation(action.id)}
                        className='text-red-600 hover:text-red-900 flex items-center'
                      >
                        <svg
                          className='w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          />
                        </svg>
                        {getText("Delete", "حذف", "حذف")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200'>
          <div className='flex-1 flex justify-between sm:hidden'>
            <button className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
              {getText("Previous", "قبلی", "السابق")}
            </button>
            <button className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
              {getText("Next", "بعدی", "التالي")}
            </button>
          </div>
          <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-gray-700'>
                {getText("Showing", "نمایش", "عرض")}{" "}
                <span className='font-medium'>1</span>{" "}
                {getText("to", "تا", "إلى")}{" "}
                <span className='font-medium'>{mitigationActions.length}</span>{" "}
                {getText("of", "از", "من")}{" "}
                <span className='font-medium'>{mitigationActions.length}</span>{" "}
                {getText("results", "نتایج", "نتائج")}
              </p>
            </div>
            <div>
              <nav
                className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                aria-label='Pagination'
              >
                <button className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                  <span className='sr-only'>
                    {getText("Next", "بعدی", "التالي")}
                  </span>
                  <svg
                    className='h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
                <button
                  aria-current='page'
                  className='z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                >
                  1
                </button>
                <button className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'>
                  2
                </button>
                <button className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'>
                  3
                </button>
                <button className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                  <span className='sr-only'>
                    {getText("Previous", "قبلی", "السابق")}
                  </span>
                  <svg
                    className='h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mitigation Action Modal */}
      {showMitigationModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "New Mitigation Action",
                    "اقدام کاهش ریسک جدید",
                    "إجراء تخفيف جديد"
                  )}
                </h3>
                <button
                  onClick={() => setShowMitigationModal(false)}
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
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {getText("Action Name", "نام اقدام", "اسم الإجراء")}
                  </label>
                  <input
                    type='text'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "e.g. Patch Application",
                      "مثلا پچ برنامه",
                      "مثال: تصحيح التطبيق"
                    )}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {getText("Type", "نوع", "النوع")}
                  </label>
                  <select className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'>
                    <option value='Patch'>
                      {getText("Patch", "پچ", "تصحيح")}
                    </option>
                    <option value='Configuration'>
                      {getText("Configuration", "پیکربندی", "تهيئة")}
                    </option>
                    <option value='Workaround'>
                      {getText("Workaround", "راهکار موقت", "حل مؤقت")}
                    </option>
                    <option value='Other'>
                      {getText("Other", "سایر", "أخرى")}
                    </option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {getText("Status", "وضعیت", "الحالة")}
                  </label>
                  <select className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'>
                    <option value='Implemented'>
                      {getText("Implemented", "پیاده‌سازی شده", "مطبّق")}
                    </option>
                    <option value='In Progress'>
                      {getText("In Progress", "در حال انجام", "قيد التنفيذ")}
                    </option>
                    <option value='Pending'>
                      {getText("Pending", "در انتظار", "قيد الانتظار")}
                    </option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {getText("Effectiveness", "اثربخشی", "الفعالية")}
                  </label>
                  <select className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'>
                    <option value='High'>
                      {getText("High", "بالا", "عالي")}
                    </option>
                    <option value='Medium'>
                      {getText("Medium", "متوسط", "متوسط")}
                    </option>
                    <option value='Low'>{getText("Low", "کم", "منخفض")}</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {getText("Target Date", "تاریخ هدف", "التاريخ المستهدف")}
                  </label>
                  <input
                    type='date'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {getText("Responsible", "مسئول", "المسؤول")}
                  </label>
                  <input
                    type='text'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder={getText(
                      "Person or team",
                      "فرد یا تیم",
                      "فرد أو فريق"
                    )}
                  />
                </div>
              </div>

              <div className='mt-6 flex justify-end space-x-3'>
                <button
                  onClick={() => setShowMitigationModal(false)}
                  className='px-4 py-2 border border-gray-300 ml-3 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
                >
                  {getText("Cancel", "انصراف", "إلغاء")}
                </button>
                <button
                  onClick={handleAddMitigation}
                  className='px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700'
                >
                  {getText("Save Action", "ذخیره اقدام", "حفظ الإجراء")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Mitigation Action Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add Mitigation Action",
                    "افزودن اقدام کاهش ریسک",
                    "إضافة إجراء تخفيف"
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
                      {getText("Action Name", "نام اقدام", "اسم الإجراء")}
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={mitigationData.name}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. Patch Installation",
                        "مثلا نصب پچ",
                        "مثال: تثبيت التصحيح"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='type'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Action Type", "نوع اقدام", "نوع الإجراء")}
                    </label>
                    <select
                      id='type'
                      name='type'
                      value={mitigationData.type}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='PATCH'>
                        {getText("Patch", "پچ", "تصحيح")}
                      </option>
                      <option value='CONFIGURATION'>
                        {getText("Configuration", "پیکربندی", "تهيئة")}
                      </option>
                      <option value='TRAINING'>
                        {getText("Training", "آموزش", "تدريب")}
                      </option>
                      <option value='ACCESS_CONTROL'>
                        {getText(
                          "Access Control",
                          "کنترل دسترسی",
                          "التحكم في الوصول"
                        )}
                      </option>
                      <option value='OTHER'>
                        {getText("Other", "سایر", "أخرى")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='status'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Status", "وضعیت", "الحالة")}
                    </label>
                    <select
                      id='status'
                      name='status'
                      value={mitigationData.status}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='PLANNED'>
                        {getText("Planned", "برنامه‌ریزی شده", "مخطط")}
                      </option>
                      <option value='IN_PROGRESS'>
                        {getText("In Progress", "در حال انجام", "قيد التنفيذ")}
                      </option>
                      <option value='IMPLEMENTED'>
                        {getText("Implemented", "پیاده‌سازی شده", "مطبّق")}
                      </option>
                      <option value='REVIEW'>
                        {getText(
                          "Under Review",
                          "در حال بررسی",
                          "قيد المراجعة"
                        )}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='effectiveness'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Effectiveness", "اثربخشی", "الفعالية")}
                    </label>
                    <select
                      id='effectiveness'
                      name='effectiveness'
                      value={mitigationData.effectiveness}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
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
                      htmlFor='implementationDate'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Implementation Date",
                        "تاریخ پیاده‌سازی",
                        "تاريخ التطبيق"
                      )}
                    </label>
                    <input
                      type='date'
                      id='implementationDate'
                      name='implementationDate'
                      value={mitigationData.implementationDate}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='responsible'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Responsible", "مسئول", "المسؤول")}
                    </label>
                    <input
                      type='text'
                      id='responsible'
                      name='responsible'
                      value={mitigationData.responsible}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. IT Team",
                        "مثلا تیم فناوری اطلاعات",
                        "مثال: فريق تكنولوجيا المعلومات"
                      )}
                    />
                  </div>

                  <div className='md:col-span-2'>
                    <label
                      htmlFor='notes'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Notes", "یادداشت‌ها", "ملاحظات")}
                    </label>
                    <textarea
                      id='notes'
                      name='notes'
                      rows={3}
                      value={mitigationData.notes}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "Additional details...",
                        "جزئیات بیشتر...",
                        "تفاصيل إضافية..."
                      )}
                    />
                  </div>
                </div>

                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Save Action", "ذخیره اقدام", "حفظ الإجراء")}
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

export default Mitigation;
