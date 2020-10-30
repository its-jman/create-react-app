import styled, { createGlobalStyle } from "styled-components/macro";

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: var(--grey-0);
  }
`;

export const Wrapper = styled.div``;

export const MainContainer = styled.div`
  background-color: var(--blue-8);
`;

export const Sidebar = styled.div`
  width: 24px;
  background-color: var(--grey-8);
`;

export const Header = styled.div`
  height: 24px;
  background-color: var(--grey-9);
`;
