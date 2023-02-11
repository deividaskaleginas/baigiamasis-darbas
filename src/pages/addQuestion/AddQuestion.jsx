import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";

import { postDataToServer } from "../../context/helpers";
import ForumQuestionsContext from "../../context/forumQuestionsContext";
import ForumUserContext from "../../context/forumUserContext";

import signLogo from "../../assets/images/signLogo.png";
import {
  FormInput,
  LargeTextRegular,
  RoundButton,
  SignTitleTextBold,
} from "../../components";
import styled from "styled-components";

export const AddQuestion = () => {
  const { questions, setQuestion } = useContext(ForumQuestionsContext);
  const { loggedUserData, isLoggedIn } = useContext(ForumUserContext);

  const [values, setValues] = useState({
    title: "",
    question: "",
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

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createQuestion = () => {
    const questionData = {
      id: uniqid(),
      date: new Date().toLocaleString(),
      title: values.title,
      question: values.question,
      authorID: loggedUserData.id,
      viewed: 0,
      votes: 0,
      edited: "",
    };

    postDataToServer("questions", questionData);

    setQuestion([...questions, questionData]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuestion();
    navigate("/");
  };
  return (
    <QuestionPostSection>
      {isLoggedIn ? (
        <>
          <LogoBlock>
            <img
              src={signLogo}
              alt="App logo with text: connect express yourself everyday"
            />
          </LogoBlock>
          <TextBlock>
            <SignTitleTextBold>Ask a Question</SignTitleTextBold>
            <LargeTextRegular>Please sign up to continue</LargeTextRegular>
          </TextBlock>
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => {
              return (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              );
            })}
            <Textarea
              name="question"
              value={values.question}
              maxLength="500"
              onChange={onChange}
            ></Textarea>
            <ButtonBlock>
              <RoundButton>Add</RoundButton>
            </ButtonBlock>
          </form>
        </>
      ) : (
        navigate("/login")
      )}
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
