export default function Contact() {
  return (
    <section className='max-w-5xl mx-auto px-4 py-12 text-gray-800'>
      <h1 className='text-4xl font-bold mb-8 text-center border-b pb-4'>
        اتصل بنا
      </h1>

      <p className='text-center text-lg mb-10'>
        إذا كان لديك أي استفسار أو اقتراح أو ملاحظة، يسعدنا أن نسمع منك. تواصل
        معنا عبر النموذج أدناه أو من خلال معلومات الاتصال.
      </p>

      <div className='grid md:grid-cols-2 gap-8'>
        {/* معلومات الاتصال */}
        <div className='space-y-6 text-sm bg-gray-50 p-6 rounded shadow-sm border'>
          <div>
            <h2 className='text-xl font-semibold mb-2'>📍 عنواننا:</h2>
            <p>الرياض، شارع الملك فهد، مبنى ١٠١، الطابق الثالث</p>
          </div>
          <div>
            <h2 className='text-xl font-semibold mb-2'>📞 هاتف:</h2>
            <p>+966-11-1234567</p>
          </div>
          <div>
            <h2 className='text-xl font-semibold mb-2'>
              📧 البريد الإلكتروني:
            </h2>
            <p>support@example.com</p>
          </div>
          <div>
            <h2 className='text-xl font-semibold mb-2'>⏰ ساعات العمل:</h2>
            <p>يومياً من 9 صباحاً حتى 8 مساءً (ما عدا أيام العطل الرسمية)</p>
          </div>
        </div>

        {/* نموذج الاتصال */}
        <form className='space-y-5 bg-white p-6 rounded shadow-sm border'>
          <div>
            <label className='block mb-1 font-medium'>اسمك:</label>
            <input
              type='text'
              className='w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='مثال: أحمد محمد'
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>البريد الإلكتروني:</label>
            <input
              type='email'
              className='w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='your@email.com'
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>الموضوع:</label>
            <input
              type='text'
              className='w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='مثال: متابعة الطلب'
            />
          </div>

          <div>
            <label className='block mb-1 font-medium'>رسالتك:</label>
            <textarea
              rows={5}
              className='w-full px-4 py-2 border rounded outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='نص رسالتك...'
            />
          </div>

          <button
            type='submit'
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition'
          >
            إرسال الرسالة
          </button>
        </form>
      </div>
    </section>
  );
}
