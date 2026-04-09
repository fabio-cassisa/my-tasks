import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/tasks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import styled from "styled-components";

const Shell = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 24px 16px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const reducer = combineReducers({
  tasks: tasksReducer,
});

const store = configureStore({ reducer });

const App = () => {
  return (
    <Provider store={store}>
      <Shell>
        <Header />
        <Main>
          <AddTaskForm />
          <TaskList />
        </Main>
        <Footer />
      </Shell>
    </Provider>
  );
};

export default App;
