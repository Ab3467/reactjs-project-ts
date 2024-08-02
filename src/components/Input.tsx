import React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";

type InputProps = {
  type: "text" | "textarea" | "date";
  label: string;
  id: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ type, label, id, value, onChange }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block mb-1 text-stone-500 font-bold">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            rows={4} // Specify the number of rows
          />
        ) : (
          <ShadcnInput
            type={type}
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    );
  }
);

  

export default Input;
