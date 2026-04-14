import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    },
    toggleTask: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.complete = !task.complete;
    },
    deleteTask: (state, action) => {
      return state.filter((t) => t.id !== action.payload);
    },
    completeAllTasks: (state) => {
      state.forEach((t) => {
        t.complete = true;
      });
    },
    clearCompleted: (state) => {
      return state.filter((t) => !t.complete);
    },
    reorderTasks: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      const [moved] = state.splice(oldIndex, 1);
      state.splice(newIndex, 0, moved);
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  completeAllTasks,
  clearCompleted,
  reorderTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
