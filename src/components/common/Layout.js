import { PageLayout } from "@ahaui/react";
import React from "react";
import Header from "../Header/Header";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <Header />
      </PageLayout.Header>
      <StyledPageLayoutBody
        id="page-container-body"
        className={`u-backgroundLightest u-flexColumn`}
      >
        {children}
      </StyledPageLayoutBody>
      <PageLayout.Footer className="u-backgroundPositiveLight">
        <div className="Container">Footer</div>
      </PageLayout.Footer>
    </PageLayout>
  );
}

const StyledPageLayoutBody = styled(PageLayout.Body)`
  padding-top: 64px;
`;
