import React from "react";

function Search() {
  return (
    <div className='flex items-center rounded-lg overflow-hidden w-full h-[44px] '>
      <input
        type='text'
        placeholder='ابحث في المتجر...'
        className='w-full px-4 text-sm text-gray-800 focus:outline-none  w-full h-full !bg-[#f0f0f1]'
      />
    </div>
  );
}

export default Search;
