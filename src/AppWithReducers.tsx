/* eslint-disable eqeqeq */
import React, { useReducer } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ],
  });

  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatchToTasks(action);
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC(todolistId, title);
    dispatchToTasks(action);
  }

  function changeStatus(id: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(todolistId, id, isDone);
    dispatchToTasks(action);
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(todolistId, id, newTitle);
    dispatchToTasks(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value);
    dispatchToTodolists(action);
  }

  function removeTodolist(id: string) {
    const action = removeTodolistAC(id);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  }

  function changeTodolistTitle(id: string, title: string) {
    const action = changeTodolistTitleAC(id, title);
    dispatchToTodolists(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.isDone === false
              );
            }
            if (tl.filter === "completed") {
              tasksForTodolist = allTodolistTasks.filter(
                (t) => t.isDone === true
              );
            }

            return (
              <Grid item>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
