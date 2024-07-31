import React, { useRef, useState } from "react";
import { Input as ShadcnInput } from "@/components/ui/input"; // Adjust the import path if necessary
import Modal from "./Modal";
import { Button } from "./ui/button"; // Adjust the import path if necessary
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
  const Title = useRef<HTMLInputElement>(null);
  const Description = useRef<HTMLTextAreaElement>(null);
  const [dueDate, setDueDate] = useState<string>("");

  function handleSaveButton(e: React.FormEvent) {
    e.preventDefault(); // Prevents default form submission

    const EnteredTitle = Title.current?.value ?? "";
    const EnteredDes = Description.current?.value ?? "";

    if (
      EnteredTitle.trim() === "" ||
      EnteredDes.trim() === "" ||
      dueDate.trim() === ""
    ) {
      setIsModalOpen(true);
      return;
    }

    onAdd({
      title: EnteredTitle,
      description: EnteredDes,
      duedate: dueDate,
    });

    // Reset form fields
    if (Title.current) Title.current.value = "";
    if (Description.current) Description.current.value = "";
    setDueDate("");
  }

  const dayPickerInitialProps: DayPickerProps = {
    mode: "single",
    selected: dueDate ? new Date(dueDate) : undefined,
    onSelect: (date: Date | undefined) =>
      setDueDate(date ? date.toISOString().split("T")[0] : ""),
  };

  return (
    <>
      <Modal
        btnCaption="Ok"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <form className="w-[35rem] mt-16" onSubmit={handleSaveButton}>
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <Button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </Button>
          </li>
          <li>
            <Button
              type="submit"
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </Button>
          </li>
        </menu>
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 text-stone-500 font-bold">
              Title
            </label>
            <ShadcnInput
              type="text"
              id="title"
              ref={Title}
              className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 text-stone-500 font-bold">
              Description
            </label>
            <textarea
              id="description"
              ref={Description}
              className="w-full px-4 py-2 rounded-md bg-stone-100 text-stone-800"
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
