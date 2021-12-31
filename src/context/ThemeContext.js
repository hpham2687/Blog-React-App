import React, { useState } from "react";

const ThemeContext = React.createContext();
ThemeContext.displayName = "ThemeContext";

function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={[isDarkMode, setIsDarkMode]}>
      {children}
    </ThemeContext.Provider>
  );
}

const switchToDarkMode = (setIsDarkMode) => {
  setIsDarkMode(true);
};

const switchToLightMode = (setIsDarkMode) => {
  setIsDarkMode(false);
};

const toggleMode = (setIsDarkMode) => {
  setIsDarkMode((prev) => !prev);
};

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`Theme must be used within a ThemeProvider`);
  }
  return context;
}

export {
  ThemeProvider,
  useTheme,
  switchToDarkMode,
  switchToLightMode,
  toggleMode,
};
