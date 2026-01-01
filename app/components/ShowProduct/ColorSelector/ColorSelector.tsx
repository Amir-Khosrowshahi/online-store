"use client";
import React, { useState } from "react";

const colors = [
  { name: "أسود", code: "#000000" },
  { name: "أبيض", code: "#ffffff" },
  { name: "أحمر", code: "#ff0000" },
  { name: "أزرق", code: "#007bff" },
  { name: "أخضر", code: "#28a745" },
];

function ColorSelector() {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className='mb-5 mt-2'>
      <h3 className='text-sm text-gray-700 mb-2'>
        اللون: <span className='font-semibold'>{selectedColor.name}</span>
      </h3>
      <div className='flex items-center gap-3'>
        {colors.map((color) => (
          <button
            key={color.code}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 transition duration-200 ${
              selectedColor.code === color.code
                ? "border-gray-800 scale-110"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color.code }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorSelector;
