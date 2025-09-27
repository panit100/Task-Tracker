export enum TASKTSTATUS {
  TODO,
  INPROGRESS,
  DONE,
}

export interface Task {
  id: number;
  description: string;
  status: TASKTSTATUS;
  createdAt: string;
  updatedAt: string;
}
