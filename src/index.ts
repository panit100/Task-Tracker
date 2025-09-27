#!/usr/bin/env bun

import { TASKTSTATUS, type Task } from './type';

async function main() {
  const command = process.argv[2];
  const args = process.argv[3];
  const args2 = process.argv[4];
  switch (command) {
    case 'add':
      if (args) {
        await addTask(args);
      } else {
        console.log('Argument missing');
      }
      break;
    case 'update':
      if (args && args2) {
        await updateTask(Number(args), args2);
      } else {
        console.log('Argument missing');
      }
      break;
    case 'delete':
      if (args) {
        await deleteTask(Number(args));
      } else {
        console.log('Argument missing');
      }
      break;
    case 'mark-in-progress':
      if (args) {
        await markTask(Number(args), TASKTSTATUS.IN_PROGRESS);
      } else {
        console.log('Argument missing');
      }
      break;
    case 'mark-done':
      if (args) {
        await markTask(Number(args), TASKTSTATUS.DONE);
      } else {
        console.log('Argument missing');
      }
      break;
    case 'list':
      if (args) {
        await getTasksWithType(args as TASKTSTATUS);
      } else {
        await getTasks();
      }
      break;
    case 'help':
    default:
      help();
      break;
  }
}

async function addTask(description: string) {
  const tasks = await DataService.loadFile();
  const lastTask = tasks.at(-1);

  const newTask: Task = {
    id: lastTask ? lastTask.id + 1 : 1,
    description: description,
    status: TASKTSTATUS.TODO,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await DataService.saveFile(tasks);
}

async function updateTask(id: number, description: string) {
  const tasks = await DataService.loadFile();
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.description = description;
    (task.updatedAt = new Date().toISOString()),
      await DataService.saveFile(tasks);
  } else {
    console.log('Task not found');
  }
}

async function deleteTask(id: number) {
  let tasks = await DataService.loadFile();
  tasks = tasks.filter((task) => task.id !== id);
  await DataService.saveFile(tasks);
}

async function markTask(id: number, status: TASKTSTATUS) {
  const tasks = await DataService.loadFile();
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.status = status;
    (task.updatedAt = new Date().toISOString()),
      await DataService.saveFile(tasks);
  } else {
    console.log('Task not found');
  }
}

async function getTasks() {
  const tasks = await DataService.loadFile();
  const mapTask = tasks.map((task) => {
    return {
      id: task.id,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  });
  console.log(mapTask);
}

async function getTasksWithType(type: TASKTSTATUS) {
  let tasks = await DataService.loadFile();
  tasks = tasks.filter((task) => task.status === type);
  const mapTask = tasks.map((task) => {
    return {
      id: task.id,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  });
  console.log(mapTask);
}

function help() {
  console.log(`
    Task Tracker CLI - HELP

    Usage:
      task-cli <command> [arguments...]

    Commands:
      add               <description>                           Add a new task.
      update            <id> <description>                      Update an existing task.
      delete            <id>                                    Delete an existing task.
      mark-in-progress  <id>                                    Mark a task as in progress.
      mark-done         <id>                                    Mark a task as done.
      list                                                      List all tasks.
      list              <status : todo | in-progress | done>    List all tasks with a specific status.
      help                                                      Show this help message.
    `);
}

class DataService {
  static deleteFile() {}

  static async loadFile(): Promise<Task[]> {
    const file = Bun.file('data.json');

    if (!(await file.exists())) {
      console.log('file not found');
      return [];
    }

    const dataText = await file.text();
    const data = JSON.parse(dataText) as Task[];
    return data;
  }

  static async saveFile(data: Task[]) {
    console.log('Saving Data...');
    const dataText = JSON.stringify(data);
    await Bun.write('data.json', dataText);
    console.log('Data Saved!');
  }
}

main();
