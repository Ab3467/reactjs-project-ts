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
  const [formValues, setFormValues] = useState({
    title: "",
    description: ""
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSaveButton(e: React.FormEvent) {
    e.preventDefault();

    const { title, description } = formValues;
    const dueDate = selectedDate;

    if (title.trim() === "" || description.trim() === "" || dueDate.trim() === "") {
      setIsModalOpen(true);
      return;
    }

    onAdd({
      title,
      description,
      duedate: dueDate,
    });

    setFormValues({
      title: "",
      description: ""
    });
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
        <menu className="flex items-center justify-end gap-4 my-4">
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
        </menu>
        <div>
          <Input
            type="text"
            id="title"
            name="title"
            label="Title"
            value={formValues.title}
            onChange={handleInputChange}
          />
          <Input
            type="textarea"
            id="description"
            name="description"
            label="Description"
            value={formValues.description}
            onChange={handleInputChange}
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
