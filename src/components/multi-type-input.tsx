import React from "react";

type InputProps = {
  type: "text" | "date";
  label: string;
  id: string;
  value?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input: React.FC<InputProps> = ({ type, label, id, value, name, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 text-stone-500 font-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800"
      />
    </div>
  );
};

export default Input;
