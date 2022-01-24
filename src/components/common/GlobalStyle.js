import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
    @media (min-width: 768px) {
    }
    @media (min-width: 1024px) {
    }
  }
  body, #page-container-body, .Card, .Header {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
.Breadcrumb-item a,  a:link, a:visited {
  color: ${({ theme }) => theme.text};

}
a:link, a:visited {
  text-decoration: none;

}


`;
