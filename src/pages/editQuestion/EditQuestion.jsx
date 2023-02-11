import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FormInput,
  LargeTextRegular,
  RoundButton,
  SignTitleTextBold,
} from "../../components";
import ForumQuestionsContext from "../../context/forumQuestionsContext";

import signLogo from "../../assets/images/signLogo.png";

export const EdidQuestion = () => {
  const { questions, editQuestion } = useContext(ForumQuestionsContext);
  const { id } = useParams();

  const changeingValues = questions.find((question) => question.id === id);

  const [values, setValues] = useState({
    title: changeingValues?.title || "",
    question: changeingValues?.question || "",
  });

  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Title",
      required: true,
    },
  ];

  const navigate = useNavigate();

  const handleUserInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const editOpenedQuestion = () => {
    const data = {
      title: values.title,
      question: values.question,
      edited: new Date().toLocaleString(),
    };

    fetch(`http://localhost:3001/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const cancel = () => {
    navigate(`/question/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, question } = values;
    editQuestion({ title, question }, id);
    editOpenedQuestion();
    navigate(`/question/${id}`);
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
        <SignTitleTextBold>Edit Your Question</SignTitleTextBold>
        <LargeTextRegular>Please edit Your question data</LargeTextRegular>
      </TextBlock>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => {
          return (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={handleUserInput}
            />
          );
        })}
        <Textarea
          name="question"
          value={values.question}
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
