import React, { useState } from 'react';

const DropdownMenu = ({ handleTimeRangeButtonClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
        >
          Select Time Range
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right right-0 w-48 rounded-md shadow-lg">
          <div className="bg-white rounded-md shadow-xs w-48 absolute z-20">
            <button
              onClick={() => {
                handleTimeRangeButtonClick('pastHour');
                toggleDropdown();
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Past Hour
            </button>
            <button
              onClick={() => {
                handleTimeRangeButtonClick('pastDay');
                toggleDropdown();
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Past Day
            </button>
            <button
              onClick={() => {
                handleTimeRangeButtonClick('pastWeek');
                toggleDropdown();
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Past Week
            </button>
            <button
              onClick={() => {
                handleTimeRangeButtonClick('pastMonth');
                toggleDropdown();
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Past Month
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
