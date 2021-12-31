import { Header as AhaHeader, Logo, SafeAnchor } from "@ahaui/react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import SwitchThemeButton from "../Home/SwitchThemeButton";
import AuthenticatedHeaderRight from "./AuthenticatedHeaderRight";
import UnAuthenticatedHeaderRight from "./UnAuthenticatedHeaderRight";

const StyledAhaHeader = styled(AhaHeader)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export default function Header() {
  const [isDarkMode] = useTheme();
  const { isLoggedIn } = useAuth();

  const headerRight = !isLoggedIn ? (
    <UnAuthenticatedHeaderRight />
  ) : (
    <AuthenticatedHeaderRight />
  );
  return (
    <StyledAhaHeader
      className={isDarkMode ? "u-backgroundDark" : "u-backgroundWhite"}
    >
      {/* // TODO ko co cach nao override the a href */}
      <StyledAhaHeader.Brand>
        <Link to="/">
          <Logo
            href="/"
            as={SafeAnchor}
            src="https://raw.githubusercontent.com/gotitinc/aha-assets/master/origin/ahaui-logo-with-text.svg"
            variant="original"
            height={32}
          />
        </Link>
      </StyledAhaHeader.Brand>
      <StyledAhaHeader.Main className="">
        {/* <StyledAhaHeader.Left>
          <div className="u-paddingHorizontalLarge">LEFT</div>
        </StyledAhaHeader.Left> */}
        <StyledAhaHeader.Right>
          <div className="u-paddingHorizontalLarge">{headerRight}</div>
        </StyledAhaHeader.Right>
      </StyledAhaHeader.Main>
      <StyledAhaHeader.AbsoluteCenter>
        <SwitchThemeButton />
      </StyledAhaHeader.AbsoluteCenter>
    </StyledAhaHeader>
  );
}
