export interface Project {
  id: number;
  title: string;
  description: string;
  duedate: string;
}

export interface Task {
  id: number;
  text: string;
  ProId: number | undefined;
}
