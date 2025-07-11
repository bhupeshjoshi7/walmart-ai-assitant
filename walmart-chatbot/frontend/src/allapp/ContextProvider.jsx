import { createContext, useContext, useState } from "react";

// Create the context properly
const colorContext = createContext();

export const useColor = () => {
  return useContext(colorContext);
}

export const ThemProvider = ({ children }) => {
  const [color, setColor] = useState('light'); // initial state is 'light'

  const colorToggle = () => {
    setColor((prev) => (prev === 'light' ? 'dark' : 'light')); // Toggle between 'light' and 'dark'
  };

  return (
    <colorContext.Provider value={{ color, colorToggle }}>
      {children}  {/* Render the children of this provider */}
    </colorContext.Provider>
  );
};
