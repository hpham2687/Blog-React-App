import { Toggle } from "@ahaui/react";
import React from "react";
import styled from "styled-components";
import { toggleMode, useTheme } from "../../context/ThemeContext";
import { device } from "../../utils/mediaQuery";

export default function SwitchThemeButton() {
  const [isDarkMode, setIsDarkMode] = useTheme();

  return (
    <ToggleWrapper>
      <Toggle
        textLabelOn="Dark Mode On"
        textLabelOff="Dark Mode Off"
        className="u-marginRightSmall"
        checked={isDarkMode}
        onClick={() => {
          toggleMode(setIsDarkMode);
        }}
      />
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div`
  @media ${device.tablet} {
    display: none;
  }
`;
