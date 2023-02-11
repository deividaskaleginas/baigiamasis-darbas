import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ForumQuestionsContext from "../../context/forumQuestionsContext";
import { theme } from "../../styles/theme";
import { SquareButton } from "../buttons/SquareButton";
import { Question } from "../question/Question";

export const Questions = () => {
  const { questions, comments } = useContext(ForumQuestionsContext);
  const [newOnTop, setNewOnTop] = useState(false);

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
