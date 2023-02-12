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

  const [allQuestions, setAllQuestions] = useState(false);

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
  }, [allQuestions]);

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

  const editQuestion = (editQuestion, id) => {
    const editedQuestion = questions.find((question) => question.id === id);
    const newData = questions.map((question) =>
      question.id === id
        ? {
            id: editedQuestion.id,
            date: editedQuestion.date,
            title: editQuestion.title,
            question: editQuestion.question,
            authorID: editedQuestion.authorID,
            viewed: editedQuestion.viewed,
            votes: editedQuestion.votes,
            edited: new Date().toLocaleString(),
          }
        : question
    );
    setQuestion([...newData]);
  };

  const editComment = (editComment, id) => {
    const editedComment = comments.find((comment) => comment.id === id);
    const newData = comments.map((comment) =>
      comment.id === id
        ? {
            questionID: editedComment.questionID,
            id: editedComment.id,
            date: editedComment.date,
            userID: editedComment.userID,
            comment: editComment.comment,
            edited: new Date().toLocaleString(),
          }
        : comment
    );
    setComments([...newData]);
  };

  // all new comments on top

  const newOnTopQuestionsAndComments = () => {
    const reversed = questions.reverse();
    console.log(reversed);
    setQuestion(reversed);
  };

  // all commented questions

  const allCommentedQuestions = () => {
    const commentedQuestions = comments.reduce((unique, question) => {
      if (!unique.some((obj) => obj.questionID === question.questionID)) {
        unique.push(question);
      }
      return unique;
    }, []);

    const filteredCommentedQuestions = questions.filter((question) =>
      commentedQuestions.some((comment) => comment.questionID === question.id)
    );

    setQuestion(filteredCommentedQuestions);
  };

  // user questions

  const filteredUserQuestions = (userID) => {
    const userQuestions = questions.filter(
      (question) => question.authorID === userID
    );

    console.log(userID);
    setQuestion(userQuestions);
  };

  // // Vartotojo atsakymai
  // const filteredUserComments = commentedQuestions.filter((question) =>
  //   questions.filter(
  //     (comment) =>
  //       comment.authorID === question.id &&
  //       comment.authorID === loggedUserData.id
  //   )
  // );

  // const filteredUserCommentedQuestions = questions.filter((question) =>
  //   filteredUserComments.filter((comment) => comment.questionID === question.id)
  // );

  return (
    <ForumQuestionsContext.Provider
      value={{
        questions,
        setQuestion,
        comments,
        setComments,
        handleViewed,
        handleVoted,
        editQuestion,
        editComment,
        allCommentedQuestions,
        setAllQuestions,
        allQuestions,
        newOnTopQuestionsAndComments,
        filteredUserQuestions,
      }}
    >
      {children}
    </ForumQuestionsContext.Provider>
  );
};

export { ForumQuestionsProvider };
export default ForumQuestionsContext;
