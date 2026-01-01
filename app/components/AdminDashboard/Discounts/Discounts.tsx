import React from "react";
import { Plus, Edit, Trash } from "react-feather";
function Discounts({
  colors,
  setCurrentDiscount,
  setShowDiscountModal,
  discounts,
}: any) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
        <h2 className='text-xl font-bold' style={{ color: colors.dark }}>
          إدارة الخصومات ورموز التخفيض
        </h2>
        <button
          className='px-4 py-2 rounded-lg text-sm font-medium flex items-center mt-4 md:mt-0'
          style={{
            backgroundColor: colors.primary,
            color: colors.light,
          }}
          onClick={() => {
            setCurrentDiscount(null);
            setShowDiscountModal(true);
          }}
        >
          <Plus size={16} className='ml-1' />
          إضافة رمز خصم
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr
              className='text-right'
              style={{ backgroundColor: colors.light }}
            >
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                رمز الخصم
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                النوع
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                القيمة
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                تاريخ البدء
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                تاريخ الانتهاء
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                تم الاستخدام
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الحالة
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount: any) => (
              <tr key={discount.id} className='border-b border-gray-100'>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {discount.code}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {discount.type === "percentage" ? "نسبة مئوية" : "مبلغ ثابت"}
                </td>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {discount.type === "percentage"
                    ? `${discount.value}%`
                    : `${discount.value.toLocaleString("ar-IR")} تومان`}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {discount.startDate}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {discount.endDate}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {discount.used} من {discount.usageLimit}
                </td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      new Date() >=
                        new Date(discount.endDate.replace(/\//g, "-")) ||
                      discount.used >= discount.usageLimit
                        ? "bg-gray-100 text-gray-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {new Date() >=
                      new Date(discount.endDate.replace(/\//g, "-")) ||
                    discount.used >= discount.usageLimit
                      ? "منتهي"
                      : "نشط"}
                  </span>
                </td>
                <td className='p-4'>
                  <div className='flex gap-2'>
                    <button
                      className='text-blue-500 hover:text-blue-700 text-sm flex items-center'
                      title='تعديل'
                      onClick={() => {
                        setCurrentDiscount(discount);
                        setShowDiscountModal(true);
                      }}
                    >
                      <Edit size={14} className='ml-1' />
                      تعديل
                    </button>
                    <button
                      className='text-red-500 hover:text-red-700 text-sm flex items-center'
                      title='حذف'
                    >
                      <Trash size={14} className='ml-1' />
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Discounts;