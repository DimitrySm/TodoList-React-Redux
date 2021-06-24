import { v1 } from "uuid";
import { TasksStateType } from "../App";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};
export type AddTaskActionType = {
  type: "ADD-TASK";
  todolistId: string;
  title: string;
};
export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  todolistId: string;
  isDone: boolean;
};
export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  todolistId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      let tasks = stateCopy[action.todolistId];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      let tasks = stateCopy[action.todolistId];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };

      stateCopy[action.todolistId] = [];

      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      throw new Error("I don't understand this type");
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId };
};

export const addTaskAC = (
  todolistId: string,
  title: string
): AddTaskActionType => {
  return { type: "ADD-TASK", todolistId: todolistId, title: title };
};

export const changeTaskStatusAC = (
  todolistId: string,
  taskId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return {
    type: "CHANGE-TASK-STATUS",
    todolistId: todolistId,
    taskId: taskId,
    isDone: isDone,
  };
};

export const changeTaskTitleAC = (
  todolistId: string,
  taskId: string,
  title: string
): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    todolistId: todolistId,
    taskId: taskId,
    title: title,
  };
};
