import { useSelector, useDispatch } from "react-redux";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TaskItem from "./TaskItem";
import styled from "styled-components";
import { completeAllTasks, clearCompleted, reorderTasks } from "../reducers/tasks";

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
  animation: fadeIn 0.3s ease;
`;

const Counter = styled.span`
  font-size: 13px;
  color: var(--text-muted);
`;

const Accent = styled.span`
  color: var(--accent);
  font-weight: 600;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font);
  color: ${(props) => (props.$variant === "danger" ? "var(--danger)" : "var(--accent)")};
  background: ${(props) =>
    props.$variant === "danger" ? "var(--danger-dim)" : "var(--accent-dim)"};
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition);

  &:hover {
    background: ${(props) =>
      props.$variant === "danger" ? "var(--danger)" : "var(--accent)"};
    color: ${(props) => (props.$variant === "danger" ? "white" : "var(--bg-primary)")};
  }

  &:active {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
    &:hover {
      background: ${(props) =>
        props.$variant === "danger" ? "var(--danger-dim)" : "var(--accent-dim)"};
      color: ${(props) =>
        props.$variant === "danger" ? "var(--danger)" : "var(--accent)"};
    }
  }
`;

const EmptyState = styled.p`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-muted);
  font-size: 15px;
  animation: fadeIn 0.4s ease;
`;

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const completedCount = tasks.filter((t) => t.complete).length;
  const allDone = tasks.length > 0 && completedCount === tasks.length;
  const hasCompleted = completedCount > 0;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);
    dispatch(reorderTasks({ oldIndex, newIndex }));
  };

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <List>
            {tasks.length === 0 ? (
              <EmptyState>no tasks yet — add one above</EmptyState>
            ) : (
              tasks.map((task) => <TaskItem key={task.id} task={task} />)
            )}
          </List>
        </SortableContext>
      </DndContext>
      {tasks.length > 0 && (
        <StatusBar>
          <Counter>
            <Accent>{completedCount}</Accent> / {tasks.length} completed
          </Counter>
          <ButtonGroup>
            {hasCompleted && (
              <ActionButton
                $variant="danger"
                onClick={() => dispatch(clearCompleted())}
              >
                Clear done
              </ActionButton>
            )}
            <ActionButton
              onClick={() => dispatch(completeAllTasks())}
              disabled={allDone}
            >
              {allDone ? "All done ✓" : "Complete all"}
            </ActionButton>
          </ButtonGroup>
        </StatusBar>
      )}
    </div>
  );
};

export default TaskList;
