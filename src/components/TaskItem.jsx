import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../reducers/tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, parseISO } from "date-fns";

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  margin-bottom: 8px;
  background: ${(props) =>
    props.$complete ? "var(--bg-card-done)" : "var(--bg-card)"};
  border: 1px solid
    ${(props) => (props.$complete ? "var(--border-done)" : "var(--border)")};
  border-radius: var(--radius);
  transition: all var(--transition);
  animation: taskIn 0.25s ease-out;

  &:hover {
    background: ${(props) =>
      props.$complete ? "var(--bg-card-done)" : "var(--bg-hover)"};
  }
`;

const DragHandle = styled.span`
  display: flex;
  align-items: center;
  cursor: grab;
  color: var(--text-muted);
  font-size: 14px;
  flex-shrink: 0;
  opacity: 0.4;
  transition: opacity var(--transition);
  user-select: none;
  touch-action: none;

  ${Card}:hover & {
    opacity: 0.8;
  }

  &:active {
    cursor: grabbing;
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
  border: 2px solid
    ${(props) => (props.$checked ? "var(--accent)" : "var(--border)")};
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
  color: ${(props) =>
    props.$complete ? "var(--text-done)" : "var(--text-primary)"};
  text-decoration: ${(props) => (props.$complete ? "line-through" : "none")};
  transition: color var(--transition);
`;

const MetaRow = styled.span`
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PriorityBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1px 6px;
  border-radius: 3px;
  color: ${(props) => `var(--priority-${props.$priority})`};
  background: ${(props) => `var(--priority-${props.$priority}-dim)`};
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

const PRIORITY_LABELS = { high: "high", med: "med", low: "low" };

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <Card ref={setNodeRef} style={style} $complete={task.complete}>
      <DragHandle {...attributes} {...listeners}>
        ⠿
      </DragHandle>
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
        <MetaRow>
          {task.priority && (
            <PriorityBadge $priority={task.priority}>
              {PRIORITY_LABELS[task.priority]}
            </PriorityBadge>
          )}
          <span>{format(parseISO(task.createdAt), "MMM d, HH:mm")}</span>
        </MetaRow>
      </TextGroup>
      <DeleteButton onClick={() => dispatch(deleteTask(task.id))}>
        Delete
      </DeleteButton>
    </Card>
  );
};

export default TaskItem;
