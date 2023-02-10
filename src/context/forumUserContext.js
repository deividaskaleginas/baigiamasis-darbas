import { createContext, useEffect, useState } from "react";

const ForumUserContext = createContext();

const ForumUserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const [loggedUserData, setLoggedUserData] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [statuses, setStatuses] = useState({
    getUserStatus: "",
  });

  console.log(users);

  useEffect(() => {
    setStatuses({ getUserStatus: "loading", getQuestionsStatus: "loading" });
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setStatuses({ ...statuses, getUserStatus: "succsess" });
      })
      .catch((error) => {
        setStatuses({ ...statuses, getUserStatus: "error" });
      });
  }, []);

  return (
    <ForumUserContext.Provider
      value={{
        users,
        setUsers,
        loggedUserData,
        setLoggedUserData,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </ForumUserContext.Provider>
  );
};

export { ForumUserProvider };
export default ForumUserContext;
