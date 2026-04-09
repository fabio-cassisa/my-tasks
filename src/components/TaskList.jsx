import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import styled from "styled-components";
import { completeAllTasks } from "../reducers/tasks";

const List = styled.div`
  margin-bottom: 16px;
`;

const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-top: 1px solid var(--border);
  margin-top: 8px;
`;

const Counter = styled.span`
  font-size: 13px;
  color: var(--text-muted);
`;

const Accent = styled.span`
  color: var(--accent);
  font-weight: 600;
`;

const CompleteAllButton = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font);
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);

  &:hover {
    background: var(--accent);
    color: var(--bg-primary);
  }

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
    &:hover {
      background: var(--accent-dim);
      color: var(--accent);
    }
  }
`;

const EmptyState = styled.p`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
  font-size: 15px;
`;

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const completedCount = tasks.filter((task) => task.complete).length;
  const allDone = tasks.length > 0 && completedCount === tasks.length;

  return (
    <div>
      <List>
        {tasks.length === 0 ? (
          <EmptyState>no tasks yet — add one above</EmptyState>
        ) : (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </List>
      {tasks.length > 0 && (
        <StatusBar>
          <Counter>
            <Accent>{completedCount}</Accent> / {tasks.length} completed
          </Counter>
          <CompleteAllButton
            onClick={() => dispatch(completeAllTasks())}
            disabled={allDone}
          >
            {allDone ? "All done ✓" : "Complete all"}
          </CompleteAllButton>
        </StatusBar>
      )}
    </div>
  );
};

export default TaskList;
