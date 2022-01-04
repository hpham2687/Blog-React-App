import { PageLayout } from "@ahaui/react";
import React from "react";
import Header from "../Header/Header";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

export default function Layout({ children }) {
  const [isDarkMode] = useTheme();

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
