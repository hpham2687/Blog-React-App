import { PageLayout } from "@ahaui/react";
import React from "react";
import Header from "../Header/Header";

export default function Layout({ children }) {
  return (
    <PageLayout>
      <PageLayout.Header>
        <Header />
      </PageLayout.Header>
      <PageLayout.Body
        style={{ paddingTop: "64px" }}
        id="page-container-body"
        className={`u-backgroundLightest u-flexColumn`}
      >
        {children}
      </PageLayout.Body>
      <PageLayout.Footer className="u-backgroundPositiveLight">
        <div className="Container">Footer</div>
      </PageLayout.Footer>
    </PageLayout>
  );
}
