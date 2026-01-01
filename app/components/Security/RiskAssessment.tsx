// app/components/RiskAssessment.tsx
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface RiskAssessmentProps {
  language: string;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ language }) => {
  const [showModal, setShowModal] = useState(false);
  const [riskData, setRiskData] = useState({
    name: "",
    asset: "",
    threat: "",
    likelihood: "MEDIUM",
    impact: "MEDIUM",
    controls: "",
    status: "OPEN",
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

  const calculateRiskLevel = () => {
    const likelihoodScore =
      riskData.likelihood === "HIGH"
        ? 3
        : riskData.likelihood === "MEDIUM"
        ? 2
        : 1;

    const impactScore =
      riskData.impact === "HIGH" ? 3 : riskData.impact === "MEDIUM" ? 2 : 1;

    const riskScore = likelihoodScore * impactScore;

    return riskScore >= 7
      ? getText("High", "بالا", "عالي")
      : riskScore >= 4
      ? getText("Medium", "متوسط", "متوسط")
      : getText("Low", "پایین", "منخفض");
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setRiskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const risks = [
    {
      id: 1,
      name: getText("SQL Injection", "تزریق SQL", "حقن SQL"),
      asset: getText("Database Server", "سرور دیتابیس", "خادم قاعدة البيانات"),
      threat: getText("Data Breach", "نشت داده", "خرق البيانات"),
      likelihood: getText("Medium", "متوسط", "متوسط"),
      impact: getText("High", "بالا", "عالي"),
      level: getText("High", "بالا", "عالي"),
      status: getText("Open", "باز", "مفتوح"),
    },
    {
      id: 2,
      name: getText("Phishing Attack", "حملۀ فیشینگ", "هجوم التصيد"),
      asset: getText("Email Server", "سرور ایمیل", "خادم البريد"),
      threat: getText(
        "Credential Theft",
        "سرقت اعتبارنامه",
        "سرقة بيانات الاعتماد"
      ),
      likelihood: getText("High", "بالا", "عالي"),
      impact: getText("Medium", "متوسط", "متوسط"),
      level: getText("High", "بالا", "عالي"),
      status: getText("In Progress", "در حال انجام", "قيد التنفيذ"),
    },
    {
      id: 3,
      name: getText(
        "Weak Password Policy",
        "سیاست ضعیف رمز عبور",
        "سياسة كلمة مرور ضعيفة"
      ),
      asset: getText("User Accounts", "حساب‌های کاربری", "الحسابات المستخدم"),
      threat: getText(
        "Unauthorized Access",
        "دسترسی غیرمجاز",
        "وصول غير مصرح به"
      ),
      likelihood: getText("Medium", "متوسط", "متوسط"),
      impact: getText("Medium", "متوسط", "متوسط"),
      level: getText("Medium", "متوسط", "متوسط"),
      status: getText("Open", "باز", "مفتوح"),
    },
  ];

  const riskLevelChartOptions: ApexOptions = {
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
            label: getText("Total Risks", "مجموع ریسک‌ها", "إجمالي المخاطر"),
            formatter: function () {
              return "15";
            },
          },
        },
      },
    },
    labels: [
      getText("High", "بالا", "عالي"),
      getText("Medium", "متوسط", "متوسط"),
      getText("Low", "پایین", "منخفض"),
    ],
    colors: ["#EF4444", "#F59E0B", "#10B981"],
  };

  const riskLevelChartSeries = [7, 5, 3];

  const riskStatusChartOptions: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: "Yekan Bakh",
    },
    labels: [
      getText("Open", "باز", "مفتوح"),
      getText("In Progress", "در حال انجام", "قيد التنفيذ"),
      getText("Closed", "بسته", "مغلق"),
    ],
    colors: ["#3B82F6", "#F59E0B", "#10B981"],
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

  const riskStatusChartSeries = [8, 4, 3];

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-800'>
          {getText("Risk Assessment", "ارزیابی ریسک", "تقييم المخاطر")}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        >
          {getText("Add Risk", "افزودن ریسک", "إضافة مخاطر")}
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
                <rect
                  x='3'
                  y='3'
                  width='18'
                  height='18'
                  rx='2'
                  stroke='currentColor'
                  strokeWidth='2'
                />
                <rect x='6' y='6' width='4' height='4' fill='currentColor' />
                <rect
                  x='14'
                  y='6'
                  width='4'
                  height='4'
                  fill='currentColor'
                  opacity='0.7'
                />
                <rect
                  x='6'
                  y='14'
                  width='4'
                  height='4'
                  fill='currentColor'
                  opacity='0.4'
                />
                <rect
                  x='14'
                  y='14'
                  width='4'
                  height='4'
                  fill='currentColor'
                  opacity='0.2'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText(
                "Risk Level Distribution",
                "توزیع سطح ریسک",
                "توزيع مستوى المخاطر"
              )}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={riskLevelChartOptions}
              series={riskLevelChartSeries}
              type='radialBar'
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
                  d='M18 20V10'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <path
                  d='M12 20V4'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <path
                  d='M6 20V14'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <path
                  d='M21 4H3'
                  stroke='#9CA3AF'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <path
                  d='M21 20H3'
                  stroke='#9CA3AF'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText("Risk Status", "وضعیت ریسک", "حالة المخاطر")}
            </h3>
          </div>

          <div className='h-64'>
            <Chart
              options={riskStatusChartOptions}
              series={riskStatusChartSeries}
              type='pie'
              height='100%'
            />
          </div>
        </div>
      </div>

      {/* Risks Table */}
      <div className='mt-8'>
        <h3 className='text-lg font-semibold text-gray-700 mb-4'>
          {getText("All Risks", "تمامی ریسک‌ها", "جميع المخاطر")}
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Name", "نام", "الاسم")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Asset", "دارایی", "الأصل")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Threat", "تهدید", "التهديد")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Likelihood", "احتمال", "الاحتمال")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Impact", "تأثیر", "التأثير")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Level", "سطح", "المستوى")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Status", "وضعیت", "الحالة")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Actions", "عملیات", "إجراءات")}
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {risks.map((risk) => (
                <tr key={risk.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {risk.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {risk.asset}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {risk.threat}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full 
                      ${
                        risk.likelihood === getText("High", "بالا", "عالي")
                          ? "bg-red-100 text-red-800"
                          : risk.likelihood ===
                            getText("Medium", "متوسط", "متوسط")
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {risk.likelihood}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full 
                      ${
                        risk.impact === getText("High", "بالا", "عالي")
                          ? "bg-red-100 text-red-800"
                          : risk.impact === getText("Medium", "متوسط", "متوسط")
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {risk.impact}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full 
                      ${
                        risk.level === getText("High", "بالا", "عالي")
                          ? "bg-red-100 text-red-800"
                          : risk.level === getText("Medium", "متوسط", "متوسط")
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {risk.level}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 rounded-full 
                      ${
                        risk.status === getText("Open", "باز", "مفتوح")
                          ? "bg-blue-100 text-blue-800"
                          : risk.status ===
                            getText(
                              "In Progress",
                              "در حال انجام",
                              "قيد التنفيذ"
                            )
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {risk.status}
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

      {/* Add Risk Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add New Risk",
                    "افزودن ریسک جدید",
                    "إضافة مخاطر جديدة"
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
                      {getText("Risk Name", "نام ریسک", "اسم المخاطر")}
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={riskData.name}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. SQL Injection",
                        "مثلا تزریق SQL",
                        "مثال: حقن SQL"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='asset'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Affected Asset",
                        "دارایی متأثر",
                        "الأصل المتأثر"
                      )}
                    </label>
                    <input
                      type='text'
                      id='asset'
                      name='asset'
                      value={riskData.asset}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. Database Server",
                        "مثلا سرور دیتابیس",
                        "مثال: خادم قاعدة البيانات"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='threat'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Threat", "تهدید", "التهديد")}
                    </label>
                    <input
                      type='text'
                      id='threat'
                      name='threat'
                      value={riskData.threat}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. Data Breach",
                        "مثلا نشت داده",
                        "مثال: خرق البيانات"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='likelihood'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Likelihood", "احتمال", "الاحتمال")}
                    </label>
                    <select
                      id='likelihood'
                      name='likelihood'
                      value={riskData.likelihood}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='impact'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Impact", "تأثیر", "التأثير")}
                    </label>
                    <select
                      id='impact'
                      name='impact'
                      value={riskData.impact}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='status'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Status", "وضعیت", "الحالة")}
                    </label>
                    <select
                      id='status'
                      name='status'
                      value={riskData.status}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='OPEN'>
                        {getText("Open", "باز", "مفتوح")}
                      </option>
                      <option value='IN_PROGRESS'>
                        {getText("In Progress", "در حال انجام", "قيد التنفيذ")}
                      </option>
                      <option value='CLOSED'>
                        {getText("Closed", "بسته", "مغلق")}
                      </option>
                    </select>
                  </div>

                  <div className='md:col-span-2'>
                    <label
                      htmlFor='controls'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Existing Controls",
                        "کنترل‌های موجود",
                        "ضوابط موجودة"
                      )}
                    </label>
                    <textarea
                      id='controls'
                      name='controls'
                      rows={3}
                      value={riskData.controls}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "Describe existing controls...",
                        "کنترل‌های موجود را شرح دهید...",
                        "صف الضوابط الموجودة..."
                      )}
                    />
                  </div>
                </div>

                <div className='mb-4 p-4 bg-blue-50 rounded-md'>
                  <h4 className='text-sm font-medium text-blue-800 mb-2'>
                    {getText(
                      "Calculated Risk Level",
                      "سطح ریسک محاسبه شده",
                      "مستوى المخاطر المحسوب"
                    )}
                  </h4>
                  <div className='flex items-center'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium 
                      ${
                        calculateRiskLevel() === getText("High", "بالا", "عالي")
                          ? "bg-red-100 text-red-800"
                          : calculateRiskLevel() ===
                            getText("Medium", "متوسط", "متوسط")
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {calculateRiskLevel()}
                    </span>
                    <span className='ml-2 text-sm text-gray-600'>
                      ({getText("Likelihood", "احتمال", "الاحتمال")}:{" "}
                      {riskData.likelihood},{" "}
                      {getText("Impact", "تأثیر", "التأثير")}: {riskData.impact}
                      )
                    </span>
                  </div>
                </div>

                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Save Risk", "ذخیره ریسک", "حفظ المخاطر")}
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

export default RiskAssessment;
