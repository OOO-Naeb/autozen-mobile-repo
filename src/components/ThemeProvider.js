import React, {createContext, useState, useContext} from 'react';
import {useColorScheme} from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme); // 'light' или 'dark'

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
