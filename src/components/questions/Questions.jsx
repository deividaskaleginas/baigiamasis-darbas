import { useContext, useState } from "react";

import styled from "styled-components";
import ForumQuestionsContext from "../../context/forumQuestionsContext";

import { theme } from "../../styles/theme";

import { Question } from "../question/Question";

export const Questions = () => {
  const {
    comments,
    questions,
    allCommentedQuestions,
    allQuestions,
    setAllQuestions,
    newOnTopQuestionsAndComments,
    unansweredQuestions,
  } = useContext(ForumQuestionsContext);

  return (
    <QuestionsSesction>
      <QuestionsSesctionButtonsBlock>
        <ButtonsStyled onClick={newOnTopQuestionsAndComments}>
          New on top
        </ButtonsStyled>
        <ButtonsStyled onClick={() => setAllQuestions(!allQuestions)}>
          All
        </ButtonsStyled>
        <ButtonsStyled onClick={() => allCommentedQuestions()}>
          All Commented
        </ButtonsStyled>
        <ButtonsStyled onClick={() => unansweredQuestions(comments)}>
          Unanswered
        </ButtonsStyled>
      </QuestionsSesctionButtonsBlock>
      <AllQuestionsBlock>
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
    margin: 0;
  }
`;

const QuestionsSesctionButtonsBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9375rem 0;
`;

const AllQuestionsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsStyled = styled.button`
  color: ${theme.colors.white};
  background: ${theme.colors.primaryDarkBluish};
  border: none;
  padding: 0.3125rem;
  min-width: 5rem;
  border-radius: 5px;
`;
