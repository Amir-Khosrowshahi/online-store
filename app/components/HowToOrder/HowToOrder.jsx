import Head from "next/head";
import Link from "next/link";
import {
  ShoppingCart,
  Search,
  CreditCard,
  Truck,
  CheckCircle,
} from "react-feather";

export default function HowToOrder() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Head>
        <title>كيفية تقديم الطلب | متجرنا الإلكتروني</title>
        <meta
          name='description'
          content='دليل شامل حول كيفية تقديم الطلب في متجرنا الإلكتروني'
        />
      </Head>

      <header className='bg-white shadow-sm'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold text-gray-800 text-center'>
            طريقة تقديم الطلب في المتجر الإلكتروني
          </h1>
          <p className='text-lg text-gray-600 mt-2 text-center'>
            أكمل مشترياتك في ٤ خطوات بسيطة فقط
          </p>
        </div>
      </header>

      <main className='container mx-auto px-4 py-12'>
        <div className='grid md:grid-cols-4 gap-8 mb-16'>
          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <div className='bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto'>
              <Search className='text-blue-600 w-6 h-6' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 text-center mb-2'>
              ۱. البحث واختيار المنتج
            </h3>
            <p className='text-gray-600 text-center'>
              ابحث عن المنتج المطلوب وأضفه إلى سلة التسوق
            </p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <div className='bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto'>
              <ShoppingCart className='text-purple-600 w-6 h-6' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 text-center mb-2'>
              ۲. إكمال سلة التسوق
            </h3>
            <p className='text-gray-600 text-center'>
              انتقل إلى صفحة سلة التسوق وراجع معلومات الطلب
            </p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <div className='bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto'>
              <CreditCard className='text-green-600 w-6 h-6' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 text-center mb-2'>
              ۳. الدفع الإلكتروني
            </h3>
            <p className='text-gray-600 text-center'>
              اختر طريقة الدفع وأجرِ الدفع بكل أمان
            </p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow'>
            <div className='bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto'>
              <Truck className='text-yellow-600 w-6 h-6' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 text-center mb-2'>
              ٤. تسليم الطلب
            </h3>
            <p className='text-gray-600 text-center'>
              طلبك جاهز ويتم تسليمه في أسرع وقت
            </p>
          </div>
        </div>

        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
          <div className='md:flex'>
            <div className='md:w-1/2 p-8 md:p-12'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                الدليل الشامل لتقديم الطلب
              </h2>

              <div className='space-y-6'>
                <div className='flex items-start'>
                  <CheckCircle className='text-green-500 mt-1 ml-2 flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      اختيار المنتج
                    </h3>
                    <p className='text-gray-600 mt-1'>
                      يمكنك العثور على المنتج المطلوب عبر التصنيفات أو البحث.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <CheckCircle className='text-green-500 mt-1 ml-2 flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-gray-800'>سلة التسوق</h3>
                    <p className='text-gray-600 mt-1'>
                      بعد اختيار المنتجات، انتقل إلى سلة التسوق وغير الكمية إذا
                      لزم الأمر.
                    </p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <CheckCircle className='text-green-500 mt-1 ml-2 flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      معلومات الشحن
                    </h3>
                    <p className='text-gray-600 mt-1'>
                      أدخل عنوانك بالتفصيل واختر طريقة الشحن.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='md:w-1/2 bg-gray-50 p-8 md:p-12'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                الأسئلة الشائعة
              </h2>

              <div className='space-y-4'>
                <div className='border-b border-gray-200 pb-4'>
                  <h3 className='font-medium text-gray-800'>
                    كيف يمكنني تتبع طلبي؟
                  </h3>
                  <p className='text-gray-600 mt-1 text-sm'>
                    بعد تقديم الطلب، سيتم إرسال رمز تتبع يمكنك من خلاله تتبع
                    طلبك.
                  </p>
                </div>

                <div className='border-b border-gray-200 pb-4'>
                  <h3 className='font-medium text-gray-800'>
                    هل يمكن تغيير العنوان بعد الطلب؟
                  </h3>
                  <p className='text-gray-600 mt-1 text-sm'>
                    إذا لم يتم معالجة طلبك بعد، يمكنك طلب تغيير العنوان عبر لوحة
                    المستخدم.
                  </p>
                </div>

                <div className='border-b border-gray-200 pb-4'>
                  <h3 className='font-medium text-gray-800'>
                    ما هي طرق الدفع المتاحة؟
                  </h3>
                  <p className='text-gray-600 mt-1 text-sm'>
                    يمكنك الدفع عبر البوابة البنكية، المحفظة الإلكترونية أو
                    الدفع عند التسليم (لبعض المنتجات).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className='bg-blue-600 text-white py-12'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold mb-4'>هل أنت مستعد للتسوق؟</h2>
          <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
            زر متجرنا الآن وتصفح آلاف المنتجات عالية الجودة.
          </p>
          <Link
            href={"/"}
            className='bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors'
          >
            ابدأ التسوق
          </Link>
        </div>
      </section>
    </div>
  );
}
