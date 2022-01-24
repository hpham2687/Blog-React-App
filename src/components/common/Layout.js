import { PageLayout } from "@ahaui/react";
import React from "react";
import Header from "components/common/Header/Header";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <Header />
      </PageLayout.Header>
      <StyledPageLayoutBody
        id="page-container-body"
        style={{ paddingTop: "69px" }}
        className={`u-backgroundLightest u-flexColumn`}
      >
        {children}
      </StyledPageLayoutBody>
      <StyledPageFooter>
        <div className="footer-content">
          Contact us - <a href="http://facebook.com/krysspham">Kriss Pham</a>
        </div>
      </StyledPageFooter>
    </PageLayout>
  );
}

const StyledPageFooter = styled(PageLayout.Footer)`
  .footer-content {
    text-align: center;
    color: var(--colorPrimary);
  }
  border-top: 1px dashed #dfe1e6;
  padding: 12px;
`;
const StyledPageLayoutBody = styled(PageLayout.Body)`
  padding-top: 64px;
`;
