import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ForumQuestionsContext from "../../context/forumQuestionsContext";
import { theme } from "../../styles/theme";
import { SquareButton } from "../buttons/SquareButton";
import { Question } from "../question/Question";

export const Questions = () => {
  const { questions } = useContext(ForumQuestionsContext);

  return (
    <QuestionsSesction>
      <QuestionsSesctionButtonsBlock>
        {/* <div>Filtrams</div>
        <SquareButton>
          <NavLink to={"/add"}>Ask Question</NavLink>
        </SquareButton> */}
      </QuestionsSesctionButtonsBlock>

      {questions.map((question, index) => {
        return <Question key={index} data={question} />;
      })}
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
