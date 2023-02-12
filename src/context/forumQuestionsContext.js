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
    getCommentsStatus: "",
  });

  // for all questions UI

  const [allQuestions, setAllQuestions] = useState(false);

  useEffect(() => {
    setStatuses({ getQuestionsStatus: "loading" });
    fetch("http://localhost:3001/questions")
      .then((res) => res.json())
      .then((data) => {
        setQuestion(data);
        setStatuses({ ...statuses, getQuestionsStatus: "success" });
      })
      .catch(() => {
        setStatuses({ ...statuses, getQuestionsStatus: "error" });
      });
    fetch("http://localhost:3001/comments")
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setStatuses({ ...statuses, getCommentsStatus: "success" });
      })
      .catch(() => {
        setStatuses({ ...statuses, getCommentsStatus: "error" });
      });
  }, [allQuestions]);

  // update viewed count

  const handleViewed = (id) => {
    const viewUpdatedquestionsList = questions.map((question) => {
      if (question.id === id) {
        return { ...question, viewed: question.viewed + 1 };
      } else {
        return question;
      }
    });

    setQuestion(viewUpdatedquestionsList);

    const openedQuestion = questions.find((question) => question.id === id);

    const newQuestionViewedData = { viewed: openedQuestion.viewed + 1 };

    fetch(`http://localhost:3001/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newQuestionViewedData),
    }).then((res) => res.json());
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

  // all new questions on top

  const newOnTopQuestionsAndComments = () => {
    const sortedQuestions = [...questions].sort((a, b) => b.date - a.date);
    setQuestion(sortedQuestions);
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

  // unanswered questions

  const unansweredQuestions = (comments) => {
    const commenteddQuestionsList = comments.map(
      (comment) => comment.questionID
    );

    const unansweredQuestionsList = questions.filter(
      (question) => !commenteddQuestionsList.includes(question.id)
    );

    setQuestion(unansweredQuestionsList);
  };

  // user questions

  const filteredUserQuestions = (userID) => {
    const userQuestions = questions.filter(
      (question) => question.authorID === userID
    );

    setQuestion(userQuestions);
  };

  // user voted questions

  const handleMyLikedQuestions = (userVotes) => {
    const likedVotesList = userVotes
      ?.filter((vote) => vote.vote.isLiked == true)
      .map((vote) => vote.id);

    const likedQuestions = questions.filter((question) =>
      likedVotesList.includes(question.id)
    );
    setQuestion(likedQuestions);
  };

  return (
    <ForumQuestionsContext.Provider
      value={{
        questions,
        setQuestion,
        comments,
        setComments,
        handleViewed,
        editQuestion,
        editComment,
        allCommentedQuestions,
        setAllQuestions,
        allQuestions,
        newOnTopQuestionsAndComments,
        filteredUserQuestions,
        unansweredQuestions,
        handleMyLikedQuestions,
      }}
    >
      {children}
    </ForumQuestionsContext.Provider>
  );
};

export { ForumQuestionsProvider };
export default ForumQuestionsContext;
