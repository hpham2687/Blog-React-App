import { Header as AhaHeader, Icon } from "@ahaui/react";
import SwitchThemeButton from "components/Header/SwitchThemeButton";
import { useTheme } from "context/ThemeContext";
import { useAuth } from "hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "utils/mediaQuery";
import AuthenticatedHeaderRight from "./AuthenticatedHeaderRight";
import MobileMenu from "./MobileMenu";
import UnAuthenticatedHeaderRight from "./UnAuthenticatedHeaderRight";

export default function Header() {
  const [isDarkMode] = useTheme();
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
        className={isDarkMode ? "u-backgroundDark" : "u-backgroundWhite"}
      >
        <StyledAhaHeader.Brand>
          <Link to="/">
            <Logo isDarkMode={isDarkMode}>KRISS BLOG</Logo>
          </Link>
        </StyledAhaHeader.Brand>
        <StyledAhaHeader.Main className="">
          {/* <StyledAhaHeader.Left>
          <div className="u-paddingHorizontalLarge">LEFT</div>
        </StyledAhaHeader.Left> */}
          <StyledAhaHeader.Right>
            <HeaderRightDesktopWrapper>{headerRight}</HeaderRightDesktopWrapper>
            <HeaderRightMobileWrapper onClick={() => setIsOpenMobileMenu(true)}>
              <Icon size="medium" name="menu" />
            </HeaderRightMobileWrapper>
          </StyledAhaHeader.Right>
        </StyledAhaHeader.Main>

        <StyledAhaHeader.AbsoluteCenter>
          <SwitchThemeButton />
        </StyledAhaHeader.AbsoluteCenter>
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
  padding-left: 32px;
  padding-right: 32px;
  @media ${device.mobileL} {
    display: none;
  }
`;
const HeaderRightMobileWrapper = styled.div`
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
