import React, { useState } from "react";
import Input from "./multi-type-input";
import Modal from "./modal";
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
};

const NewProject: React.FC<NewProjectProps> = ({ onAdd, onCancel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  function handleSaveButton(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const descriptionInput = form.elements.namedItem("description") as HTMLTextAreaElement;

    const title = titleInput.value;
    const description = descriptionInput.value;

    if (title.trim() === "" || description.trim() === "" || selectedDate.trim() === "") {
      setIsModalOpen(true);
      return;
    }

    onAdd({
      title,
      description,
      duedate: selectedDate,
    });

    form.reset(); // Reset the form
    setSelectedDate(""); // Clear the selected date
  }

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const dayPickerInitialProps: DayPickerProps = {
    mode: "single",
    selected: selectedDate ? new Date(selectedDate) : undefined,
    onSelect: (date: Date | undefined) => {
      if (date) {
        setSelectedDate(formatDate(date));
      } else {
        setSelectedDate("");
      }
    },
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
        <div className="flex items-center justify-end gap-4 my-4">
          <Button
            className="text-stone-800 hover:text-stone-950"
            onClick={onCancel}
            type="button"
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            variant="default"
          >
            Save
          </Button>
        </div>
        <div>
          <Input
            type="text"
            id="title"
            name="title"
            label="Title"
            defaultValue=""
          />
          <Input
            type="textarea"
            id="description"
            name="description"
            label="Description"
            defaultValue=""
          />
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
