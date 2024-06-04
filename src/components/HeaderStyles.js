import styled from 'styled-components';

export const StyledHeader = styled.header`
  background: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;

  nav a {
    color: #fff;
    margin: 0 1rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
