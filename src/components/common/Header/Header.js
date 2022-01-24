import { Header as AhaHeader, Icon } from "@ahaui/react";
import { useTheme } from "context/ThemeContext";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "utils/mediaQuery";
import AuthenticatedHeaderRight from "./AuthenticatedHeaderRight";
import MobileMenu from "./MobileMenu";
import UnAuthenticatedHeaderRight from "./UnAuthenticatedHeaderRight";
import { ReactComponent as MoonIcon } from "./moon-solid.svg";
import { ReactComponent as SunIcon } from "./sun-solid.svg";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useTheme();
  const { isLoggedIn } = useAuth();
  const [isOpenMobileMenu, setIsOpenMobileMenu] = React.useState(false);

  const headerRight = !isLoggedIn ? (
    <UnAuthenticatedHeaderRight />
  ) : (
    <AuthenticatedHeaderRight />
  );
  return (
    <>
      <MobileMenu
        isOpenMobileMenu={isOpenMobileMenu}
        onClose={() => setIsOpenMobileMenu(false)}
        isLoggedIn={isLoggedIn}
      />
      <StyledAhaHeader
        data-testid="header"
        style={
          isDarkMode
            ? { background: "rgba(10, 25, 41, 0.72)" }
            : { background: "white" }
        }
      >
        <StyledAhaHeader.Brand>
          <Link to="/">
            <Logo isDarkMode={isDarkMode}>KRISS BLOG</Logo>
          </Link>
        </StyledAhaHeader.Brand>
        <StyledAhaHeader.Main className="">
          <StyledAhaHeader.Right>
            <HeaderRightDesktopWrapper>{headerRight}</HeaderRightDesktopWrapper>
            <ThemeToggleButton
              isDarkMode={isDarkMode}
              onClick={() => setIsDarkMode((prev) => !prev)}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}

              <div className="DarkModeToggle-tooltip">
                Turn off the {isDarkMode ? "light" : "dark"}
              </div>
            </ThemeToggleButton>
            <HeaderRightMobileWrapper onClick={() => setIsOpenMobileMenu(true)}>
              <Icon size="medium" name="menu" />
            </HeaderRightMobileWrapper>
          </StyledAhaHeader.Right>
        </StyledAhaHeader.Main>
      </StyledAhaHeader>
    </>
  );
}

const Logo = styled.span`
  color: black;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 400;
  ${({ isDarkMode }) =>
    isDarkMode &&
    `color: white;
  `}
`;
const StyledAhaHeader = styled(AhaHeader)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  border-bottom: 1px solid #999;
`;

const HeaderRightDesktopWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 32px;
  @media ${device.mobileL} {
    display: none;
  }
`;
const HeaderRightMobileWrapper = styled.div`
  margin-left: 6px;
  svg {
    cursor: pointer;
    display: none;
  }

  @media ${device.mobileL} {
    svg {
      display: block;
    }
  }
`;

const ThemeToggleButton = styled.div`
  transition: background 0.3s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 1px solid rgb(224, 227, 231);
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  .DarkModeToggle-tooltip {
    white-space: nowrap;
    position: absolute;
    top: calc(100% + 8px);
    left: -150%;
    background: rgb(23, 58, 94);
    border-radius: 10px;
    color: white;
    padding: 6px 8px;
    display: none;
  }
  &:hover {
    .DarkModeToggle-tooltip {
      display: block;
    }
  }
  svg {
    margin: 0;
    width: 20px;
    height: 20px;
  }
`;
