import { useContext, useState } from "react";

import styled from "styled-components";
import ForumQuestionsContext from "../../context/forumQuestionsContext";
import ForumUserContext from "../../context/forumUserContext";

import { theme } from "../../styles/theme";

import { Question } from "../question/Question";
import { filteredCommentedQuestions } from "./QuestionsFilters";

export const Questions = () => {
  const {
    questions,
    comments,
    allCommentedQuestions,
    allQuestions,
    setAllQuestions,
  } = useContext(ForumQuestionsContext);
  const { loggedUserData } = useContext(ForumUserContext);
  const [newOnTop, setNewOnTop] = useState(false);

  // vartotojo laikinti klausimai

  // const likedQuestions = questions.filter((question)=> loggedUserData())

  return (
    <QuestionsSesction>
      <QuestionsSesctionButtonsBlock>
        <button onClick={() => setNewOnTop(!newOnTop)}>New on top</button>
        <button onClick={() => setAllQuestions(!allQuestions)}>All</button>
        <button onClick={() => allCommentedQuestions()}>All Commented</button>
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
    margin: 0;
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
