import { useState, useContext } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTask } from "../reducers/tasks";
import { InputRefContext } from "../App";

const Form = styled.form`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  font-size: 15px;
  font-family: var(--font);
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-dim);
  }
`;

const PriorityButton = styled.button`
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font);
  background: ${(props) => `var(--priority-${props.$priority}-dim)`};
  color: ${(props) => `var(--priority-${props.$priority})`};
  border: 1px solid transparent;
  border-radius: var(--radius);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition);
  min-width: 44px;
  text-align: center;

  &:hover {
    border-color: ${(props) => `var(--priority-${props.$priority})`};
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font);
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
  white-space: nowrap;

  &:hover {
    background: var(--accent-hover);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const PRIORITIES = ["low", "med", "high"];
const PRIORITY_LABELS = { low: "L", med: "M", high: "H" };

const AddTaskForm = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("med");
  const dispatch = useDispatch();
  const inputRef = useContext(InputRefContext);

  const cyclePriority = () => {
    const idx = PRIORITIES.indexOf(priority);
    setPriority(PRIORITIES[(idx + 1) % PRIORITIES.length]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(
      addTask({
        id: Date.now(),
        text: text.trim(),
        complete: false,
        priority,
      })
    );
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="add a new task… ⌘K"
      />
      <PriorityButton
        type="button"
        $priority={priority}
        onClick={cyclePriority}
        title={`priority: ${priority} — click to cycle`}
      >
        {PRIORITY_LABELS[priority]}
      </PriorityButton>
      <SubmitButton type="submit">Add</SubmitButton>
    </Form>
  );
};

export default AddTaskForm;
