import React from "react";
import { CreditCard, RefreshCw, DollarSign } from "react-feather";
function Financial({ colors, transactions }: any) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <h2 className='text-xl font-bold mb-6' style={{ color: colors.dark }}>
        الإدارة المالية
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
        <div className='bg-green-50 rounded-lg p-6 border border-green-100'>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-[#1e293b]'>إجمالي الإيرادات</p>
            <DollarSign size={18} className='text-green-500' />
          </div>
          <p className='font-bold text-lg mt-2 text-green-600'>
            245,000,000 تومان
          </p>
        </div>
        <div className='bg-blue-50 rounded-lg p-6 border border-blue-100'>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-[#1e293b]'>الطلبات الناجحة</p>
            <CreditCard size={18} className='text-blue-500' />
          </div>
          <p className='font-bold text-lg mt-2 text-blue-600'>87 طلب</p>
        </div>
        <div className='bg-red-50 rounded-lg p-6 border border-red-100'>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-[#1e293b]'>استرداد الأموال</p>
            <RefreshCw size={18} className='text-red-500' />
          </div>
          <p className='font-bold text-lg mt-2 text-red-600'>
            12,500,000 تومان
          </p>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr
              className='text-right'
              style={{ backgroundColor: colors.light }}
            >
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                المعرف
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                رقم الطلب
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                النوع
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                المبلغ
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                التاريخ
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الحالة
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الوصف
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any) => (
              <tr key={transaction.id} className='border-b border-gray-100'>
                <td className='p-4' style={{ color: colors.gray }}>
                  #{transaction.id}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {transaction.orderId ? `#${transaction.orderId}` : "-"}
                </td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : transaction.type === "expense"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type === "income"
                      ? "إيراد"
                      : transaction.type === "expense"
                      ? "مصروف"
                      : "استرداد أموال"}
                  </span>
                </td>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {transaction.amount.toLocaleString("ar-IR")} تومان
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {transaction.date}
                </td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === "success"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.status === "success"
                      ? "ناجح"
                      : transaction.status === "pending"
                      ? "قيد الانتظار"
                      : "فاشل"}
                  </span>
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {transaction.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Financial;
