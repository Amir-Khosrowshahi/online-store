"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "كيف يمكنني تقديم طلبي؟",
    answer:
      "لتقديم الطلب، أضف المنتج المطلوب إلى سلة التسوق وبعد إدخال المعلومات، قم بإتمام الدفع النهائي.",
  },
  {
    question: "هل يجب أن أكون عضواً في الموقع للشراء؟",
    answer:
      "لا، يمكنك الشراء كضيف أيضاً. لكن العضوية لها مزايا مثل تتبع الطلبات بسهولة والحصول على الخصومات.",
  },
  {
    question: "متى سيصل طلبي؟",
    answer: "اعتماداً على مكان إقامتك، تصل الطلبات خلال ۲ إلى ۵ أيام عمل.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer:
      "الدفع الإلكتروني ببطاقات شباب البنكية، وفي بعض المناطق، الدفع عند الاستلام أيضاً متاح.",
  },
  {
    question: "هل الدفع الإلكتروني آمن؟",
    answer: "نعم، جميع المدفوعات تتم عبر بوابات بنكية موثوقة مع تشفير آمن.",
  },
  {
    question: "كيف يمكنني تتبع طلبي؟",
    answer:
      "بعد تقديم الطلب، سيتم إرسال رمز التتبع لك. كما يمكنك مشاهدة حالة طلبك عبر لوحة المستخدم.",
  },
  {
    question: "هل يمكن إرجاع المنتج؟",
    answer:
      "نعم، خلال ۷ أيام عمل بعد استلام المنتج، يمكنك طلب إرجاعه. شروط الإرجاع مذكورة في صفحة القوانين.",
  },
  {
    question: "هل المنتجات مضمونة؟",
    answer:
      "نعم، معظم المنتجات لديها ضمان الأصالة والسلامة البدنية. تفاصيل كل منتج مذكورة في صفحته.",
  },
  {
    question: "كيف يمكنني الحصول على خصم؟",
    answer:
      "نقوم بشكل دوري بتنظيم مهرجانات الخصم. اشترك في النشرة البريدية لتبقى على اطلاع بأحدث العروض.",
  },
  {
    question: "متى سيتم شحن طلبي؟",
    answer:
      "الطلبات المقدمة حتى الساعة ۱۶ يتم تعبئتها وشحنها في نفس اليوم. الطلبات بعد ذلك الوقت تشحن في يوم العمل التالي.",
  },
  {
    question: "هل يمكنني تغيير عنوان الشحن بعد تقديم الطلب؟",
    answer:
      "قبل التأكيد النهائي من قبل فريق الدعم، يمكن تغيير العنوان. للقيام بذلك اتصل بالدعم.",
  },
  {
    question: "ماذا لو فشل الدفع ولكن تم خصم المبلغ من حسابي؟",
    answer:
      "في مثل هذه الحالات، سيتم استرداد المبلغ خلال ۷۲ ساعة كحد أقصى. إذا لم يحدث ذلك، اتصل بالدعم.",
  },
  {
    question: "كيف يمكنني الاتصال بالدعم؟",
    answer:
      "استخدم قسم اتصل بنا أو رقم الدعم المذكور في أسفل الموقع. كما يمكنك التواصل معنا عبر الدردشة المباشرة.",
  },
  {
    question: "هل يمكن تقديم الطلب هاتفياً؟",
    answer:
      "حالياً، تقديم الطلب متاح فقط عبر الموقع. لكن في حالات خاصة يمكنك الاتصال بالدعم.",
  },
  {
    question: "كيف أُعلم عند توفر المنتج غير المتوفر حالياً؟",
    answer:
      'يمكنك في صفحة المنتج، النقر على خيار "أعلمني" ليتم إرسال رسالة نصية لك بمجرد توفر المنتج.',
  },
  {
    question: "كيف يمكنني إدخال كود الخصم؟",
    answer:
      "في الخطوة النهائية للشراء، هناك قسم مخصص لإدخال كود الخصم. أدخل الكود وانقر على تطبيق.",
  },
  {
    question: "هل المنتجات أصلية؟",
    answer:
      "نعم، جميع المنتجات مضمونة الأصالة ويتم توفيرها مباشرة من موردين موثوقين.",
  },
  {
    question: "كيف يمكنني تسجيل تقييم أو تعليق؟",
    answer:
      "بعد شراء المنتج، سيصبح خيار تسجيل التعليق متاحاً في لوحة المستخدم.",
  },
  {
    question: "هل يمكن تحميل المنتجات الرقمية بعد الشراء؟",
    answer:
      "نعم، بعد الدفع الناجح، يصبح رابط التحميل نشطاً في لوحة المستخدم وسيتم إرساله أيضاً عبر البريد الإلكتروني.",
  },
  {
    question: "ماذا أفعل إذا كان المنتج به مشكلة؟",
    answer:
      "في حالة وجود أي مشكلة، اتصل بالدعم خلال ۲٤ ساعة من الاستلام لتلقي التوجيه اللازم.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(
    (item) =>
      item.question.includes(searchQuery) || item.answer.includes(searchQuery)
  );

  return (
    <div className=' max-w-3xl mx-auto p-4 mt-8'>
      <h1 className='flex items-center justify-center text-3xl font-bold text-center mb-6 text-[#343434]'>
        <img
          src='/images/Image__static/faq.png'
          alt='علامة الاستفهام'
          className='w-16 h-16  rotate-12 opacity-70'
        />
        الأسئلة الشائعة
      </h1>

      <input
        type='text'
        placeholder='البحث في الأسئلة...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='w-full p-3 mb-6 border border-gray-300 rounded-xl text-right text-[#343434] placeholder:text-[#343434] focus:outline-none transition-all'
      />

      <div className='space-y-4'>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((item, index) => (
            <div
              key={index}
              className='border border-gray-200 rounded-xl overflow-hidden shadow-sm text-[#343434]'
            >
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full text-right px-5 py-4 bg-gray-100 hover:bg-gray-200 font-medium text-md transition-all flex justify-between items-center'
              >
                <span className='text-md'>{item.question}</span>
                <span className='text-gray-500'>
                  {openIndex === index ? "-" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className='px-5 py-4 text-gray-700 bg-white text-sm border-t border-gray-200 text-right leading-relaxed'>
                  {item.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>
            لم يتم العثور على سؤال بهذا المحتوى.
          </p>
        )}
      </div>
    </div>
  );
}
