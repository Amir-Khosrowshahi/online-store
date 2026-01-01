import React from "react";
import { Edit, Lock } from "react-feather";
function Customers({ colors, customers }: any) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <h2 className='text-xl font-bold mb-6' style={{ color: colors.dark }}>
        إدارة العملاء
      </h2>

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
                اسم العميل
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                البريد الإلكتروني
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الهاتف
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                تاريخ التسجيل
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الطلبات
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
            {customers.map((customer: any) => (
              <tr key={customer.id} className='border-b border-gray-100'>
                <td className='p-4' style={{ color: colors.gray }}>
                  #{customer.id}
                </td>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {customer.name}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {customer.email}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {customer.phone}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {customer.registerDate}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {customer.orders}
                </td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.status === "active" ? "نشط" : "محظور"}
                  </span>
                </td>
                <td className='p-4'>
                  <div className='flex gap-2'>
                    <button
                      className='text-blue-500 hover:text-blue-700 text-sm flex items-center'
                      title='تعديل'
                    >
                      <Edit size={14} className='ml-1' />
                      تعديل
                    </button>
                    <button
                      className={`text-sm flex items-center ${
                        customer.status === "active"
                          ? "text-red-500 hover:text-red-700"
                          : "text-green-500 hover:text-green-700"
                      }`}
                      title={
                        customer.status === "active" ? "حظر" : "إلغاء الحظر"
                      }
                    >
                      <Lock size={14} className='ml-1' />
                      {customer.status === "active" ? "حظر" : "إلغاء الحظر"}
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

export default Customers;
