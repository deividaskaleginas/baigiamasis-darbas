import { createContext } from "react";

const ForumUserContext = createContext();

const ForumUserProvider = ({ children }) => {
  return <ForumUserContext.Provider>{children}</ForumUserContext.Provider>;
};

export { ForumUserProvider };
export default ForumUserContext;
