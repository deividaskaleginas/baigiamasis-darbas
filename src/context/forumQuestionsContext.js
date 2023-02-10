import { createContext, useEffect, useState } from "react";

const ForumQuestionsContext = createContext();

const ForumQuestionsProvider = ({ children }) => {
  const [questions, setQuestion] = useState([]);
  const [comments, setComments] = useState([
    {
      questionID: "",
      id: "",
      date: "",
      userID: "",
      comment: "",
    },
  ]);

  const [statuses, setStatuses] = useState({
    getQuestionsStatus: "",
  });

  useEffect(() => {
    setStatuses({ getQuestionsStatus: "loading" });
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
        setStatuses({ ...statuses, getQuestionsStatus: "success" });
      })
      .catch((error) => {
        setStatuses({ ...statuses, getQuestionsStatus: "error" });
      });
    fetch("http://localhost:3001/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  const handleViewed = (id) => {
    const viewUpdatedquestionsList = questions.map((question) => {
      if (question.id === id) {
        return { ...question, viewed: question.viewed + 1 };
      } else {
        return question;
      }
    });
    setQuestion(viewUpdatedquestionsList);
  };

  const handleVoted = (id, plusMinus) => {
    console.log(plusMinus);
    const votedUpdatedQuestionList = questions.map((question) => {
      if (question.id === id) {
        if (plusMinus === "plus") {
          return { ...question, votes: question.votes + 1 };
        } else {
          return { ...question, votes: question.votes - 1 };
        }
      } else {
        return question;
      }
    });
    setQuestion(votedUpdatedQuestionList);
  };

  return (
    <ForumQuestionsContext.Provider
      value={{
        questions,
        setQuestion,
        comments,
        setComments,
        handleViewed,
        handleVoted,
      }}
    >
      {children}
    </ForumQuestionsContext.Provider>
  );
};

export { ForumQuestionsProvider };
export default ForumQuestionsContext;
