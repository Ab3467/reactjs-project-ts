// TextareaInput.tsx
import React from 'react';
import { Textarea } from "./ui/textarea" // Adjust the import based on your file structure

interface TextAreaInputProps {
  label: string;
  id: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ label, id, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 text-stone-500 font-bold">
        {label}
      </label>
      <Textarea
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800"
      />
    </div>
  );
};

export default TextAreaInput;
