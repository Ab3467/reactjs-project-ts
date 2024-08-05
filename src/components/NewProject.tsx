import React, { useState } from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import Modal from "./Modal";
import { Button } from "./ui/button";
import { DayPicker, DayPickerProps } from "react-day-picker";
import "react-day-picker/dist/style.css";

type NewProjectProps = {
  onAdd: (projectData: {
    title: string;
    description: string;
    duedate: string;
  }) => void;
  onCancel: () => void;
}

const NewProject: React.FC<NewProjectProps> = ({ onAdd, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  function handleSaveButton(e: React.FormEvent) {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "" || dueDate.trim() === "") {
      setIsModalOpen(true);
      return;
    }

    onAdd({
      title,
      description,
      duedate: dueDate,
    });

    // Clear form fields
    setTitle("");
    setDescription("");
    setDueDate("");
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleDayClick = (date: Date) => {
    setDueDate(formatDate(date));
  };

  const dayPickerInitialProps: DayPickerProps = {
    mode: "single",
    selected: dueDate ? new Date(dueDate) : undefined,
    onDayClick: handleDayClick,
  };

  return (
    <>
      <Modal 
        btnCaption="Ok"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invalid Input"
        message="Oops... Looks like you forgot to enter a value. Please make sure you provided a valid value for every input field."
      />
      <form className="w-[35rem] mt-16" onSubmit={handleSaveButton}>
        <ul className="flex items-center justify-end gap-4 my-4">
          <li>
            <Button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
          </li>
          <li>
            <Button
              type="submit"
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              variant="default"
            >
              Save
            </Button>
          </li>
        </ul>
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 text-stone-500 font-bold">
              Title
            </label>
            <ShadcnInput
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 text-stone-500 font-bold">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800 resize-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dueDate" className="block mb-1 text-stone-500 font-bold">
              Due Date
            </label>
            <DayPicker {...dayPickerInitialProps} />
          </div>
        </div>
      </form>
    </>
  );
};

export default NewProject;
