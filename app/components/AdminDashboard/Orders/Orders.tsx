import React from "react";
import { Filter, Printer, RefreshCw } from "react-feather";
function Orders({ colors, orders, openOrderDetailModal }: any) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
        <h2 className='text-xl font-bold' style={{ color: colors.dark }}>
          إدارة الطلبات
        </h2>
        <div className='mt-4 md:mt-0 flex items-center gap-3'>
          <div className='flex items-center border border-gray-300 rounded-lg px-3 py-2'>
            <Filter size={16} className='ml-1' style={{ color: colors.gray }} />
            <select
              className='focus:outline-none text-sm'
              style={{ color: colors.dark }}
            >
              <option>جميع الحالات</option>
              <option>في انتظار الدفع</option>
              <option>قيد المعالجة</option>
              <option>جاهز للإرسال</option>
              <option>تم الإرسال</option>
              <option>تم التسليم</option>
              <option>ملغى</option>
            </select>
          </div>
          <button
            className='px-3 py-2 rounded-lg border border-gray-300 text-sm flex items-center'
            style={{ color: colors.primary }}
          >
            <Printer size={16} className='ml-1' />
            طباعة الفاتورة
          </button>
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
                رقم الطلب
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                العميل
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                التاريخ
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الحالة
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                المبلغ
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الدفع
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                التتبع
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id} className='border-b border-gray-100'>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  #{order.id}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {order.customer}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {order.date}
                </td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "ready"
                        ? "bg-purple-100 text-purple-800"
                        : order.status === "processing"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "pending"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status === "delivered"
                      ? "تم التسليم"
                      : order.status === "shipped"
                      ? "تم الإرسال"
                      : order.status === "ready"
                      ? "جاهز للإرسال"
                      : order.status === "processing"
                      ? "قيد المعالجة"
                      : order.status === "pending"
                      ? "في انتظار الدفع"
                      : "ملغى"}
                  </span>
                </td>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {order.total.toLocaleString("ar-IR")} تومان
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {order.payment}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {order.trackingCode || "-"}
                </td>
                <td className='p-4'>
                  <div className='flex gap-2'>
                    <button
                      className='text-blue-500 hover:text-blue-700 text-sm flex items-center'
                      onClick={() => openOrderDetailModal(order)}
                    >
                      التفاصيل
                    </button>

                    <button
                      className='text-green-500 hover:text-green-700 text-sm flex items-center'
                      title='تغيير الحالة'
                    >
                      <RefreshCw size={14} className='ml-1' />
                      الحالة
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

export default Orders;
