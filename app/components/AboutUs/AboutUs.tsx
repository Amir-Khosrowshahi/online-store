export default function AboutPage() {
  return (
    <section className='max-w-6xl mx-auto px-4 py-12 text-gray-800 leading-8'>
      <h1 className='text-4xl font-bold mb-6 text-center border-b pb-4'>
        من نحن
      </h1>

      <p className='text-lg mb-10 text-justify'>
        متجرنا الإلكتروني تم إنشاؤه بهدف توفير تجربة تسوق سهلة، آمنة وممتعة
        لجميع العملاء في الخليج العربي...
      </p>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-3'>🎯 مهمتنا</h2>
        <p className='text-sm text-justify'>
          مهمتنا الرئيسية هي تقديم منتجات عالية الجودة بأسعار منصفة...
        </p>
      </div>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-3'>🌟 رؤيتنا</h2>
        <p className='text-sm text-justify'>
          نطمح أن نكون أحد أفضل 5 متاجر إلكترونية في منطقة الخليج العربي...
        </p>
      </div>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4'>✨ لماذا تختارنا؟</h2>
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm list-inside'>
          <li className='bg-gray-50 p-4 rounded shadow-sm border'>
            ✅ ضمان أصالة المنتجات
          </li>
          <li className='bg-gray-50 p-4 rounded shadow-sm border'>
            🚚 توصيل سريع ومجاني
          </li>
          <li className='bg-gray-50 p-4 rounded shadow-sm border'>
            📞 دعم فني على مدار 24 ساعة
          </li>
          <li className='bg-gray-50 p-4 rounded shadow-sm border'>
            💳 دفع آمن
          </li>
          <li className='bg-gray-50 p-4 rounded shadow-sm border'>
            🔄 ضمان إرجاع المنتجات
          </li>
          <li className='bg-gray-50 p-4 rounded shadow-sm border'>
            📦 تغليف آمن
          </li>
        </ul>
      </div>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4'>👥 فريقنا</h2>
        <p className='text-sm text-justify mb-4'>
          يتكون فريق متجرنا من متخصصين في مجالات توريد المنتجات، التسويق، تصميم
          تجربة المستخدم وخدمة العملاء...
        </p>
      </div>

      <div className='mb-10'>
        <h2 className='text-2xl font-semibold mb-4'>🔒 ثقتكم شرف لنا</h2>
        <p className='text-sm text-justify mb-4'>
          متجرنا حاصل على شهادات الجودة الإلكترونية وشهادة SSL لتأمين عمليات
          الدفع الإلكتروني...
        </p>
      </div>

      <div className='text-center mt-12'>
        <p className='text-base'>إذا كان لديك أي استفسار، تواصل معنا:</p>
        <a
          href='/contact'
          className='inline-block mt-3 text-blue-600 hover:underline'
        >
          اتصل بنا
        </a>
      </div>
    </section>
  );
}
