//create a context api for user
import React, { useContext, useState } from "react";

const CarContext = React.createContext();

//create a provider for user context
export function UserProvider({ children }) {
  const [user, setUser] = useState();

  return (
    <CarContext.Provider value={{ user, setUser }}>
      {children}
    </CarContext.Provider>
  );
}

export const CarState = () => {
  return useContext(CarContext);
};
