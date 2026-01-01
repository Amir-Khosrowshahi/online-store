"use client";
import { useState } from "react";
import Head from "next/head";

import {
  CreditCard,
  Smartphone,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "react-feather";
import { FaWallet, FaUniversity, FaQrcode } from "react-icons/fa";
import Link from "next/link";

interface PaymentMethod {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  fee?: string;
  processingTime: string;
  limits?: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const PaymentMethodsSite = () => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      name: "بوابة الدفع الإلكتروني",
      icon: <CreditCard className='w-6 h-6' />,
      description: "دفع آمن ببطاقات شباب",
      features: [
        "دعم جميع البطاقات المصرفية",
        "إمكانية الدفع على عدة مراحل",
        "تأكيد فوري للدفع",
      ],
      processingTime: "فوري",
      limits: "حد أقصى ۵۰ مليون تومان في اليوم",
    },
    {
      id: 2,
      name: "المحفظة الإلكترونية",
      icon: <FaWallet className='w-6 h-6' />,
      description: "دفع سريع عبر المحفظة الرقمية",
      features: [
        "لا حاجة لإدخال معلومات البطاقة",
        "الدفع برصيد المحفظة",
        "إمكانية شحن المحفظة",
      ],
      fee: "مجاني",
      processingTime: "فوري",
    },
    {
      id: 3,
      name: "الدفع عبر الجوال",
      icon: <Smartphone className='w-6 h-6' />,
      description: "الدفع عبر تطبيقات البنوك على الجوال",
      features: ["الدفع بتطبيقات البنوك", "مسح رمز QR", "الدفع عبر USSD"],
      processingTime: "فوري",
    },
    {
      id: 4,
      name: "التحويل البنكي",
      icon: <FaUniversity className='w-6 h-6' />,
      description: "تحويل مباشر إلى الحساب البنكي للمتجر",
      features: [
        "الدفع عبر الفرع أو الإنترنت البنكي",
        "مناسب للمدفوعات المؤسسية",
        "ضرورة إرسال إيصال التحويل",
      ],
      processingTime: "۱ إلى ۲ ساعة بعد التحويل",
      limits: "بدون قيود",
    },
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "هل الدفع الإلكتروني آمن؟",
      answer: "نعم، جميع المدفوعات تتم عبر بوابات بنكية موثوقة وبروتوكول SSL.",
    },
    {
      id: 2,
      question: "كم تستغرق وقتاً until يتم تأكيد الدفع؟",
      answer:
        "المدفوعات الإلكترونية تؤكد فورياً عادة. التحويلات البنكية قد تستغرق حتى ساعتين.",
    },
    {
      id: 3,
      question: "هل هناك قيود على مبلغ الدفع؟",
      answer: "نعم، كل طريقة دفع لها قيودها الخاصة المذكورة في القسم المعني.",
    },
  ];

  const [activeMethod, setActiveMethod] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleMethod = (id: number) => {
    setActiveMethod(activeMethod === id ? null : id);
  };

  const toggleFaq = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <Head>
        <title>طرق الدفع | المتجر الإلكتروني</title>
        <meta
          name='description'
          content='معلومات كاملة حول طرق الدفع في متجرنا الإلكتروني'
        />
      </Head>

      <header className='bg-white shadow-sm'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col items-center text-center'>
            <div className='bg-green-100 p-3 rounded-full mb-4'>
              <CreditCard className='text-green-600 w-8 h-8' />
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>طرق الدفع</h1>
            <p className='text-gray-600 max-w-2xl'>
              أكثر طرق الدفع تنوعاً وأماناً لراحتك
            </p>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-8'>
        <section className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center'>
            <FaWallet className='ml-2 text-green-500' />
            طرق الدفع المتاحة
          </h2>

          <div className='grid md:grid-cols-2 gap-6'>
            {paymentMethods.map((method) => (
              <article
                key={method.id}
                className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow'
              >
                <div className='p-6'>
                  <div className='flex items-start'>
                    <div
                      className={`p-2 rounded-full mr-4 flex-shrink-0 ${
                        method.id === 1
                          ? "bg-blue-100 text-blue-600"
                          : method.id === 2
                          ? "bg-purple-100 text-purple-600"
                          : method.id === 3
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold text-gray-800 mb-1'>
                        {method.name}
                      </h3>
                      <p className='text-gray-600 text-sm'>
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleMethod(method.id)}
                    className={`w-full mt-4 flex items-center justify-between py-2 px-3 rounded-lg text-sm ${
                      activeMethod === method.id
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    } transition-colors`}
                    aria-expanded={activeMethod === method.id}
                  >
                    <span>عرض التفاصيل</span>
                    {activeMethod === method.id ? (
                      <ChevronUp className='w-5 h-5' />
                    ) : (
                      <ChevronDown className='w-5 h-5' />
                    )}
                  </button>

                  {activeMethod === method.id && (
                    <div className='mt-4 pt-4 border-t border-gray-100'>
                      <div className='mb-4'>
                        <h4 className='font-medium text-gray-800 mb-2'>
                          الميزات:
                        </h4>
                        <ul className='list-disc list-inside text-gray-600 space-y-1'>
                          {method.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <h4 className='font-medium text-gray-800 mb-1'>
                            وقت المعالجة:
                          </h4>
                          <p className='text-gray-600'>
                            {method.processingTime}
                          </p>
                        </div>

                        {method.fee && (
                          <div>
                            <h4 className='font-medium text-gray-800 mb-1'>
                              الرسوم:
                            </h4>
                            <p className='text-gray-600'>{method.fee}</p>
                          </div>
                        )}

                        {method.limits && (
                          <div className='col-span-2'>
                            <h4 className='font-medium text-gray-800 mb-1'>
                              القيود:
                            </h4>
                            <p className='text-gray-600'>{method.limits}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='bg-white rounded-lg shadow-md overflow-hidden mb-12'>
          <div className='p-6 md:p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center'>
              <CheckCircle className='ml-2 text-green-500' />
              أمان المدفوعات
            </h2>
            <div className='grid md:grid-cols-3 gap-6'>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-medium text-gray-800 mb-2'>تشفير متقدم</h3>
                <p className='text-gray-600 text-sm'>
                  جميع المدفوعات تتم بروتوكول SSL ومعايير أمان البنوك.
                </p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-medium text-gray-800 mb-2'>
                  عدم تخزين المعلومات
                </h3>
                <p className='text-gray-600 text-sm'>
                  معلومات بطاقتك البنكية لا تخزن في نظامنا وتستخدم للدفع فقط.
                </p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-medium text-gray-800 mb-2'>
                  ضمان استرداد الأموال
                </h3>
                <p className='text-gray-600 text-sm'>
                  في حال حدوث أي مشكلة في الدفع، سيتم استرداد أموالك بالكامل.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='p-6 md:p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>
              الأسئلة الشائعة حول الدفع
            </h2>

            <div className='space-y-4'>
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className='border-b border-gray-100 pb-4 last:border-0'
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className='w-full flex items-center justify-between text-right'
                    aria-expanded={activeFaq === faq.id}
                  >
                    <h3 className='text-lg font-medium text-gray-800'>
                      {faq.question}
                    </h3>
                    {activeFaq === faq.id ? (
                      <ChevronUp className='w-5 h-5 text-gray-500 flex-shrink-0' />
                    ) : (
                      <ChevronDown className='w-5 h-5 text-gray-500 flex-shrink-0' />
                    )}
                  </button>

                  {activeFaq === faq.id && (
                    <p className='text-gray-600 mt-2 pr-6'>{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section className='bg-gradient-to-r from-green-600 to-green-700 text-white py-12'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold mb-4'>هل تحتاج إلى مساعدة؟</h2>
          <p className='text-green-100 mb-6 max-w-2xl mx-auto'>
            فريق الدعم لدينا جاهز للإجابة على استفساراتكم حول طرق الدفع.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Link
              href={"/contact"}
              className='bg-white text-green-600 font-medium px-6 py-3 rounded-lg hover:bg-green-50 transition-colors'
            >
              اتصل بالدعم
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentMethodsSite;
