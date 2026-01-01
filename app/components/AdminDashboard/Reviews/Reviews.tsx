import React from "react";
import { Star, FileText, Trash, CheckCircle } from "react-feather";
function Reviews({ colors, reviews }: any) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <h2 className='text-xl font-bold mb-6' style={{ color: colors.dark }}>
        إدارة التقييمات والآراء
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
                المنتج
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                العميل
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                التقييم
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                التاريخ
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
            {reviews.map((review: any) => (
              <tr key={review.id} className='border-b border-gray-100'>
                <td className='p-4' style={{ color: colors.gray }}>
                  #{review.id}
                </td>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {review.product}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {review.customer}
                </td>
                <td className='p-4'>
                  <div className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {review.date}
                </td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      review.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : review.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {review.status === "approved"
                      ? "تم الموافقة"
                      : review.status === "pending"
                      ? "في انتظار الموافقة"
                      : "مرفوض"}
                  </span>
                </td>
                <td className='p-4'>
                  <div className='flex gap-2'>
                    <button
                      className='text-blue-500 hover:text-blue-700 text-sm flex items-center'
                      title='عرض'
                    >
                      <FileText size={14} className='ml-1' />
                      عرض
                    </button>
                    {review.status === "pending" && (
                      <>
                        <button
                          className='text-green-500 hover:text-green-700 text-sm flex items-center'
                          title='موافقة'
                        >
                          <CheckCircle size={14} className='ml-1' />
                          موافقة
                        </button>
                        <button
                          className='text-red-500 hover:text-red-700 text-sm flex items-center'
                          title='رفض'
                        >
                          <Trash size={14} className='ml-1' />
                          رفض
                        </button>
                      </>
                    )}
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

export default Reviews;
