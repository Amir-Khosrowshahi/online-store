import React from "react";
import { Search, Plus, Edit, Trash } from "react-feather";
function Products({
  colors,
  searchQuery,
  setSearchQuery,
  setCurrentProduct,
  setShowProductModal,
  filteredProducts,
}: any) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
        <h2 className='text-xl font-bold' style={{ color: colors.dark }}>
          إدارة المنتجات
        </h2>
        <div className='mt-4 md:mt-0 flex flex-col sm:flex-row gap-3'>
          <div className='relative'>
            <input
              type='text'
              placeholder='البحث في المنتجات...'
              className='border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
              style={{ backgroundColor: colors.light }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={18}
              className='absolute left-3 top-3'
              style={{ color: colors.gray }}
            />
          </div>
          <button
            className='px-4 py-2 rounded-lg text-sm font-medium flex items-center'
            style={{
              backgroundColor: colors.primary,
              color: colors.light,
            }}
            onClick={() => {
              setCurrentProduct(null);
              setShowProductModal(true);
            }}
          >
            <Plus size={16} className='ml-1' />
            إضافة منتج
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
                المعرف
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                اسم المنتج
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                الفئة
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                السعر
              </th>
              <th className='p-4 font-medium' style={{ color: colors.gray }}>
                المخزون
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
            {filteredProducts.map((product: any) => (
              <tr key={product.id} className='border-b border-gray-100'>
                <td className='p-4' style={{ color: colors.gray }}>
                  #{product.id}
                </td>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {product.name}
                </td>
                <td className='p-4' style={{ color: colors.gray }}>
                  {product.category}
                </td>
                <td className='p-4 font-medium' style={{ color: colors.dark }}>
                  {product.price.toLocaleString("ar-IR")} تومان
                </td>
                <td className='p-4'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > product.minStock
                        ? "bg-green-100 text-green-800"
                        : product.stock > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock} قطعة
                  </span>
                </td>
                <td className='p-4'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {product.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </td>
                <td className='p-4'>
                  <div className='flex gap-2'>
                    <button
                      className='text-blue-500 hover:text-blue-700 text-sm flex items-center'
                      title='تعديل'
                      onClick={() => {
                        setCurrentProduct(product);
                        setShowProductModal(true);
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

export default Products;
