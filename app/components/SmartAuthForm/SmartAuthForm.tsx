"use client";

import Link from "next/link";
import { useState } from "react";

export default function SmartAuthForm() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        body: JSON.stringify({ mobile }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (res.ok) {
        setStep(2);
      }
      setMessage(result.message || "");
    } catch (err) {
      setMessage("خطأ في إرسال رمز التحقق.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        body: JSON.stringify({ mobile, otp }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("✅ تم تسجيل الدخول بنجاح.");
      } else {
        setMessage(result.message || "رمز التحقق غير صحيح.");
      }
    } catch (err) {
      setMessage("حدث خطأ ما.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=' w-screen h-screen flex items-center justify-center'>
      <div className='bg-white shadow-2xl rounded-3xl border px-8 py-12 max-w-md w-full space-y-8'>
        {/* الشعار */}
        <div className='flex justify-center relative'>
          <Link href={"/"} className='absolute right-0'>
            <svg
              width='30'
              height='24'
              viewBox='0 0 30 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <line
                x1='6'
                y1='12'
                x2='15'
                y2='12'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
              />

              <path
                d='M15 7l10 5-10 5'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='none'
              />
            </svg>
          </Link>

          <h1 className='text-black'>شعاركم</h1>
        </div>

        {/* العنوان */}
        <h1 className='text-h4 text-neutral-900 text-right w-full mt-4'>
          تسجيل الدخول / إنشاء حساب
        </h1>

        {/* النموذج */}
        <form
          onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
          className='space-y-6'
        >
          {step === 1 ? (
            <input
              type='tel'
              required
              pattern='^05\d{8}$'
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder='مثال: 0512345678'
              style={{ outline: "none" }}
              className='w-full border-2 text-[#3f4064] border-[#ef4056] p-4 rounded-xl text-right placeholder:text-sm'
            />
          ) : (
            <input
              type='text'
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder='رمز التحقق المكون من 6 أرقام'
              className='w-full  border-2 text-[#3f4064] border-[#ef4056] p-4 rounded-xl text-center tracking-widest font-bold text-lg placeholder:text-center'
            />
          )}
          <button
            type='submit'
            disabled={loading}
            style={{ backgroundColor: "#ef4056" }}
            className='w-full py-3 rounded-xl text-white hover:opacity-90 transition'
          >
            {loading
              ? "جاري المعالجة..."
              : step === 1
              ? "الحصول على رمز التحقق"
              : "تأكيد وتسجيل الدخول"}
          </button>

          <p className='text-caption text-neutral-700 mt-4 text-[11px] text-center'>
            تسجيل الدخول يعني موافقتك على شروط الموقع و{" "}
            <Link href={"/privacy"} className='text-[#008eb2]'>
              سياسة الخصوصية
            </Link>
            .
          </p>
        </form>

        {/* رسالة النظام */}
        {message && (
          <p className='text-center text-sm text-gray-600'>{message}</p>
        )}
      </div>
    </section>
  );
}
