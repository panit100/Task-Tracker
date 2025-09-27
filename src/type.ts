export enum TASKTSTATUS {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface Task {
  id: number;
  description: string;
  status: TASKTSTATUS;
  createdAt: string;
  updatedAt: string;
}
