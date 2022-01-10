import { Header as AhaHeader, Logo, SafeAnchor, Icon } from "@ahaui/react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import { device } from "../../utils/mediaQuery";
import SwitchThemeButton from "../Home/SwitchThemeButton";
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
      {isOpenMobileMenu && (
        <MobileMenu
          onClose={() => setIsOpenMobileMenu(false)}
          isLoggedIn={isLoggedIn}
        />
      )}
      <StyledAhaHeader
        className={isDarkMode ? "u-backgroundDark" : "u-backgroundWhite"}
      >
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
