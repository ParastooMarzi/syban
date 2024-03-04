// color design tokens export
export const tokensLight = {
  grey: {
    0: "#fffff02",
    10: "#f8f9fa",
    50: "#dee2e6",
    100: "#ced4da",
    200: "#adb5bd",
    300: "#868e96",
    400: "#495057",
    500: "#343a40",
    600: "#212529",
    700: "#16181b",
    800: "#000000",
    900: "#000000",
    1000: "#000000",
  },
  primary: {
    100: "#fffaed",
    200: "#fff4db",
    300: "#ffeec8",
    400: "#ffe8b6",
    500: "#ffe1a3",
    600: "#ffd98f",
    700: "#ffd27c",
    800: "#ffcb6a",
    900: "#ffc458",
  },
  secondary: {
    50: "#f5f5f5",
    100: "#e0e0e0",
    200: "#cccccc",
    300: "#b3b3b3",
    400: "#999999",
    500: "#808080",
    600: "#666666",
    700: "#4d4d4d",
    800: "#333333",
    900: "#1a1a1a",
  },
};

export const themeSettings = () => {
  return {
    palette: {
      mode: 'light',
      primary: {
        ...tokensLight.primary,
        main: tokensLight.grey[50],
        light: tokensLight.grey[100],
      },
      secondary: {
        ...tokensLight.secondary,
        main: tokensLight.secondary[600],
        light: tokensLight.secondary[700],
      },
      neutral: {
        ...tokensLight.grey,
        main: tokensLight.grey[500],
      },
      background: {
        default: tokensLight.grey[0],
        alt: tokensLight.grey[50],
      },
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
