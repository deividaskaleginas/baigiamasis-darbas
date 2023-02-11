import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ForumQuestionsContext from "../../context/forumQuestionsContext";

import signLogo from "../../assets/images/signLogo.png";
import {
  LargeTextRegular,
  RoundButton,
  SignTitleTextBold,
} from "../../components";
import styled from "styled-components";

export const EditComment = () => {
  const { comments, editComment } = useContext(ForumQuestionsContext);
  const { id } = useParams();

  const changeingValues = comments.find((comment) => comment.id === id);

  const [values, setValues] = useState({
    comment: changeingValues?.comment || "",
  });

  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const editOpenedComment = () => {
    const data = {
      comment: values.comment,
      edited: new Date().toLocaleString(),
    };

    fetch(`http://localhost:3001/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { comment } = values;
    editComment({ comment }, id);
    editOpenedComment();
    navigate(`/question/${changeingValues.questionID}`);
  };

  return (
    <QuestionPostSection>
      <LogoBlock>
        <img
          src={signLogo}
          alt="App logo with text: connect express yourself everyday"
        />
      </LogoBlock>
      <TextBlock>
        <SignTitleTextBold>Edit Your Comment</SignTitleTextBold>
        <LargeTextRegular>Please edit Your comment data</LargeTextRegular>
      </TextBlock>
      <form onSubmit={handleSubmit}>
        <Textarea
          name="comment"
          value={values.comment}
          maxLength="500"
          onChange={handleUserInput}
        ></Textarea>
        <ButtonBlock>
          <RoundButton>Edit</RoundButton>
        </ButtonBlock>
      </form>
    </QuestionPostSection>
  );
};

const QuestionPostSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  height: 100vh;
  max-width: 23.75rem;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
`;
const TextBlock = styled.div``;
const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
`;
const LogoBlock = styled.div`
  display: flex;
  justify-content: center;
  img {
    max-width: 21.25rem;
    object-fit: cover;
  }
`;

const Textarea = styled.textarea`
  min-height: 9rem;
  max-width: 100%;
  border: 0.0938rem solid gray;
  border-radius: 0.625rem;
  color: black;
  font-size: 0.6875rem;
  padding: 1.1875rem;
`;
