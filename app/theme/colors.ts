// src/themes/colors.ts
export const lightTheme = {
  primary: "#3498db",
  primaryDark: "#2980b9",
  secondary: "#e74c3c",
  secondaryDark: "#c0392b",
  background: "#ecf0f1",
  surface: "#ffffff",
  text: "#2c3e50",
  textLight: "#7f8c8d",
  accent: "#f39c12",
  error: "#e74c3c",
  disabled: "#bdc3c7",
};

export const darkTheme = {
  primary: "#6da5c0",
  primaryLight: "#5dade2",
  secondary: "#e74c3c",
  secondaryLight: "#ec7063",
  background: "#05161a",
  surface: "#34495e",
  text: "#ecf0f1",
  textDark: "#bdc3c7",
  accent: "#5da5c0",
  error: "#e74c3c",
  disabled: "#7f8c8d",
};

export type Theme = typeof lightTheme;