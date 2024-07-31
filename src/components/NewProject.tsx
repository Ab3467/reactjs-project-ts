import React, { useRef, useState } from "react";
import Input from "./Input";
import Modal from "./Modal";

interface NewProjectProps {
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
  const Duedate = useRef<HTMLInputElement>(null);

  function handleSaveButton(e: React.FormEvent) {
    e.preventDefault();
    const EnteredTitle = Title.current?.value ?? "";
    const EnteredDes = Description.current?.value ?? "";
    const EnteredDueD = Duedate.current?.value ?? "";

    if (
      EnteredTitle.trim() === "" ||
      EnteredDes.trim() === "" ||
      EnteredDueD.trim() === ""
    ) {
      setIsModalOpen(true);
      return;
    }

    onAdd({
      title: EnteredTitle,
      description: EnteredDes,
      duedate: EnteredDueD,
    });

    if (Title.current) Title.current.value = "";
    if (Description.current) Description.current.value = "";
    if (Duedate.current) Duedate.current.value = "";
  }

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
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={Title} label="Title" id="title" />
          <Input
            type="textarea"
            ref={Description}
            label="Description"
            id="description"
          />
          <Input type="date" ref={Duedate} label="Due Date" id="dueDate" />
        </div>
      </form>
    </>
  );
};

export default NewProject;
