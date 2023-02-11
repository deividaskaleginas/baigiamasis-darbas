import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Question } from "../../components";
import ForumQuestionsContext from "../../context/forumQuestionsContext";
import ForumUserContext from "../../context/forumUserContext";
import { theme } from "../../styles/theme";

export const UserQuestions = () => {
  const { questions } = useContext(ForumQuestionsContext);
  const { loggedUserData } = useContext(ForumUserContext);

  const userQuestions = questions.filter(
    (question) => question.authorID === loggedUserData.id
  );
  return (
    <QuestionsSesction>
      <QuestionsSesctionButtonsBlock></QuestionsSesctionButtonsBlock>
      <AllQuestionsBlock newOnTop={newOnTop}>
        {userQuestions.map((question, index) => {
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
