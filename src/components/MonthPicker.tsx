import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
interface MonthPickerProps {
  initialDate: Date | undefined;
  onDateChange: (e: Date) => void;
  className: string;
}

const MonthPicker = ({
  initialDate = new Date(),
  onDateChange,
  className = "",
}: MonthPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [displayYear, setDisplayYear] = useState(initialDate.getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatDate = (date: Date) => {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(displayYear, monthIndex);
    setSelectedDate(newDate);
    onDateChange?.(newDate);
    setIsOpen(false);
  };

  const handleYearChange = (increment: number) => {
    setDisplayYear(displayYear + increment);
  };

  const isCurrentMonth = (monthIndex: number) => {
    const current = new Date();
    return (
      current.getMonth() === monthIndex && current.getFullYear() === displayYear
    );
  };

  const isSelectedMonth = (monthIndex: number) => {
    return (
      selectedDate.getMonth() === monthIndex &&
      selectedDate.getFullYear() === displayYear
    );
  };

  return (
    <div className={`relative w-72 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-neutral-800 border rounded-lg shadow-sm 
                   hover:border-blue-500 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500 transition-colors
                   flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span className="text-gray-300">{formatDate(selectedDate)}</span>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-gray-500 transition-transform 
                                 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute mt-2 w-full bg-neutral-800 border rounded-lg shadow-lg 
                        z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <button
              onClick={() => handleYearChange(-1)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </button>
            <span className="text-lg font-medium text-gray-300">
              {displayYear}
            </span>
            <button
              onClick={() => handleYearChange(1)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 p-4">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                className={`
                  p-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    isSelectedMonth(index)
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : isCurrentMonth(index)
                      ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      : "text-gray-3300 hover:bg-gray-900"
                  }
                `}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthPicker;
