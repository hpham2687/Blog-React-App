import React, { useState } from "react";
import { Toggle } from "@ahaui/react";
import { toggleMode, useTheme } from "../../context/ThemeContext";
import styled from "styled-components";
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
          // setChecked(!checked)
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
