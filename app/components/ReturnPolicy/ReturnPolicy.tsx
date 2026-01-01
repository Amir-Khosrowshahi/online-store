export default function ReturnPolicy() {
  return (
    <div className='max-w-6xl mx-auto px-6 py-12 text-right'>
      <div className='flex flex-col md:flex-row items-start gap-10'>
        {/* صورة إرجاع المنتج */}
        <div className='md:w-1/2'>
          <img
            src='/return-product.png' // ضع صورتك بهذا الاسم في مجلد public
            alt='إجراءات إرجاع المنتج'
            className='rounded-xl shadow-lg w-full'
          />
        </div>

        {/* نص إرجاع المنتج */}
        <div className='md:w-1/2'>
          <h1 className='text-3xl font-extrabold text-gray-800 mb-6'>
            سياسة إرجاع المنتجات
          </h1>

          <p className='text-lg text-gray-700 leading-8 mb-4'>
            رضاك هو أولويتنا الأساسية. إذا لم تكن راضيًا عن شرائك لأي سبب كان،
            يمكنك تقديم طلب إرجاع المنتج خلال{" "}
            <span className='font-bold text-blue-600'>۷ أيام عمل</span>.
          </p>

          <h2 className='text-xl font-semibold text-gray-800 mt-6 mb-2'>
            شروط إرجاع المنتج:
          </h2>
          <ul className='list-disc list-inside text-gray-700 space-y-2'>
            <li>يجب أن يكون المنتج في حالته الأصلية وغير مستخدم.</li>
            <li>يجب أن تكون التغليف والملحقات مكتملة.</li>
            <li>يجب تقديم الفاتورة أو رمز الطلب.</li>
            <li>المنتجات المخصصة لا يمكن إرجاعها.</li>
          </ul>

          <h2 className='text-xl font-semibold text-gray-800 mt-6 mb-2'>
            خطوات الإرجاع:
          </h2>
          <ol className='list-decimal list-inside text-gray-700 space-y-2'>
            <li>الاتصال بالدعم عبر الهاتف أو لوحة المستخدم</li>
            <li>مراجعة الشروط والحصول على الموافقة</li>
            <li>إرسال المنتج من قبل العميل</li>
            <li>فحص المنتج من قبل الفريق الفني</li>
            <li>استرداد المبلغ خلال ٤۸ ساعة عمل بعد الموافقة</li>
          </ol>

          <p className='mt-6 text-gray-600 text-sm'>
            لمزيد من المعلومات، يرجى التواصل مع خدمة العملاء.
          </p>
        </div>
      </div>
    </div>
  );
}
