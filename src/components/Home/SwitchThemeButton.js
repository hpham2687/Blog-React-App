import React, { useState } from "react";
import { Toggle } from "@ahaui/react";
import { toggleMode, useTheme } from "../../context/ThemeContext";
export default function SwitchThemeButton() {
  const [isDarkMode, setIsDarkMode] = useTheme();

  return (
    <>
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
    </>
  );
}
