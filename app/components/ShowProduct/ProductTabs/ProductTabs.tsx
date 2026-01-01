"use client";
import { useState, useRef } from "react";

export default function ProductDetailsSection() {
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);
  const qaRef = useRef(null);

  const fullText = `يمكنك استخدام سماعات ريمكس RB-S1 ذات التصميم العنقي للاتصال السريع عبر بلوتوث الإصدار 5.10، وإدارة تشغيل الصوت والمكالمات بسهولة من خلال التحكم في الصدر، الزر متعدد الوظائف والميكروفون المدمج مع إلغاء الضوضاء. يمكنك توصيل الموسيقى عبر هاتفك، جهازك اللوحي، الكمبيوتر والأجهزة الأخرى المدعومة بالبلوتوث.تتيح لك هذه السماعات تجربة قوة وبساطة بلوتوث 5.10. اتصال فوري، منخفض الاستهلاك للطاقة وخالي من الأسلاك، لتوفير صوت موثوق ضمن نطاق يصل إلى 10 أمتار. هذا يتيح لك الاستمتاع بالموسيقى وإدارة المكالمات في الهواء الطلق.تم تصميم ثلاثة أحجام مختلفة من أطراف الأذن في هذه السماعات للمساعدة في عزل أفضل وفصل صوتك عن الضوضاء الخارجية، بينما يتكيف إلغاء الضوضاء النشط (ANC) بذكاء ويوفر إلغاءً كاملاً للضوضاء. لذا يمكنك الاستماع إلى موسيقاك المفضلة بعيداً عن ضجيج الخارج.تمثل سماعات Neckband Wireless اللاسلكية مصدرك لتجربة صوت غامر وغني، محمي من ضوضاء العالم الخارجي بإلغاء الضوضاء النشط والسلبي لتقديم صوت استثنائي بالعمق والوضوح الذي يمنحه الطاقة والقوة. تقنية إلغاء الضوضاء تزيل معظم الضوضاء في الترددات المنخفضة إلى المتوسطة مثل صوت محرك السيارة، القطار والطائرة بالإضافة إلى المحادثات الخلفية وضجيج الحشود. تعمل أطراف الأذن في هذه السماعات كعازل آمن وتفصل الصوت عن الضوضاء عالية التردد. يمكنك الاستمتاع بكمال وغنى موسيقاك مع صوت مضبوط بدقة، بينما أنت محمي من الضوضاء.تتيح لك هذه السماعات الاستمتاع بأغاني واضحة تضع مغنيك المفضل أمامك مباشرة، مع bass قوي يرفعك والموسيقى إلى مستوى آخر. يتم تقديم الصوت بشكل ديناميكي ومثير عبر النطاق الكامل. هذه السماعات مقاومة للماء والعرق وتتميز بتصميم ergonomi مناسب للرياضة ولا تسبب أي إزعاج أثناء التمرين، ومادة الهيكل مصممة بحيث لا تسبب أي حساسية للجلد.`;

  const shortText = fullText.slice(0, 600);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "هل هذا المنتج يحتوي على ضمان؟",
      answer: "نعم، يحتوي على ضمان شرعي ساري لمدة 18 شهراً.",
    },
    {
      id: 2,
      question: "هل يمكن الاتصال باللابتوب أيضاً؟",
      answer: "نعم، يتصل بجميع الأجهزة المدعومة بالبلوتوث.",
    },
  ]);

  const [newQuestion, setNewQuestion] = useState("");

  const handleQuestionSubmit = () => {
    if (newQuestion.trim()) {
      setQuestions([
        ...questions,
        { id: Date.now(), question: newQuestion, answer: "قيد المراجعة..." },
      ]);
      setNewQuestion("");
    }
  };

  const scrollToSection = (ref: any, tab: any) => {
    setActiveTab(tab);
    const offset = 80;
    const element = ref.current;
    const y = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className='rtl px-4 lg:px-0 mt-10 space-y-12'>
      {/* التبويبات */}
      <div className='flex items-center justify-between sticky top-0 bg-white z-10 border-b'>
        <div className='flex space-x-4  space-x-reverse'>
          <button
            onClick={() => scrollToSection(descriptionRef, "description")}
            className={`text-sm font-medium p-3 ${
              activeTab === "description"
                ? "text-[#ef495d] border-b-2 border-[#ef4056]"
                : "text-[#81858b]"
            }`}
          >
            الوصف
          </button>
          <button
            onClick={() => scrollToSection(featuresRef, "features")}
            className={`text-sm font-medium p-3 ${
              activeTab === "features"
                ? "text-[#ef495d]  border-b-2 border-[#ef4056]"
                : "text-[#81858b]"
            }`}
          >
            المواصفات
          </button>
          <button
            onClick={() => scrollToSection(qaRef, "qa")}
            className={`text-sm font-medium p-3 ${
              activeTab === "qa"
                ? "text-[#ef495d]  border-b-2 border-[#ef4056]"
                : "text-[#81858b]"
            }`}
          >
            الأسئلة الشائعة
          </button>
        </div>
        <button className='bg-[#ef4056] p-3 text-white px-4 py-2 rounded-xl text-sm hover:bg-[#ec5266]'>
          أضف إلى السلة
        </button>
      </div>

      {/* وصف المنتج */}
      <section ref={descriptionRef} className='space-y-4 '>
        <h2 className='text-xl font-bold text-gray-800'>وصف المنتج</h2>
        <p className='text-sm text-gray-700 leading-[30px]'>
          {showMore ? fullText : shortText + "..."}
        </p>
        <button
          className='text-[#19bfd3] text-sm font-medium hover:underline'
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "إغلاق" : "عرض المزيد"}
        </button>
      </section>

      {/* المواصفات */}
      <section ref={featuresRef} className='space-y-4 border-t py-5'>
        <h2 className='text-xl font-bold text-gray-800'>المواصفات</h2>
        <div className='text-sm text-gray-700 space-y-3'>
          <div>
            <span className='font-medium text-[#81858b] ml-3'>
              نوع الاتصال:{" "}
            </span>
            <span>لاسلكي وسلكي</span>
          </div>
          <div>
            <span className='font-medium ml-3 text-[#81858b]'>
              إصدار البلوتوث:{" "}
            </span>
            <span>5.0</span>
          </div>
          <div>
            <span className='font-medium text-[#81858b] ml-3'>
              ميزة إلغاء الضوضاء:{" "}
            </span>
            <span>نشط (ANC)</span>
          </div>
          <div>
            <span className='font-medium text-[#81858b] ml-3'>
              الشحن السريع:{" "}
            </span>
            <span>مدعوم</span>
          </div>
          <div>
            <span className='font-medium text-[#81858b] ml-3 '>التوافق: </span>
            <span>أندرويد و iOS</span>
          </div>
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section ref={qaRef} className='space-y-4 border-t py-5'>
        <h2 className='text-xl font-bold text-gray-800'>الأسئلة الشائعة</h2>
        <div className='space-y-3'>
          {questions.map((q) => (
            <div key={q.id} className='bg-gray-50 p-4 rounded-xl border'>
              <p className='font-semibold text-sm text-gray-800 mb-1'>
                ❓ {q.question}
              </p>
              <p className='text-sm text-gray-600 px-10 mt-4'>
                <span>الإجابة :</span> {q.answer}
              </p>
            </div>
          ))}
        </div>

        {/* نموذج إرسال سؤال */}
        <div className='mt-6 space-y-2'>
          <label htmlFor='question' className='text-sm text-gray-700 block'>
            اكتب سؤالك:
          </label>
          <textarea
            id='question'
            rows={4}
            className='w-full rounded-xl text-gray-700 border border-gray focus:ring-2 focus:ring-green-500 text-sm'
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button
            onClick={handleQuestionSubmit}
            className='bg-[#ef4056]  text-white px-4 py-2 rounded-xl text-sm'
          >
            إرسال السؤال
          </button>
        </div>
      </section>
    </div>
  );
}
