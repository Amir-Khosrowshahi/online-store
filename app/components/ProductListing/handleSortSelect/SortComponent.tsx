"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

const SortComponent = () => {
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("الأكثر مشاهدة");

  const sortOptions = [
    "الأكثر مشاهدة",
    "الأكثر مبيعاً",
    "الأحدث",
    "الأقل سعراً",
    "الأعلى سعراً",
    "أسرع شحن",
    "عروض مذهلة",
  ];

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setMobileSortOpen(false);
  };

  return (
    <div className='bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-col sm:flex-row items-center justify-between border border-gray-200'>
      <div className='w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-0'>
        <div className='text-sm text-gray-500 flex items-center'>
          <span className='text-gray-700 font-medium'>۱۲۸۷ منتج</span>
          <span className='mx-2 text-gray-300 hidden sm:inline'>|</span>
          <span className='hidden sm:inline'>الترتيب:</span>
        </div>

        {/* قائمة الترتيب - نسخة الجوال */}
        <div className='sm:hidden w-full relative'>
          <button
            className='w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700'
            onClick={() => setMobileSortOpen(!mobileSortOpen)}
          >
            <span>{selectedSort}</span>
            {mobileSortOpen ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>

          {mobileSortOpen && (
            <div className='absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg'>
              <ul className='py-1'>
                {sortOptions.map((option) => (
                  <li key={option}>
                    <button
                      className={`w-full text-right px-4 py-2 text-sm ${
                        selectedSort === option
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => handleSortSelect(option)}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* قائمة الترتيب - نسخة سطح المكتب */}
        <ul className='hidden sm:flex items-center flex-wrap gap-1 ml-2'>
          {sortOptions.map((option) => (
            <li key={option}>
              <button
                className={`px-3 py-1 text-[12px] rounded-lg transition-colors ${
                  selectedSort === option ? "text-[#f15668]" : "text-gray-700"
                }`}
                onClick={() => setSelectedSort(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortComponent;
