// app/components/CVEScoring.tsx
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { BarChart, CheckSquare, AlertTriangle } from "react-feather";
// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CVEScoringProps {
  language: string;
}

const CVEScoring: React.FC<CVEScoringProps> = ({ language }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCVEModal, setShowCVEModal] = useState(false);
  const [cveData, setCveData] = useState({
    id: "",
    attackVector: "NETWORK",
    attackComplexity: "LOW",
    privilegesRequired: "NONE",
    userInteraction: "NONE",
    scope: "UNCHANGED",
    confidentiality: "HIGH",
    integrity: "HIGH",
    availability: "HIGH",
    impactScore: 2,
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

  const calculateBaseScore = () => {
    // Simplified CVSS v3 base score calculation
    const impact =
      1 -
      (1 -
        (cveData.confidentiality === "HIGH"
          ? 0.56
          : cveData.confidentiality === "LOW"
          ? 0.22
          : 0)) *
        (1 -
          (cveData.integrity === "HIGH"
            ? 0.56
            : cveData.integrity === "LOW"
            ? 0.22
            : 0)) *
        (1 -
          (cveData.availability === "HIGH"
            ? 0.56
            : cveData.availability === "LOW"
            ? 0.22
            : 0));

    const exploitability =
      8.22 *
      (cveData.attackVector === "NETWORK"
        ? 0.85
        : cveData.attackVector === "ADJACENT"
        ? 0.62
        : 0.55) *
      (cveData.attackComplexity === "LOW" ? 0.77 : 0.44) *
      (cveData.privilegesRequired === "NONE"
        ? 0.85
        : cveData.privilegesRequired === "LOW"
        ? 0.62
        : 0.27) *
      (cveData.userInteraction === "NONE" ? 0.85 : 0.62);

    let baseScore;
    if (impact <= 0) {
      baseScore = 0;
    } else {
      if (cveData.scope === "UNCHANGED") {
        baseScore = Math.min(
          10,
          Math.ceil((impact + exploitability) * 10) / 10
        );
      } else {
        baseScore =
          Math.min(10, Math.ceil(impact * 1.08 + exploitability) * 10) / 10;
      }
    }

    return baseScore.toFixed(1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCveData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCVE = () => {};
  const handleViewCVE = (type: string) => {};
  const handleEditCVE = (type: string) => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    // In a real app, you would save the data here
  };

  const baseScore = calculateBaseScore();
  const severity =
    parseFloat(baseScore) >= 9.0
      ? getText("Critical", "بحرانی", "حرج")
      : parseFloat(baseScore) >= 7.0
      ? getText("High", "بالا", "عالي")
      : parseFloat(baseScore) >= 4.0
      ? getText("Medium", "متوسط", "متوسط")
      : parseFloat(baseScore) > 0
      ? getText("Low", "پایین", "منخفض")
      : getText("None", "هیچ", "لا شيء");

  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      height: 350,
      fontFamily: "Yekan Bakh",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,

        hollow: {
          margin: 0,
          size: "70%",
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#333",
            fontSize: "13px",
            fontFamily: "Yekan Bakh",
          },
          value: {
            color: "#333",
            fontSize: "30px",
            show: true,
            fontFamily: "Yekan Bakh",
          },
        },
        track: {
          background: "#e0e0e0",
          strokeWidth: "97%",
          margin: 5,
        },
      },
    },
    fill: {
      type: "gradient",

      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [getText("CVSS Score", "امتیاز CVSS", "نتيجة CVSS")],
  };

  const chartSeries = [parseFloat(baseScore) * 10];

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-800'>
          {getText(
            "CVE V3 Scoring System",
            "سیستم امتیازدهی CVE V3",
            "نظام تقييم CVE V3"
          )}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        >
          {getText("Add New CVE", "افزودن CVE جدید", "إضافة CVE جديد")}
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 rounded-lg bg-blue-50'>
              <BarChart width='24' height='24' className='text-[#356fec]' />
            </div>
            <h3 className='text-lg font-semibold text-gray-700 '>
              {getText("Base Score", "امتیاز پایه", "النتيجة الأساسية")}
            </h3>
          </div>

          <div className='flex items-center justify-center'>
            <div className='w-48 h-48'>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type='radialBar'
                height={200}
              />
            </div>
          </div>
          <div className='text-center mt-2'>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
              ${
                parseFloat(baseScore) >= 9.0
                  ? "bg-red-100 text-red-800"
                  : parseFloat(baseScore) >= 7.0
                  ? "bg-orange-100 text-orange-800"
                  : parseFloat(baseScore) >= 4.0
                  ? "bg-yellow-100 text-yellow-800"
                  : parseFloat(baseScore) > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {severity}
            </span>
          </div>
        </div>

        {/* Metrics Card - Redesigned */}
        <div className='bg-gray-50 p-4 rounded-xl shadow-xs'>
          <div className='flex items-center gap-3 mb-5'>
            <div className='p-2.5 rounded-lg bg-blue-50/80 mr-2'>
              <CheckSquare width='22' height='22' className='text-blue-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-800'>
              {getText(
                "CVSS v3.1 Metrics",
                "معیارهای CVSS نسخه ۳.۱",
                "مقاييس CVSS الإصدار 3.1"
              )}
            </h3>
          </div>

          <div className='space-y-5'>
            {/* Attack Vector */}
            <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1.5'>
                  {getText("Attack Vector", "بردار حمله", "متجه الهجوم")}
                </label>
                <div
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    cveData.attackVector === "NETWORK"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : cveData.attackVector === "ADJACENT"
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-orange-100 text-orange-800 border border-orange-200"
                  }`}
                >
                  {cveData.attackVector === "NETWORK"
                    ? getText("Network", "شبکه", "شبكة")
                    : cveData.attackVector === "ADJACENT"
                    ? getText("Adjacent", "مجاور", "مجاور")
                    : getText("Local", "محلی", "محلي")}
                </div>
              </div>
              <span className='text-xs text-gray-400 flex items-center'>
                <svg
                  className='w-3.5 h-3.5 mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z'
                    clipRule='evenodd'
                  />
                </svg>
                CVSS:3.1
              </span>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {/* Attack Complexity */}
              <div className='bg-gray-50 p-3 rounded-lg'>
                <label className='block text-sm font-medium text-gray-600 mb-1.5'>
                  {getText("Attack Complexity", "پیچیدگی حمله", "تعقيد الهجوم")}
                </label>
                <div
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    cveData.attackComplexity === "LOW"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  }`}
                >
                  {cveData.attackComplexity === "LOW"
                    ? getText("Low", "پایین", "منخفض")
                    : getText("High", "بالا", "عالي")}
                </div>
              </div>

              {/* Privileges Required */}
              <div className='bg-gray-50 p-3 rounded-lg'>
                <label className='block text-sm font-medium text-gray-600 mb-1.5'>
                  {getText(
                    "Privileges Required",
                    "میزان دسترسی مورد نیاز",
                    "الصلاحيات المطلوبة"
                  )}
                </label>
                <div
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    cveData.privilegesRequired === "NONE"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : cveData.privilegesRequired === "LOW"
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {cveData.privilegesRequired === "NONE"
                    ? getText("None", "هیچ", "لا شيء")
                    : cveData.privilegesRequired === "LOW"
                    ? getText("Low", "پایین", "منخفض")
                    : getText("High", "بالا", "عالي")}
                </div>
              </div>
            </div>

            {/* Visual Score Indicator (New Addition) */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-600 mb-2'>
                {getText("Severity Score", "امتیاز شدت", "نتيجة الخطورة")}
              </label>
              <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500'
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, cveData.baseScore * 10)
                    )}%`,
                  }}
                ></div>
              </div>
              <div className='flex justify-between text-xs text-gray-500 mt-1'>
                <span>0.0</span>
                <span>5.0</span>
                <span>10.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Card - Redesigned */}
        <div className='bg-gray-50 p-4 rounded-xl shadow-xs space-y-11'>
          <div className='flex items-center gap-3 mb-5'>
            <div className='p-2.5 rounded-lg bg-red-50/80 mr-2'>
              <AlertTriangle width='22' height='22' className='text-red-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-800'>
              {getText("Impact", "تأثیر", "التأثير")}
            </h3>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5'>
            {/* Confidentiality */}
            <div className='bg-gray-50 p-3 rounded-lg text-center'>
              <div className='text-xs font-medium text-gray-500 mb-2'>
                {getText("Confidentiality", "محرمانگی", "السرية")}
              </div>
              <div
                className={`py-1.5 px-3 text-sm font-medium rounded-full inline-flex items-center ${
                  cveData.confidentiality === "HIGH"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : cveData.confidentiality === "LOW"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-green-100 text-green-800 border border-green-200"
                }`}
              >
                {cveData.confidentiality === "HIGH" ? (
                  <span className='w-2 h-2 bg-red-500 rounded-full ml-1.5'></span>
                ) : cveData.confidentiality === "LOW" ? (
                  <span className='w-2 h-2 bg-yellow-500 rounded-full ml-1.5'></span>
                ) : (
                  <span className='w-2 h-2 bg-green-500 rounded-full ml-1.5'></span>
                )}
                {cveData.confidentiality === "HIGH"
                  ? getText("High", "بالا", "عالي")
                  : cveData.confidentiality === "LOW"
                  ? getText("Low", "پایین", "منخفض")
                  : getText("None", "هیچ", "لا شيء")}
              </div>
            </div>

            {/* Integrity */}
            <div className='bg-gray-50 p-3 rounded-lg text-center'>
              <div className='text-xs font-medium text-gray-500 mb-2'>
                {getText("Integrity", "تمامیت", "التكامل")}
              </div>
              <div
                className={`py-1.5 px-3 text-sm font-medium rounded-full inline-flex items-center ${
                  cveData.integrity === "HIGH"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : cveData.integrity === "LOW"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-green-100 text-green-800 border border-green-200"
                }`}
              >
                {cveData.integrity === "HIGH" ? (
                  <span className='w-2 h-2 bg-red-500 rounded-full ml-1.5'></span>
                ) : cveData.integrity === "LOW" ? (
                  <span className='w-2 h-2 bg-yellow-500 rounded-full ml-1.5'></span>
                ) : (
                  <span className='w-2 h-2 bg-green-500 rounded-full ml-1.5'></span>
                )}
                {cveData.integrity === "HIGH"
                  ? getText("High", "بالا", "عالي")
                  : cveData.integrity === "LOW"
                  ? getText("Low", "پایین", "منخفض")
                  : getText("None", "هیچ", "لا شيء")}
              </div>
            </div>

            {/* Availability */}
            <div className='bg-gray-50 p-3 rounded-lg text-center'>
              <div className='text-xs font-medium text-gray-500 mb-2'>
                {getText("Availability", "در دسترس بودن", "التوافر")}
              </div>
              <div
                className={`py-1.5 px-3 text-sm font-medium rounded-full inline-flex items-center ${
                  cveData.availability === "HIGH"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : cveData.availability === "LOW"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-green-100 text-green-800 border border-green-200"
                }`}
              >
                {cveData.availability === "HIGH" ? (
                  <span className='w-2 h-2 bg-red-500 rounded-full ml-1.5'></span>
                ) : cveData.availability === "LOW" ? (
                  <span className='w-2 h-2 bg-yellow-500 rounded-full ml-1.5'></span>
                ) : (
                  <span className='w-2 h-2 bg-green-500 rounded-full ml-1.5'></span>
                )}
                {cveData.availability === "HIGH"
                  ? getText("High", "بالا", "عالي")
                  : cveData.availability === "LOW"
                  ? getText("Low", "پایین", "منخفض")
                  : getText("None", "هیچ", "لا شيء")}
              </div>
            </div>
          </div>

          {/* Impact Score */}
          <div className='pt-4 border-t border-gray-100'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-xs font-medium text-gray-500'>
                {getText(
                  "Overall Impact Score",
                  "امتیاز کلی تأثیر",
                  "النتيجة الإجمالية للتأثير"
                )}
              </span>
              <span className='text-sm font-medium text-gray-700'>
                {cveData.impactScore}/10
              </span>
            </div>
            <div className='relative pt-1'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-xs text-gray-500'>
                    {cveData.impactScore <= 3.9
                      ? getText("Low", "کم", "منخفض")
                      : cveData.impactScore <= 6.9
                      ? getText("Medium", "متوسط", "متوسط")
                      : getText("High", "زیاد", "عالي")}
                  </div>
                </div>
              </div>
              <div className='overflow-hidden h-2.5 mt-1 bg-gray-200 rounded-full'>
                <div
                  className={`h-full rounded-full ${
                    cveData.impactScore <= 3.9
                      ? "bg-green-500"
                      : cveData.impactScore <= 6.9
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${cveData.impactScore * 10}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent CVEs Table */}
      <div className='mt-8 bg-white rounded-lg shadow overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <h3 className='text-lg font-semibold text-gray-800'>
            {getText("Recent CVEs", "CVEهای اخیر", "CVE الأخيرة")}
          </h3>
          <button
            onClick={() => setShowCVEModal(true)}
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
            {getText("New CVE", "CVE جدید", "CVE جديد")}
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("CVE ID", "شناسه CVE", "معرف CVE")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Description", "توضیحات", "الوصف")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("CVSS Score", "امتیاز CVSS", "نتيجة CVSS")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Severity", "شدت", "الخطورة")}
                </th>
                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {getText("Published", "تاریخ انتشار", "تاريخ النشر")}
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
              {/* Row 1 */}
              <tr className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center gap-5'>
                    <div className='flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center text-red-600'>
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
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        />
                      </svg>
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        CVE-2023-1234
                      </div>
                      <div className='text-sm text-gray-500'>Web Server</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <div className='text-sm text-gray-900 max-w-xs truncate'>
                    {getText(
                      "Remote code execution vulnerability in web server",
                      "آسیب‌پذیری اجرای کد از راه دور در سرور وب",
                      "ثغرة تنفيذ التعليمات البرمجية عن بُعد في خادم الويب"
                    )}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900 font-medium'>9.8</div>
                  <div className='text-xs text-gray-500'>Critical</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 rounded-full bg-red-100 text-red-800'>
                    {getText("Critical", "بحرانی", "حرج")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <div>2023-05-15</div>
                  <div className='text-xs text-gray-400'>14:30</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 rounded-full bg-yellow-100 text-yellow-800'>
                    {getText("Unpatched", "رفع نشده", "غير مصحح")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex space-x-2 gap-3'>
                    <button
                      onClick={() => handleViewCVE("CVE-2023-1234")}
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
                      onClick={() => handleEditCVE("CVE-2023-1234")}
                      className='text-gray-600 hover:text-gray-900 flex items-center'
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
                          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        />
                      </svg>
                      {getText("Edit", "ویرایش", "تعديل")}
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center gap-5'>
                    <div className='flex-shrink-0 h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600'>
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
                          d='M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01'
                        />
                      </svg>
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        CVE-2023-5678
                      </div>
                      <div className='text-sm text-gray-500'>
                        Database Server
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <div className='text-sm text-gray-900 max-w-xs truncate'>
                    {getText(
                      "SQL injection vulnerability in database server",
                      "آسیب‌پذیری تزریق SQL در سرور دیتابیس",
                      "ثغرة حقن SQL في خادم قاعدة البيانات"
                    )}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900 font-medium'>8.8</div>
                  <div className='text-xs text-gray-500'>High</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 rounded-full bg-orange-100 text-orange-800'>
                    {getText("High", "بالا", "عالي")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <div>2023-04-22</div>
                  <div className='text-xs text-gray-400'>10:15</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 rounded-full bg-green-100 text-green-800'>
                    {getText("Patched", "رفع شده", "مصحح")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex space-x-2 gap-3'>
                    <button
                      onClick={() => handleViewCVE("CVE-2023-5678")}
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
                      onClick={() => handleEditCVE("CVE-2023-5678")}
                      className='text-gray-600 hover:text-gray-900 flex items-center'
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
                          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        />
                      </svg>
                      {getText("Edit", "ویرایش", "تعديل")}
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center gap-5'>
                    <div className='flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600'>
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
                          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                        />
                      </svg>
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        CVE-2023-9012
                      </div>
                      <div className='text-sm text-gray-500'>Email Server</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <div className='text-sm text-gray-900 max-w-xs truncate'>
                    {getText(
                      "Cross-site scripting vulnerability in email service",
                      "آسیب‌پذیری XSS در سرویس ایمیل",
                      "ثغرة البرمجة النصية عبر المواقع في خدمة البريد"
                    )}
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900 font-medium'>6.5</div>
                  <div className='text-xs text-gray-500'>Medium</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 rounded-full bg-yellow-100 text-yellow-800'>
                    {getText("Medium", "متوسط", "متوسط")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <div>2023-03-10</div>
                  <div className='text-xs text-gray-400'>09:45</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 rounded-full bg-blue-100 text-blue-800'>
                    {getText("In Progress", "در حال بررسی", "قيد المراجعة")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex space-x-2 gap-3'>
                    <button
                      onClick={() => handleViewCVE("CVE-2023-9012")}
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
                      onClick={() => handleEditCVE("CVE-2023-9012")}
                      className='text-gray-600 hover:text-gray-900 flex items-center'
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
                          d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                        />
                      </svg>
                      {getText("Edit", "ویرایش", "تعديل")}
                    </button>
                  </div>
                </td>
              </tr>
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
                <span className='font-medium'>3</span>{" "}
                {getText("of", "از", "من")}{" "}
                <span className='font-medium'>3</span>{" "}
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

      {/* CVE Modal (Add this to your component) */}
      {showCVEModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-2xl'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText("Add New CVE", "افزودن CVE جدید", "إضافة CVE جديد")}
                </h3>
                <button
                  onClick={() => setShowCVEModal(false)}
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

              {/* Add your CVE form here */}
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {getText("CVE ID", "شناسه CVE", "معرف CVE")}
                  </label>
                  <input
                    type='text'
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder='CVE-YYYY-NNNN'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    {getText("Description", "توضیحات", "الوصف")}
                  </label>
                  <textarea
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {getText("CVSS Score", "امتیاز CVSS", "نتيجة CVSS")}
                    </label>
                    <input
                      type='number'
                      step='0.1'
                      min='0'
                      max='10'
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      {getText("Severity", "شدت", "الخطورة")}
                    </label>
                    <select className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'>
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
                        {getText("Low", "کم", "منخفض")}
                      </option>
                    </select>
                  </div>
                </div>

                <div className='flex justify-end space-x-3 pt-4'>
                  <button
                    onClick={() => setShowCVEModal(false)}
                    className='px-4 py-2 border border-gray-300 rounded-md text-sm ml-3 font-medium text-gray-700 bg-white hover:bg-gray-50'
                  >
                    {getText("Cancel", "انصراف", "إلغاء")}
                  </button>
                  <button
                    onClick={handleAddCVE}
                    className='px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700'
                  >
                    {getText("Save", "ذخیره", "حفظ")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CVE Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText("Add New CVE", "افزودن CVE جدید", "إضافة CVE جديد")}
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
                      htmlFor='id'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("CVE ID", "شناسه CVE", "معرف CVE")}
                    </label>
                    <input
                      type='text'
                      id='id'
                      name='id'
                      value={cveData.id}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder='CVE-YYYY-NNNN'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='attackVector'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Attack Vector", "بردار حمله", "متجه الهجوم")}
                    </label>
                    <select
                      id='attackVector'
                      name='attackVector'
                      value={cveData.attackVector}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='NETWORK'>
                        {getText("Network", "شبکه", "شبكة")}
                      </option>
                      <option value='ADJACENT'>
                        {getText("Adjacent", "مجاور", "مجاور")}
                      </option>
                      <option value='LOCAL'>
                        {getText("Local", "محلی", "محلي")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='attackComplexity'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Attack Complexity",
                        "پیچیدگی حمله",
                        "تعقيد الهجوم"
                      )}
                    </label>
                    <select
                      id='attackComplexity'
                      name='attackComplexity'
                      value={cveData.attackComplexity}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='LOW'>
                        {getText("Low", "پایین", "منخفض")}
                      </option>
                      <option value='HIGH'>
                        {getText("High", "بالا", "عالي")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='privilegesRequired'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Privileges Required",
                        "میزان دسترسی مورد نیاز",
                        "الصلاحيات المطلوبة"
                      )}
                    </label>
                    <select
                      id='privilegesRequired'
                      name='privilegesRequired'
                      value={cveData.privilegesRequired}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='NONE'>
                        {getText("None", "هیچ", "لا شيء")}
                      </option>
                      <option value='LOW'>
                        {getText("Low", "پایین", "منخفض")}
                      </option>
                      <option value='HIGH'>
                        {getText("High", "بالا", "عالي")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='userInteraction'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "User Interaction",
                        "تعامل کاربر",
                        "تفاعل المستخدم"
                      )}
                    </label>
                    <select
                      id='userInteraction'
                      name='userInteraction'
                      value={cveData.userInteraction}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='NONE'>
                        {getText("None", "هیچ", "لا شيء")}
                      </option>
                      <option value='REQUIRED'>
                        {getText("Required", "مورد نیاز", "مطلوب")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='scope'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText("Scope", "حوزه", "النطاق")}
                    </label>
                    <select
                      id='scope'
                      name='scope'
                      value={cveData.scope}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='UNCHANGED'>
                        {getText("Unchanged", "بدون تغییر", "غير متغير")}
                      </option>
                      <option value='CHANGED'>
                        {getText("Changed", "تغییر کرده", "متغير")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='confidentiality'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Confidentiality Impact",
                        "تأثیر محرمانگی",
                        "تأثير السرية"
                      )}
                    </label>
                    <select
                      id='confidentiality'
                      name='confidentiality'
                      value={cveData.confidentiality}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='HIGH'>
                        {getText("High", "بالا", "عالي")}
                      </option>
                      <option value='LOW'>
                        {getText("Low", "پایین", "منخفض")}
                      </option>
                      <option value='NONE'>
                        {getText("None", "هیچ", "لا شيء")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='integrity'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Integrity Impact",
                        "تأثیر تمامیت",
                        "تأثير التكامل"
                      )}
                    </label>
                    <select
                      id='integrity'
                      name='integrity'
                      value={cveData.integrity}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='HIGH'>
                        {getText("High", "بالا", "عالي")}
                      </option>
                      <option value='LOW'>
                        {getText("Low", "پایین", "منخفض")}
                      </option>
                      <option value='NONE'>
                        {getText("None", "هیچ", "لا شيء")}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor='availability'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Availability Impact",
                        "تأثیر در دسترس بودن",
                        "تأثير التوافر"
                      )}
                    </label>
                    <select
                      id='availability'
                      name='availability'
                      value={cveData.availability}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    >
                      <option value='HIGH'>
                        {getText("High", "بالا", "عالي")}
                      </option>
                      <option value='LOW'>
                        {getText("Low", "پایین", "منخفض")}
                      </option>
                      <option value='NONE'>
                        {getText("None", "هیچ", "لا شيء")}
                      </option>
                    </select>
                  </div>
                </div>

                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                  >
                    {getText("Save CVE", "ذخیره CVE", "حفظ CVE")}
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

export default CVEScoring;
