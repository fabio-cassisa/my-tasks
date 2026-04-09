import styled from "styled-components";

const StyledHeader = styled.header`
  text-align: center;
  padding: 20px;
  margin-bottom: 24px;
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

const Header = () => {
  return (
    <StyledHeader>
      <Title>my tasks</Title>
      <Subtitle>stay on track</Subtitle>
    </StyledHeader>
  );
};

export default Header;
