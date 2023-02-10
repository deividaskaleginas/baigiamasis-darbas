import { createContext, useEffect, useState } from "react";

const ForumQuestionsContext = createContext();

const ForumQuestionsProvider = ({ children }) => {
  const [questions, setQuestion] = useState([]);
  const [comments, setComments] = useState({
    questionID: "",
    id: "",
    date: "",
    userID: "",
    comment: "",
  });

  const [statuses, setStatuses] = useState({
    getQuestionsStatus: "",
  });

  useEffect(() => {
    setStatuses({ getQuestionsStatus: "loading" });
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
        setStatuses({ ...statuses, getQuestionsStatus: "success" });
      })
      .catch((error) => {
        setStatuses({ ...statuses, getQuestionsStatus: "error" });
      });
  }, []);

  return (
    <ForumQuestionsContext.Provider
      value={(questions, setQuestion, comments, setComments)}
    >
      {children}
    </ForumQuestionsContext.Provider>
  );
};

export { ForumQuestionsProvider };
export default ForumQuestionsContext;
