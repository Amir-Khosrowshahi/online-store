export default function PrivacyPolicy() {
  return (
    <section className='max-w-5xl mx-auto px-6 py-14'>
      {/* الهيدر */}
      <div className='text-center mb-14'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-800 mb-4'>
          🔐 سياسة الخصوصية
        </h1>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
          نحترم معلوماتك الشخصية وملتزمون بحمايتها. هذه الصفحة تهدف إلى توضيح
          كيفية جمع واستخدام وحفظ معلوماتك.
        </p>
      </div>

      {/* المحتوى */}
      <div className='space-y-10'>
        {/* جمع المعلومات */}
        <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
          <h2 className='text-xl font-bold text-blue-600 mb-3'>
            📥 ما هي المعلومات التي نجمعها؟
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>الاسم، رقم الجوال والعنوان لمعالجة الطلبات</li>
            <li>سجل المشتريات وسلوك المستخدم لتحسين الخدمات</li>
            <li>معلومات المتصفح والجهاز لتحسين الموقع</li>
          </ul>
        </div>

        {/* استخدام المعلومات */}
        <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
          <h2 className='text-xl font-bold text-green-600 mb-3'>
            📊 استخدام المعلومات
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>توصيل الطلبات، تقديم الدعم والخدمات الأفضل</li>
            <li>تقديم عروض مخصصة بناءً على سلوك الشراء</li>
            <li>إرسال رسائل إعلامية وترويجية (بموافقتك)</li>
          </ul>
        </div>

        {/* أمان المعلومات */}
        <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
          <h2 className='text-xl font-bold text-purple-600 mb-3'>
            🔐 أمان المعلومات
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>جميع المعلومات تنتقل باستخدام بروتوكولات آمنة (SSL)</li>
            <li>نستخدم خوادم آمنة ومشفرة</li>
            <li>الوصول إلى المعلومات مسموح فقط للموظفين المصرح لهم</li>
          </ul>
        </div>

        {/* حقوق المستخدم */}
        <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
          <h2 className='text-xl font-bold text-pink-600 mb-3'>✅ حقوقك</h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>يمكنك طلب حذف معلوماتك في أي وقت</li>
            <li>يمكنك تقييد أو إلغاء وصولك إلى خدماتنا</li>
            <li>في حال ملاحظة أي انتهاك، يمكنك التواصل معنا</li>
          </ul>
        </div>

        {/* تغييرات سياسة الخصوصية */}
        <div className='bg-white p-6 rounded-2xl shadow-md border border-gray-100'>
          <h2 className='text-xl font-bold text-yellow-600 mb-3'>
            📝 تحديثات السياسة
          </h2>
          <p className='text-gray-700 leading-relaxed'>
            في حال إجراء أي تغييرات على سياسة الخصوصية، سنعلمك عبر هذه الصفحة.
            ننصحك بمراجعة هذه الصفحة بين الحين والآخر.
          </p>
        </div>
      </div>

      {/* التذييل */}
      <p className='mt-16 text-center text-sm text-gray-500 border-t pt-6'>
        آخر تحديث: يوليو 2024 | جميع الحقوق محفوظة ©
      </p>
    </section>
  );
}
