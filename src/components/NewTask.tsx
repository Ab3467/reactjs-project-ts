import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "./ui/button";

// Define the type for the props
type NewTaskProps = {
  onAdd: (task: string) => void;
};

const NewTask: React.FC<NewTaskProps> = ({ onAdd }) => {
  const [enteredTask, setEnteredTask] = useState<string>("");

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(enteredTask);
    setEnteredTask("");
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredTask(e.target.value);
  };

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
      />
      <Button
        type="submit"
      >
        Add task
      </Button>
    </form>
  );
};

export default NewTask;
