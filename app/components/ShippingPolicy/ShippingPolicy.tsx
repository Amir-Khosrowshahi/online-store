"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import {
  Truck,
  Clock,
  MapPin,
  Package,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "react-feather";
import Link from "next/link";

interface ShippingMethod {
  id: number;
  name: string;
  deliveryTime: string;
  price: string;
  description: string;
  coverage: string[];
  restrictions?: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface ShippingPolicyData {
  title: string;
  description: string;
  methods: ShippingMethod[];
  faqs: FAQ[];
  lastUpdated?: string;
}

const ShippingPolicyPage = () => {
  const [shippingData, setShippingData] = useState<ShippingPolicyData | null>(
    null
  );
  const [activeMethodId, setActiveMethodId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        // في الحالة الفعلية:
        // const response = await fetch('/api/shipping-policy');
        // const data = await response.json();

        // بيانات نموذجية
        const mockData: ShippingPolicyData = {
          title: "سياسات الشحن والتوصيل",
          description: "شروط وطرق شحن الطلبات في متجرنا الإلكتروني",
          lastUpdated: "۲۰۲۳/۰۸/۱۱",
          methods: [
            {
              id: 1,
              name: "الشحن السريع",
              deliveryTime: "۱ إلى ۲ يوم عمل",
              price: "مجاني للطلبات فوق ۵۰۰ ألف تومان",
              description: "أسرع طريقة شحن لجميع مناطق طهران ومراكز المحافظات",
              coverage: ["طهران", "كرج", "مشهد", "أصفهان", "شيراز", "تبريز"],
              restrictions: "الحد الأقصى للوزن ۱۰ كيلوغرام",
            },
            {
              id: 2,
              name: "الشحن العادي",
              deliveryTime: "۳ إلى ۵ أيام عمل",
              price: "۱۵,۰۰۰ تومان",
              description: "الشحن لجميع مدن البلاد",
              coverage: ["جميع المدن"],
              restrictions: "الحد الأقصى للوزن ۳۰ كيلوغرام",
            },
          ],
          faqs: [
            {
              id: 1,
              question: "كيف يتم جدولة شحن الطلبات؟",
              answer:
                "يتم معالجة الطلبات وتسجيلها في الأيام غير الإجازة من الساعة ۸ حتى ۱۶.",
            },
            {
              id: 2,
              question: "هل يمكن تغيير العنوان بعد تأكيد الطلب؟",
              answer:
                "قبل شحن الطلب، يمكنك طلب تغيير العنوان من خلال لوحة المستخدم.",
            },
          ],
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setShippingData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError("خطأ في استرجاع معلومات الشحن");
        setIsLoading(false);
        console.error("Error fetching shipping data:", err);
      }
    };

    fetchShippingData();
  }, []);

  const toggleMethodDetails = (methodId: number): void => {
    setActiveMethodId((prevId) => (prevId === methodId ? null : methodId));
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md text-center'>
          {error}
          <button
            onClick={() => window.location.reload()}
            className='mt-2 text-blue-600 font-medium block mx-auto'
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!shippingData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded'>
          معلومات الشحن غير متوفرة
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Head>
        <title>{shippingData.title} | المتجر الإلكتروني</title>
        <meta name='description' content={shippingData.description} />
      </Head>

      <header className='bg-white shadow-sm'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col items-center text-center'>
            <div className='bg-blue-100 p-3 rounded-full mb-4'>
              <Truck className='text-blue-600 w-8 h-8' />
            </div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              {shippingData.title}
            </h1>
            <p className='text-gray-600 max-w-2xl'>
              {shippingData.description}
            </p>
            {shippingData.lastUpdated && (
              <p className='text-sm text-gray-500 mt-2'>
                آخر تحديث: {shippingData.lastUpdated}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className='container mx-auto px-4 py-8'>
        <section className='mb-12'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center'>
            <Package className='ml-2 text-blue-500' />
            طرق الشحن
          </h2>

          <div className='grid md:grid-cols-2 gap-6'>
            {shippingData.methods.map((method) => (
              <article
                key={method.id}
                className='bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow'
              >
                <div className='p-6'>
                  <div className='flex items-start'>
                    <div className='bg-blue-100 p-2 rounded-full mr-4 flex-shrink-0'>
                      <Truck className='text-blue-600 w-5 h-5' />
                    </div>
                    <div>
                      <h3 className='text-xl font-semibold text-gray-800 mb-1'>
                        {method.name}
                      </h3>
                      <div className='flex items-center text-sm text-gray-500 mb-3'>
                        <Clock className='w-4 h-4 ml-1' />
                        <span>وقت التوصيل: {method.deliveryTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className='bg-gray-50 p-4 rounded-lg mb-4'>
                    <p className='font-medium text-gray-700 mb-1'>
                      تكلفة الشحن:
                    </p>
                    <p className='text-gray-600'>{method.price}</p>
                  </div>

                  <button
                    onClick={() => toggleMethodDetails(method.id)}
                    className='w-full flex items-center justify-between py-2 px-3 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors'
                    aria-expanded={activeMethodId === method.id}
                  >
                    <span>عرض التفاصيل</span>
                    {activeMethodId === method.id ? (
                      <ChevronUp className='w-5 h-5' />
                    ) : (
                      <ChevronDown className='w-5 h-5' />
                    )}
                  </button>

                  {activeMethodId === method.id && (
                    <div className='mt-4 pt-4 border-t border-gray-100'>
                      <p className='text-gray-600 mb-4'>{method.description}</p>

                      <div className='mb-4'>
                        <h4 className='font-medium text-gray-800 mb-2'>
                          المناطق المشمولة:
                        </h4>
                        <ul className='list-disc list-inside text-gray-600 space-y-1'>
                          {method.coverage.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>

                      {method.restrictions && (
                        <div className='bg-yellow-50 p-3 rounded-lg border border-yellow-100'>
                          <h4 className='font-medium text-yellow-800 mb-1'>
                            القيود:
                          </h4>
                          <p className='text-yellow-700'>
                            {method.restrictions}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='p-6 md:p-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-6 flex items-center'>
              <CheckCircle className='ml-2 text-green-500' />
              الأسئلة الشائعة
            </h2>

            <div className='space-y-6'>
              {shippingData.faqs.map((faq) => (
                <div
                  key={faq.id}
                  className='border-b border-gray-100 pb-6 last:border-0 last:pb-0'
                >
                  <h3 className='text-lg font-medium text-gray-800 mb-2'>
                    {faq.question}
                  </h3>
                  <p className='text-gray-600'>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <section className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 mt-8'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-2xl font-bold mb-4'>
            هل تحتاج إلى مزيد من المساعدة؟
          </h2>
          <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
            فريق الدعم لدينا مستعد للإجابة على استفساراتكم حول شحن وتوصيل
            الطلبات.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Link
              href={"/contact"}
              className='bg-white text-blue-600 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors'
            >
              اتصل بالدعم
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicyPage;
