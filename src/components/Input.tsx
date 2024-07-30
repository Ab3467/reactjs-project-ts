import { forwardRef, TextareaHTMLAttributes, InputHTMLAttributes, Ref } from 'react';

// Define a type for the props, differentiating between input and textarea
type InputProps = {
  label: string;
  textarea?: boolean;
} & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  function Input({ label, textarea, ...props }, ref) {
    // Use ref typecasting based on whether it's textarea or input
    const isTextArea = textarea;

    return (
      <div className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">
          {label}
        </label>
        {isTextArea ? (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-300 text-stone-600 focus:outline-none focus:border-stone-600"
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as Ref<HTMLInputElement>}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-300 text-stone-600 focus:outline-none focus:border-stone-600"
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    );
  }
);

export default Input;
