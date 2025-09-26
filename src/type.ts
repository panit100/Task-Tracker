enum TASKTYPE {
  TODO,
  INPROGRESS,
  DONE,
}

interface Task {
  id: number;
  description: string;
  status: TASKTYPE;
  createdAt: string;
  updatedAt: string;
}
