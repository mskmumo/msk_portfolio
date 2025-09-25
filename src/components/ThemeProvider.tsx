"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="theme"
    >
      {children}
    </NextThemeProvider>
  );
}


