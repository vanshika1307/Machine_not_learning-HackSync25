import React, { useState, createContext, useMemo, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import ModeTransition from './ModeTransition';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  const [isAnimating, setIsAnimating] = useState(false);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setIsAnimating(true);
        setTimeout(() => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          setIsAnimating(false);
        }, 600); 
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ModeTransition isAnimating={isAnimating} />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;