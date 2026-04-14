import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { useRef, useEffect, createContext } from "react";
import store from "./store";
import { useTheme } from "./hooks/useTheme";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import styled from "styled-components";

export const ThemeContext = createContext();
export const InputRefContext = createContext();

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

// inner component that can use useSelector (inside Provider)
const AppInner = () => {
  const { theme, toggleTheme } = useTheme();
  const inputRef = useRef(null);
  const tasks = useSelector((state) => state.tasks);

  useKeyboardShortcuts({ onToggleTheme: toggleTheme, inputRef });

  // dynamic tab title
  useEffect(() => {
    const remaining = tasks.filter((t) => !t.complete).length;
    document.title = remaining > 0 ? `(${remaining}) my tasks` : "my tasks";
  }, [tasks]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <InputRefContext.Provider value={inputRef}>
        <Shell>
          <Header />
          <Main>
            <AddTaskForm />
            <TaskList />
          </Main>
          <Footer />
        </Shell>
      </InputRefContext.Provider>
    </ThemeContext.Provider>
  );
};

const App = () => (
  <Provider store={store}>
    <AppInner />
  </Provider>
);

export default App;
