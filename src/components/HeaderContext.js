import { createContext, useState } from "react";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [isMenuHeader, setIsMenuHeader] = useState(false);

  const handleMenuHeader = () => {
    setIsMenuHeader(true);
  };

  const resetMenuHeader = () => {
    setIsMenuHeader(false);
  };

  return (
    <HeaderContext.Provider
      value={{ isMenuHeader, handleMenuHeader, resetMenuHeader }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
