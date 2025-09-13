import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeAttributeSync() {
  const { theme } = useTheme(); 

  useEffect(() => {
    const resolved =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    document.documentElement.dataset.theme = resolved;
  }, [theme]);

  return null;
}

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeAttributeSync />
      {children}
    </NextThemesProvider>
  );
};
