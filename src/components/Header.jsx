import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../App";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-bottom: 24px;
  position: relative;
`;

const TitleGroup = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: var(--text-primary);
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 4px;
`;

const ThemeToggle = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: all var(--transition);

  &:hover {
    background: var(--bg-hover);
    border-color: var(--accent);
  }
`;

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <StyledHeader>
      <TitleGroup>
        <Title>my tasks</Title>
        <Subtitle>stay on track</Subtitle>
      </TitleGroup>
      <ThemeToggle
        onClick={toggleTheme}
        aria-label={`switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title="⌘⇧L"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </ThemeToggle>
    </StyledHeader>
  );
};

export default Header;
