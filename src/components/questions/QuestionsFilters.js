// import { useContext } from "react";
// import ForumQuestionsContext from "../../context/forumQuestionsContext";
// import ForumUserContext from "../../context/forumUserContext";

// const { questions, setQuestion, comments } = useContext(ForumQuestionsContext);
// const { loggedUserData } = useContext(ForumUserContext);

// // commented questions

// export const filteredCommentedQuestions = () => {
//   commentedQuestions = comments.reduce((unique, question) => {
//     if (!unique.some((obj) => obj.questionID === question.questionID)) {
//       unique.push(question);
//     }
//     return unique;
//   }, []);

//   setQuestion(
//     questions.filter((question) =>
//       commentedQuestions.some((comment) => comment.questionID === question.id)
//     )
//   );
// };
