import React from "react";

interface InputProps {
  type: string;
  label: string;
  id: string;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ type, label, id }, ref) => {
    if (type === "textarea") {
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block mb-1 text-stone-500 font-bold">
            {label}
          </label>
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800"
          />
        </div>
      );
    }

    return (
      <div className="mb-4">
        <label htmlFor={id} className="block mb-1 text-stone-500 font-bold">
          {label}
        </label>
        <input
          type={type}
          id={id}
          ref={ref as React.Ref<HTMLInputElement>}
          className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800"
        />
      </div>
    );
  }
);

export default Input;
