import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../reducers/tasks";
import { format, parseISO } from "date-fns";

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  margin-bottom: 8px;
  background: ${(props) => (props.$complete ? "var(--bg-card-done)" : "var(--bg-card)")};
  border: 1px solid ${(props) => (props.$complete ? "var(--border-done)" : "var(--border)")};
  border-radius: var(--radius);
  transition: all var(--transition);

  &:hover {
    background: ${(props) => (props.$complete ? "var(--bg-card-done)" : "var(--bg-hover)")};
  }
`;

const CheckboxWrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.span`
  width: 22px;
  height: 22px;
  border-radius: var(--radius-sm);
  border: 2px solid ${(props) => (props.$checked ? "var(--accent)" : "var(--border)")};
  background: ${(props) => (props.$checked ? "var(--accent)" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);

  &::after {
    content: "${(props) => (props.$checked ? "✓" : "")}";
    color: var(--bg-primary);
    font-size: 14px;
    font-weight: 700;
  }

  ${CheckboxWrapper}:hover & {
    border-color: var(--accent);
  }
`;

const TextGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

const TaskText = styled.span`
  display: block;
  font-size: 15px;
  line-height: 1.4;
  overflow-wrap: break-word;
  color: ${(props) => (props.$complete ? "var(--text-done)" : "var(--text-primary)")};
  text-decoration: ${(props) => (props.$complete ? "line-through" : "none")};
  transition: color var(--transition);
`;

const TaskDate = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
  display: block;
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font);
  color: var(--danger);
  background: var(--danger-dim);
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  flex-shrink: 0;
  transition: all var(--transition);

  &:hover {
    background: var(--danger);
    color: white;
    border-color: var(--danger);
  }
`;

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <Card $complete={task.complete}>
      <CheckboxWrapper>
        <HiddenCheckbox
          type="checkbox"
          checked={task.complete}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        <StyledCheckbox $checked={task.complete} />
      </CheckboxWrapper>
      <TextGroup>
        <TaskText $complete={task.complete}>{task.text}</TaskText>
        <TaskDate>{format(parseISO(task.createdAt), "MMM d, HH:mm")}</TaskDate>
      </TextGroup>
      <DeleteButton onClick={() => dispatch(deleteTask(task.id))}>
        Delete
      </DeleteButton>
    </Card>
  );
};

export default TaskItem;
