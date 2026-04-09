import { createSlice } from "@reduxjs/toolkit";
import { subDays } from "date-fns";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [
    {
      id: 1,
      text: "Learn Redux Toolkit basics",
      complete: true,
      createdAt: subDays(new Date(), 5).toISOString(),
    },
    {
      id: 2,
      text: "Build a todo app with actions & reducers",
      complete: true,
      createdAt: subDays(new Date(), 3).toISOString(),
    },
    {
      id: 3,
      text: "Add timestamps to tasks",
      complete: true,
      createdAt: subDays(new Date(), 1).toISOString(),
    },
    {
      id: 4,
      text: "Dark theme glow-up",
      complete: false,
      createdAt: new Date().toISOString(),
    },
  ],
  reducers: {
    addTask: (state, action) => {
      state.push({ ...action.payload, createdAt: new Date().toISOString() });
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.complete = !task.complete;
      }
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    completeAllTasks: (state) => {
      state.forEach((task) => {
        task.complete = true;
      });
    },
  },
});

export const { addTask, toggleTask, deleteTask, completeAllTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
