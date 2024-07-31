import React from 'react';
import { Calendar } from '@/components/ui/calendar'; // Adjust the import based on your file structure

interface CalendarInputProps {
  label: string;
  id: string;
  onSelectDate: (date: string) => void;
}

const CalendarInput: React.FC<CalendarInputProps> = ({ label, id, onSelectDate }) => {
  // Function to handle date changes
  const handleDateChange = (date: Date) => {
    console.log("Selected date:", date); // Debug statement
    const formattedDate = date.toISOString().split('T')[0];
    onSelectDate(formattedDate);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 text-stone-500 font-bold">
        {label}
      </label>
      <Calendar 
        id={id} 
        onDayClick={(date) => handleDateChange(date as Date)} 
        className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800" 
      />
    </div>
  );
};

export default CalendarInput;
