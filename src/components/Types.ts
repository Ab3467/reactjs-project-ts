// Define types for project and task
export type Project = {
    id: number;
    title: string;
    description: string;
    duedate: string;
  };
  
  export type Task = {
    id: number;
    text: string;
    ProId: number | undefined | null; // Allow null if needed
  };
  
  