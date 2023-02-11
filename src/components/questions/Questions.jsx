import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ForumQuestionsContext from "../../context/forumQuestionsContext";
import ForumUserContext from "../../context/forumUserContext";

import { theme } from "../../styles/theme";
import { SquareButton } from "../buttons/SquareButton";
import { Question } from "../question/Question";

export const Questions = () => {
  const { questions, comments } = useContext(ForumQuestionsContext);
  const { loggedUserData } = useContext(ForumUserContext);
  const [newOnTop, setNewOnTop] = useState(false);

  // Komentuoti klausimai
  const commentedQuestions = comments.reduce((unique, question) => {
    if (!unique.some((obj) => obj.questionID === question.questionID)) {
      unique.push(question);
    }
    return unique;
  }, []);

  const filteredCommentedQuestions = questions.filter((question) =>
    commentedQuestions.some((comment) => comment.questionID === question.id)
  );

  console.log(filteredCommentedQuestions);

  // Vartotojo klausimai
  const userQuestions = questions.filter(
    (question) => question.authorID === loggedUserData.id
  );

  console.log(userQuestions);

  // Vartotojo atsakymai
  const filteredUserComments = commentedQuestions.filter((question) =>
    questions.filter(
      (comment) =>
        comment.authorID === question.id &&
        comment.authorID === loggedUserData.id
    )
  );

  console.log(filteredUserComments);

  const filteredUserCommentedQuestions = questions.filter((question) =>
    filteredUserComments.filter((comment) => comment.questionID === question.id)
  );

  console.log("usercomentarai", filteredUserCommentedQuestions);
  // vartotojo laikinti klausimai

  // const likedQuestions = questions.filter((question)=> loggedUserData())

  return (
    <QuestionsSesction>
      <QuestionsSesctionButtonsBlock>
        <button onClick={() => setNewOnTop(!newOnTop)}>New on top</button>
      </QuestionsSesctionButtonsBlock>
      <AllQuestionsBlock newOnTop={newOnTop}>
        {questions.map((question, index) => {
          return <Question key={index} data={question} />;
        })}
      </AllQuestionsBlock>
    </QuestionsSesction>
  );
};

const QuestionsSesction = styled.section`
  min-width: 23.75rem;
  padding: 0 0.625rem;
  margin: 0 auto;

  @media ${theme.device.laptop} {
    max-width: 53.125rem;
  }
`;

const QuestionsSesctionButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AllQuestionsBlock = styled.div`
  display: flex;
  flex-direction: ${({ newOnTop }) => (newOnTop ? "column-reverse" : "column")};
`;
