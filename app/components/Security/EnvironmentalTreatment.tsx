// app/components/EnvironmentalTreatment.tsx
import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface EnvironmentalTreatmentProps {
  language: string;
}

const EnvironmentalTreatment: React.FC<EnvironmentalTreatmentProps> = ({
  language,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [envData, setEnvData] = useState({
    name: "",
    confidentialityRequirement: "MEDIUM",
    integrityRequirement: "MEDIUM",
    availabilityRequirement: "MEDIUM",
    modifiedAttackVector: "NETWORK",
    modifiedAttackComplexity: "LOW",
    modifiedPrivilegesRequired: "NONE",
    modifiedUserInteraction: "NONE",
    modifiedScope: "UNCHANGED",
    modifiedConfidentiality: "HIGH",
    modifiedIntegrity: "HIGH",
    modifiedAvailability: "HIGH",
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

  const calculateEnvironmentalScore = () => {
    // Simplified environmental score calculation
    const baseImpact =
      1 -
      (1 -
        (envData.modifiedConfidentiality === "HIGH"
          ? 0.56
          : envData.modifiedConfidentiality === "LOW"
          ? 0.22
          : 0)) *
        (1 -
          (envData.modifiedIntegrity === "HIGH"
            ? 0.56
            : envData.modifiedIntegrity === "LOW"
            ? 0.22
            : 0)) *
        (1 -
          (envData.modifiedAvailability === "HIGH"
            ? 0.56
            : envData.modifiedAvailability === "LOW"
            ? 0.22
            : 0));

    const exploitability =
      8.22 *
      (envData.modifiedAttackVector === "NETWORK"
        ? 0.85
        : envData.modifiedAttackVector === "ADJACENT"
        ? 0.62
        : 0.55) *
      (envData.modifiedAttackComplexity === "LOW" ? 0.77 : 0.44) *
      (envData.modifiedPrivilegesRequired === "NONE"
        ? 0.85
        : envData.modifiedPrivilegesRequired === "LOW"
        ? 0.62
        : 0.27) *
      (envData.modifiedUserInteraction === "NONE" ? 0.85 : 0.62);

    const confidentialityRequirement =
      envData.confidentialityRequirement === "HIGH"
        ? 1.5
        : envData.confidentialityRequirement === "LOW"
        ? 0.5
        : 1.0;
    const integrityRequirement =
      envData.integrityRequirement === "HIGH"
        ? 1.5
        : envData.integrityRequirement === "LOW"
        ? 0.5
        : 1.0;
    const availabilityRequirement =
      envData.availabilityRequirement === "HIGH"
        ? 1.5
        : envData.availabilityRequirement === "LOW"
        ? 0.5
        : 1.0;

    const modifiedImpact = Math.min(
      0.915,
      baseImpact *
        confidentialityRequirement *
        integrityRequirement *
        availabilityRequirement
    );

    let environmentalScore;
    if (modifiedImpact <= 0) {
      environmentalScore = 0;
    } else {
      if (envData.modifiedScope === "UNCHANGED") {
        environmentalScore = Math.min(
          10,
          Math.ceil((modifiedImpact + exploitability) * 10) / 10
        );
      } else {
        environmentalScore =
          Math.min(10, Math.ceil(modifiedImpact * 1.08 + exploitability) * 10) /
          10;
      }
    }

    return environmentalScore.toFixed(1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEnvData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
  };

  const environmentalScore = calculateEnvironmentalScore();
  const severity =
    parseFloat(environmentalScore) >= 9.0
      ? getText("Critical", "بحرانی", "حرج")
      : parseFloat(environmentalScore) >= 7.0
      ? getText("High", "بالا", "عالي")
      : parseFloat(environmentalScore) >= 4.0
      ? getText("Medium", "متوسط", "متوسط")
      : parseFloat(environmentalScore) > 0
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
    labels: [getText("Environmental Score", "امتیاز محیطی", "نتيجة بيئية")],
  };

  const chartSeries = [parseFloat(environmentalScore) * 10];

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-bold text-gray-800'>
          {getText(
            "Environmental Treatment",
            "تحلیل محیطی",
            "المعالجة البيئية"
          )}
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
        >
          {getText("Add Environmental", "افزودن محیطی", "إضافة بيئي")}
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <div className='bg-gray-50 p-4 rounded-xl transition-shadow duration-300'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 rounded-lg bg-blue-50'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 text-blue-600'
              >
                <path
                  d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M18 12C18 11.2044 17.6839 10.4413 17.1213 9.87868C16.5587 9.31607 15.7956 9 15 9'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-800'>
              {getText(
                "Environmental Score",
                "امتیاز محیطی",
                "النتيجة البيئية"
              )}
            </h3>
          </div>

          <div className='flex flex-col items-center'>
            {/* Circular Progress with Score */}
            <div className='relative w-48 h-48 mb-4'>
              <svg className='w-full h-full' viewBox='0 0 100 100'>
                {/* Background track */}
                <circle
                  cx='50'
                  cy='50'
                  r='45'
                  fill='none'
                  stroke='#E5E7EB'
                  strokeWidth='8'
                />
                {/* Progress indicator */}
                <circle
                  cx='50'
                  cy='50'
                  r='45'
                  fill='none'
                  stroke={
                    parseFloat(environmentalScore) >= 9.0
                      ? "#EF4444"
                      : parseFloat(environmentalScore) >= 7.0
                      ? "#F97316"
                      : parseFloat(environmentalScore) >= 4.0
                      ? "#F59E0B"
                      : parseFloat(environmentalScore) > 0
                      ? "#10B981"
                      : "#9CA3AF"
                  }
                  strokeWidth='8'
                  strokeLinecap='round'
                  strokeDasharray={`${
                    (parseFloat(environmentalScore) / 10) * 282.6
                  }, 282.6`}
                  transform='rotate(-90 50 50)'
                />
              </svg>

              {/* Score display */}
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-4xl font-bold text-gray-800'>
                  {environmentalScore}
                </span>
                <span
                  className={`text-sm font-medium mt-1 ${
                    parseFloat(environmentalScore) >= 9.0
                      ? "text-red-600"
                      : parseFloat(environmentalScore) >= 7.0
                      ? "text-orange-600"
                      : parseFloat(environmentalScore) >= 4.0
                      ? "text-yellow-600"
                      : parseFloat(environmentalScore) > 0
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {severity}
                </span>
              </div>
            </div>

            {/* Risk scale indicator */}
            <div className='w-full max-w-xs'>
              <div className='flex justify-between text-xs text-gray-500 mb-1'>
                <span>10</span>
                <span>5</span>
                <span>0</span>
              </div>
              <div className='h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full'></div>
              <div className='flex justify-between mt-2'>
                <span className='text-xs text-red-800'>
                  {getText("Critical", "بحرانی", "حرج")}
                </span>
                <span className='text-xs text-red-600'>
                  {getText("High", "بالا", "عالي")}
                </span>

                <span className='text-xs text-yellow-600'>
                  {getText("Medium", "متوسط", "متوسط")}
                </span>

                <span className='text-xs text-green-600'>
                  {getText("Low", "کم", "منخفض")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Requirements Card - Enhanced */}
        <div className='bg-white p-4 rounded-xl transition-shadow duration-300'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 rounded-lg bg-indigo-50'>
              <svg
                className='w-6 h-6 text-[#356fec]'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-800'>
              {getText(
                "Security Requirements",
                "نیازمندی‌های امنیتی",
                "متطلبات الأمن"
              )}
            </h3>
          </div>

          <div className='space-y-4'>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <label className='block text-sm font-medium text-gray-600 mb-2'>
                {getText("Confidentiality", "محرمانگی", "السرية")}
              </label>
              <div
                className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${
                  envData.confidentialityRequirement === "HIGH"
                    ? "bg-red-100 text-red-800"
                    : envData.confidentialityRequirement === "LOW"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {envData.confidentialityRequirement === "HIGH" ? (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : envData.confidentialityRequirement === "LOW" ? (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                {envData.confidentialityRequirement === "HIGH"
                  ? getText("High", "بالا", "عالي")
                  : envData.confidentialityRequirement === "LOW"
                  ? getText("Low", "پایین", "منخفض")
                  : getText("Medium", "متوسط", "متوسط")}
              </div>
            </div>

            <div className='bg-gray-50 p-3 rounded-lg'>
              <label className='block text-sm font-medium text-gray-600 mb-2'>
                {getText("Integrity", "تمامیت", "التكامل")}
              </label>
              <div
                className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${
                  envData.integrityRequirement === "HIGH"
                    ? "bg-red-100 text-red-800"
                    : envData.integrityRequirement === "LOW"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {envData.integrityRequirement === "HIGH" ? (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : envData.integrityRequirement === "LOW" ? (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                {envData.integrityRequirement === "HIGH"
                  ? getText("High", "بالا", "عالي")
                  : envData.integrityRequirement === "LOW"
                  ? getText("Low", "پایین", "منخفض")
                  : getText("Medium", "متوسط", "متوسط")}
              </div>
            </div>

            <div className='bg-gray-50 p-3 rounded-lg'>
              <label className='block text-sm font-medium text-gray-600 mb-2'>
                {getText("Availability", "در دسترس بودن", "التوافر")}
              </label>
              <div
                className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${
                  envData.availabilityRequirement === "HIGH"
                    ? "bg-red-100 text-red-800"
                    : envData.availabilityRequirement === "LOW"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {envData.availabilityRequirement === "HIGH" ? (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : envData.availabilityRequirement === "LOW" ? (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-4 h-4 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
                {envData.availabilityRequirement === "HIGH"
                  ? getText("High", "بالا", "عالي")
                  : envData.availabilityRequirement === "LOW"
                  ? getText("Low", "پایین", "منخفض")
                  : getText("Medium", "متوسط", "متوسط")}
              </div>
            </div>
          </div>
        </div>

        {/* Modified Metrics Card - Enhanced */}
        <div className='bg-white p-4 rounded-xl  transition-shadow duration-300'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='p-2 rounded-lg bg-blue-50'>
              <svg
                className='w-6 h-6 text-blue-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-800'>
              {getText(
                "Modified Metrics",
                "معیارهای اصلاح شده",
                "المقاييس المعدلة"
              )}
            </h3>
          </div>

          <div className='space-y-4'>
            <div className='bg-gray-50 p-3 rounded-lg'>
              <label className='block text-sm font-medium text-gray-600 mb-2'>
                {getText("Attack Vector", "بردار حمله", "متجه الهجوم")}
              </label>
              <div
                className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${
                  envData.modifiedAttackVector === "NETWORK"
                    ? "bg-purple-100 text-purple-800"
                    : envData.modifiedAttackVector === "ADJACENT"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                {envData.modifiedAttackVector === "NETWORK" ? (
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
                      d='M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
                    />
                  </svg>
                ) : envData.modifiedAttackVector === "ADJACENT" ? (
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
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                ) : (
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
                      d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
                    />
                  </svg>
                )}
                {envData.modifiedAttackVector === "NETWORK"
                  ? getText("Network", "شبکه", "شبكة")
                  : envData.modifiedAttackVector === "ADJACENT"
                  ? getText("Adjacent", "مجاور", "مجاور")
                  : getText("Local", "محلی", "محلي")}
              </div>
            </div>

            <div className='bg-gray-50 p-3 rounded-lg'>
              <label className='block text-sm font-medium text-gray-600 mb-2'>
                {getText("Attack Complexity", "پیچیدگی حمله", "تعقيد الهجوم")}
              </label>
              <div
                className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${
                  envData.modifiedAttackComplexity === "LOW"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {envData.modifiedAttackComplexity === "LOW" ? (
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
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                ) : (
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
                      d='M19 14l-7 7m0 0l-7-7m7 7V3'
                    />
                  </svg>
                )}
                {envData.modifiedAttackComplexity === "LOW"
                  ? getText("Low", "پایین", "منخفض")
                  : getText("High", "بالا", "عالي")}
              </div>
            </div>

            <div className='bg-gray-50 p-3 rounded-lg'>
              <label className='block text-sm font-medium text-gray-600 mb-2'>
                {getText(
                  "Privileges Required",
                  "میزان دسترسی مورد نیاز",
                  "الصلاحيات المطلوبة"
                )}
              </label>
              <div
                className={`px-3 py-1 inline-flex items-center text-sm font-medium rounded-full ${
                  envData.modifiedPrivilegesRequired === "NONE"
                    ? "bg-green-100 text-green-800"
                    : envData.modifiedPrivilegesRequired === "LOW"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {envData.modifiedPrivilegesRequired === "NONE" ? (
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
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                ) : envData.modifiedPrivilegesRequired === "LOW" ? (
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
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                ) : (
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
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                )}
                {envData.modifiedPrivilegesRequired === "NONE"
                  ? getText("None", "هیچ", "لا شيء")
                  : envData.modifiedPrivilegesRequired === "LOW"
                  ? getText("Low", "پایین", "منخفض")
                  : getText("High", "بالا", "عالي")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Environmental Assessments Card */}
      <div className='mt-8 bg-white rounded-lg shadow overflow-hidden'>
        <div className='px-6 py-4 border-b border-gray-200 flex justify-between items-center'>
          <h3 className='text-lg font-semibold text-gray-800'>
            {getText(
              "Recent Environmental Assessments",
              "ارزیابی‌های اخیر محیطی",
              "التقييمات البيئية الأخيرة"
            )}
          </h3>
          <button className='text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-md flex items-center'>
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
            {getText("New Assessment", "ارزیابی جدید", "تقييم جديد")}
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {getText("Assessment", "ارزیابی", "التقييم")}
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {getText("Score", "امتیاز", "النتيجة")}
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {getText("Severity", "شدت", "الخطورة")}
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {getText("Date", "تاریخ", "التاريخ")}
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {getText("Status", "وضعیت", "الحالة")}
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  {getText("Actions", "عملیات", "إجراءات")}
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {/* Row 1 */}
              <tr className='hover:bg-gray-50'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center gap-5'>
                    <div className='flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600'>
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
                          d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
                        />
                      </svg>
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {getText("Web Server", "سرور وب", "خادم الويب")}
                      </div>
                      <div className='text-sm text-gray-500'>
                        ID: SRV-2023-001
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900 font-medium'>8.2</div>
                  <div className='text-xs text-gray-500'>/10</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800'>
                    {getText("High", "بالا", "عالي")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <div>2023-05-15</div>
                  <div className='text-xs text-gray-400'>14:30</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                    {getText("Completed", "تکمیل شده", "مكتمل")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex space-x-2 gap-3'>
                    <button className='text-blue-600 hover:text-blue-900 flex items-center'>
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
                    <button className='text-gray-600 hover:text-gray-900 flex items-center'>
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
                    <div className='flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600'>
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
                          d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
                        />
                      </svg>
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {getText(
                          "Database Server",
                          "سرور دیتابیس",
                          "خادم قاعدة البيانات"
                        )}
                      </div>
                      <div className='text-sm text-gray-500'>
                        ID: SRV-2023-002
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900 font-medium'>6.5</div>
                  <div className='text-xs text-gray-500'>/10</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                    {getText("Medium", "متوسط", "متوسط")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <div>2023-04-22</div>
                  <div className='text-xs text-gray-400'>10:15</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                    {getText("Completed", "تکمیل شده", "مكتمل")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex space-x-2 gap-3'>
                    <button className='text-blue-600 hover:text-blue-900 flex items-center'>
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
                    <button className='text-gray-600 hover:text-gray-900 flex items-center'>
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
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {getText("Email Server", "سرور ایمیل", "خادم البريد")}
                      </div>
                      <div className='text-sm text-gray-500'>
                        ID: SRV-2023-003
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm text-gray-900 font-medium'>4.3</div>
                  <div className='text-xs text-gray-500'>/10</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                    {getText("Medium", "متوسط", "متوسط")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  <div>2023-03-10</div>
                  <div className='text-xs text-gray-400'>09:45</div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                    {getText("In Progress", "در حال انجام", "قيد التنفيذ")}
                  </span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <div className='flex space-x-2 gap-3'>
                    <button className='text-blue-600 hover:text-blue-900 flex items-center'>
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
                    <button className='text-gray-600 hover:text-gray-900 flex items-center'>
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

      {/* Add Environmental Assessment Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-xl font-bold text-gray-800'>
                  {getText(
                    "Add Environmental Assessment",
                    "افزودن تحلیل محیطی",
                    "إضافة تقييم بيئي"
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
                      {getText("Name", "نام", "الاسم")}
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={envData.name}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                      placeholder={getText(
                        "e.g. Web Server",
                        "مثلا سرور وب",
                        "مثال: خادم الويب"
                      )}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='confidentialityRequirement'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Confidentiality Requirement",
                        "نیاز محرمانگی",
                        "متطلب السرية"
                      )}
                    </label>
                    <select
                      id='confidentialityRequirement'
                      name='confidentialityRequirement'
                      value={envData.confidentialityRequirement}
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
                      htmlFor='integrityRequirement'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Integrity Requirement",
                        "نیاز تمامیت",
                        "متطلب التكامل"
                      )}
                    </label>
                    <select
                      id='integrityRequirement'
                      name='integrityRequirement'
                      value={envData.integrityRequirement}
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
                      htmlFor='availabilityRequirement'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Availability Requirement",
                        "نیاز در دسترس بودن",
                        "متطلب التوافر"
                      )}
                    </label>
                    <select
                      id='availabilityRequirement'
                      name='availabilityRequirement'
                      value={envData.availabilityRequirement}
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
                      htmlFor='modifiedAttackVector'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Modified Attack Vector",
                        "بردار حمله اصلاح شده",
                        "متجه الهجوم المعدل"
                      )}
                    </label>
                    <select
                      id='modifiedAttackVector'
                      name='modifiedAttackVector'
                      value={envData.modifiedAttackVector}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='modifiedAttackComplexity'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Modified Attack Complexity",
                        "پیچیدگی حمله اصلاح شده",
                        "تعقيد الهجوم المعدل"
                      )}
                    </label>
                    <select
                      id='modifiedAttackComplexity'
                      name='modifiedAttackComplexity'
                      value={envData.modifiedAttackComplexity}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='modifiedPrivilegesRequired'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Modified Privileges Required",
                        "دسترسی مورد نیاز اصلاح شده",
                        "الصلاحيات المطلوبة المعدلة"
                      )}
                    </label>
                    <select
                      id='modifiedPrivilegesRequired'
                      name='modifiedPrivilegesRequired'
                      value={envData.modifiedPrivilegesRequired}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='modifiedUserInteraction'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Modified User Interaction",
                        "تعامل کاربر اصلاح شده",
                        "تفاعل المستخدم المعدل"
                      )}
                    </label>
                    <select
                      id='modifiedUserInteraction'
                      name='modifiedUserInteraction'
                      value={envData.modifiedUserInteraction}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='modifiedScope'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Modified Scope",
                        "حوزه اصلاح شده",
                        "النطاق المعدل"
                      )}
                    </label>
                    <select
                      id='modifiedScope'
                      name='modifiedScope'
                      value={envData.modifiedScope}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='modifiedConfidentiality'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Modified Confidentiality",
                        "محرمانگی اصلاح شده",
                        "السرية المعدلة"
                      )}
                    </label>
                    <select
                      id='modifiedConfidentiality'
                      name='modifiedConfidentiality'
                      value={envData.modifiedConfidentiality}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='modifiedIntegrity'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Modified Integrity",
                        "تمامیت اصلاح شده",
                        "التكامل المعدل"
                      )}
                    </label>
                    <select
                      id='modifiedIntegrity'
                      name='modifiedIntegrity'
                      value={envData.modifiedIntegrity}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                      htmlFor='modifiedAvailability'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      {getText(
                        "Modified Availability",
                        "در دسترس بودن اصلاح شده",
                        "التوافر المعدل"
                      )}
                    </label>
                    <select
                      id='modifiedAvailability'
                      name='modifiedAvailability'
                      value={envData.modifiedAvailability}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
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
                    {getText("Save Assessment", "ذخیره ارزیابی", "حفظ التقييم")}
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

export default EnvironmentalTreatment;
