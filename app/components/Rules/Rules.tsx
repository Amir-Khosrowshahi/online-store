export default function Rules() {
  return (
    <section className='max-w-5xl mx-auto px-4 py-12'>
      {/* الهيدر الرئيسي */}
      <div className='text-center mb-14'>
        <h1 className='text-4xl md:text-5xl font-extrabold text-gray-700 mb-4'>
          📜 الشروط والأحكام
        </h1>
        <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
          لتجربة تسوق مريحة، آمنة ومفيدة، يرجى قضاء بضع دقائق لقراءة هذه الشروط
          المهمة.
        </p>
      </div>

      {/* بطاقات الشروط */}
      <div className='grid gap-8 md:grid-cols-2'>
        {/* طلب الشراء */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-blue-600 mb-3'>
            🛒 طلب الشراء
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>
              يمكنك التسوق دون الحاجة للتسجيل، لكن العضوية توفر مزايا إضافية مثل
              متابعة الطلبات بسهولة.
            </li>
            <li>
              يرجى إدخال معلومات الاتصال بدقة لتسليم الطلب بشكل أسرع وبلا مشاكل.
            </li>
          </ul>
        </div>

        {/* الدفع والتوصيل */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-green-600 mb-3'>
            💳 الدفع والتوصيل
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>يتم الدفع فقط عبر بوابات الدفع البنكية الآمنة.</li>
            <li>
              يتم توصيل الطلبات خلال 1 إلى 3 أيام عمل (قد تستغرق وقتاً أطول لبعض
              المناطق).
            </li>
          </ul>
        </div>

        {/* إرجاع المنتجات */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-red-600 mb-3'>
            ↩️ إرجاع المنتجات
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>
              في حال إرسال منتج خاطئ، لديك 24 ساعة للإبلاغ عبر{" "}
              <a href='/contact' className='text-blue-500 underline'>
                اتصل بنا
              </a>
              .
            </li>
            <li>يجب إرجاع المنتج بحالته الأصلية وغير مستخدم.</li>
          </ul>
        </div>

        {/* أمان المعلومات */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-purple-600 mb-3'>
            🔒 أمان المعلومات
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>معلوماتك الشخصية آمنة معنا ولن يتم مشاركتها مع أي طرف ثالث.</li>
            <li>المعاملات المالية مشفرة بأعلى مستويات الحماية.</li>
          </ul>
        </div>

        {/* الدعم وخدمة العملاء */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-yellow-600 mb-3'>
            📞 الدعم وخدمة العملاء
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>فريق الدعم متاح يومياً من الساعة 9 صباحاً حتى 6 مساءً.</li>
            <li>
              للتواصل السريع، استخدم نموذج{" "}
              <a href='/contact' className='text-blue-500 underline'>
                اتصل بنا
              </a>{" "}
              أو راسلنا على الواتساب.
            </li>
          </ul>
        </div>

        {/* الحقوق الفكرية */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-indigo-600 mb-3'>
            📚 الحقوق الفكرية
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>
              جميع المنتجات الرقمية محمية بحقوق النشر ومخصصة للاستخدام الشخصي
              فقط.
            </li>
            <li>
              إعادة النشر أو البيع أو المشاركة دون إذن مسبق يترتب عليه متابعات
              قانونية.
            </li>
          </ul>
        </div>

        {/* أكواد الخصم والعروض */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-pink-600 mb-3'>
            🎁 أكواد الخصم والعروض
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>
              أكواد الخصم محدودة بزمن وشروط معينة؛ يرجى قراءة الشروط قبل
              الاستخدام.
            </li>
            <li>لا يتم تمديد العروض بعد انتهاء وقتها.</li>
          </ul>
        </div>

        {/* إلغاء الطلب */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-orange-600 mb-3'>
            ❌ إلغاء الطلب
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>
              يمكن إلغاء الطلب قبل الشحن. يرجى التواصل مع الدعم في أقرب وقت.
            </li>
            <li>
              بعد الشحن، الإلغاء ممكن فقط في حالات خاصة ووفقاً لشروط الإرجاع.
            </li>
          </ul>
        </div>

        {/* استخدام الموقع */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-gray-700 mb-3'>
            🌐 استخدام الموقع
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>أي استخدام ضار أو نشر تعليقات مسيئة يؤدي إلى حظر الحساب.</li>
            <li>
              على المستخدمين إدخال معلومات صحيحة عند التسجيل. المسؤولية على دقة
              المعلومات تقع على المستخدم.
            </li>
          </ul>
        </div>

        {/* الفاتورة وإيصال الشراء */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all'>
          <h2 className='text-xl font-bold text-cyan-600 mb-3'>
            🧾 الفاتورة وإيصال الشراء
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>بعد اكتمال الشراء، تتوفر فاتورة في حسابك الشخصي.</li>
            <li>
              للحصول على نسخة رسمية أو مختومة، يمكنك التنسيق مع خدمة العملاء.
            </li>
          </ul>
        </div>

        {/* ملاحظات ختامية */}
        <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all md:col-span-2'>
          <h2 className='text-xl font-bold text-gray-800 mb-3'>
            📌 ملاحظات ختامية
          </h2>
          <ul className='list-disc pr-5 space-y-2 text-gray-700 leading-relaxed'>
            <li>يسمح باستخدام محتوى الموقع مع ذكر المصدر.</li>
            <li>
              قد يتم تحديث الشروط بين الحين والآخر. النسخة الأحدث دائماً متاحة
              على هذه الصفحة.
            </li>
          </ul>
        </div>
      </div>

      {/* التذييل */}
      <p className='mt-16 text-center text-sm text-gray-500 border-t pt-6'>
        آخر تحديث: يوليو 2024 | مع خالص التحيات، فريق متجركم ❤️
      </p>
    </section>
  );
}
