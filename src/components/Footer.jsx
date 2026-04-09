import styled from "styled-components";

const StyledFooter = styled.footer`
  text-align: center;
  padding: 24px 0 8px;
  font-size: 13px;
  color: var(--text-muted);

  a {
    color: var(--text-muted);
    text-decoration: none;
    transition: color var(--transition);

    &:hover {
      color: var(--accent);
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        built by{" "}
        <a href="https://github.com/Calleobe">Carl Öberg</a> &{" "}
        <a href="https://github.com/fabio-cassisa">Fabio Cassisa</a>
      </p>
    </StyledFooter>
  );
};

export default Footer;
