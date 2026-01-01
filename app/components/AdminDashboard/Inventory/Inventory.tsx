import React from "react";
import { ChevronDown, AlertCircle } from "react-feather";
function Inventory({ colors, products, inventoryLogs }: any) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <h2 className='text-xl font-bold mb-6' style={{ color: colors.dark }}>
        إدارة المخزون والمستودع
      </h2>

      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <h3 className='font-medium' style={{ color: colors.dark }}>
            تنبيهات نقص المخزون
          </h3>
          <button
            className='text-sm flex items-center'
            style={{ color: colors.primary }}
          >
            عرض الكل
            <ChevronDown size={16} className='mr-1 transform rotate-270' />
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {products
            .filter((p: any) => p.stock <= p.minStock)
            .slice(0, 3)
            .map((product: any) => (
              <div
                key={product.id}
                className='border border-red-200 rounded-lg p-4 bg-red-50'
              >
                <div className='flex justify-between'>
                  <h4 className='font-medium'>{product.name}</h4>
                  <AlertCircle size={18} className='text-red-500' />
                </div>
                <div className='mt-2'>
                  <span className='text-sm'>المخزون: </span>
                  <span className='font-medium text-red-600'>
                    {product.stock} قطعة
                  </span>
                </div>
                <div className='mt-1'>
                  <span className='text-sm'>الحد الأدنى للمخزون: </span>
                  <span className='font-medium'>{product.minStock} قطعة</span>
                </div>
              </div>
            ))}
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
                التاريخ
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                المنتج
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                نوع العملية
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الكمية
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                السبب
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                المسجل
              </th>
            </tr>
          </thead>
          <tbody>
            {inventoryLogs.map((log: any) => (
              <tr key={log.id} className='border-b border-gray-100'>
                <td className='p-4' style={{ color: colors.gray }}>
                  {log.date}
                </td>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {log.product}
                </td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      log.type === "in"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {log.type === "in" ? "دخول" : "خروج"}
                  </span>
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {log.quantity}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {log.reason}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {log.operator}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
