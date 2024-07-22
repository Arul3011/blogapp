import { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userID, setUserID] = useState("");
  const [userName, setuserName] = useState("");
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        setUserID,
        userID,
        userName,
        setuserName,
        nav,
        setNav,
        search,
        setSearch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
