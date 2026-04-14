import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/tasks";

const STORAGE_KEY = "my-tasks-state";

// load persisted state from localStorage
const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

// save state to localStorage on every dispatch
const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch {
    // quota exceeded or private browsing — fail silently
  }
  return result;
};

const reducer = combineReducers({
  tasks: tasksReducer,
});

const store = configureStore({
  reducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export default store;
