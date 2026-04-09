import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTask } from "../reducers/tasks";

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

const Button = styled.button`
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

const AddTaskForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTask({ id: Date.now(), text, complete: false }));
    setText("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="add a new task..."
      />
      <Button type="submit">Add</Button>
    </Form>
  );
};

export default AddTaskForm;
