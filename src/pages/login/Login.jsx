import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FormInput,
  LargeTextRegular,
  RoundButton,
  SignTitleTextBold,
  SmallTextRegulat,
  SquareButton,
  WarningTextBold,
} from "../../components";
import ForumUserContext from "../../context/forumUserContext";

import signLogo from "../../assets/images/signLogo.png";
import signImage from "../../assets/images/signImage.png";
import { theme } from "../../styles/theme";
import styled from "styled-components";
import { person, lockPassword } from "../../assets/svg";

export const Login = () => {
  const { setIsLoggedIn, users, setLoggedUserData } =
    useContext(ForumUserContext);

  const [failedLogIn, setFailedLogIn] = useState(false);

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      icon: person,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: lockPassword,
    },
  ];

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkUser = () => {
    const loggedInUser = users.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (loggedInUser) {
      localStorage.setItem("userId", String(loggedInUser.id));
      setLoggedUserData({ ...loggedInUser });
      setIsLoggedIn(true);
      navigate("/");
    } else {
      setFailedLogIn(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser();
  };
  return (
    <LoginSection>
      <LoginDataBlock>
        <LogoBlock>
          <img
            src={signLogo}
            alt="App logo with text: connect express yourself everyday"
          />
        </LogoBlock>
        <TextBlock>
          <SignTitleTextBold>Enter Credentials</SignTitleTextBold>
          <LargeTextRegular>Please sign in to continue</LargeTextRegular>
        </TextBlock>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => {
            return (
              <InputBlock key={input.id}>
                <Icon>{input.icon}</Icon>
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              </InputBlock>
            );
          })}
          {failedLogIn && (
            <WarningBlock>
              <WarningTextBold>Wrong username our password</WarningTextBold>
            </WarningBlock>
          )}
          <ButtonBlock>
            <SquareButton>Login</SquareButton>
          </ButtonBlock>
        </form>

        <RegisterTextBlock>
          <SmallTextRegulat>
            Don't have an account? <NavLink to="/register">Sign up</NavLink>
          </SmallTextRegulat>
        </RegisterTextBlock>
      </LoginDataBlock>
      <LoginImageBlock>
        <SignUpButtonBlock>
          <RoundButton type="button">Sign Up</RoundButton>
        </SignUpButtonBlock>
        <SignInLogoBlock>
          <img src={signImage} alt="" />
        </SignInLogoBlock>
      </LoginImageBlock>
    </LoginSection>
  );
};

const LoginSection = styled.section`
  display: grid;
  align-items: center;

  height: 100vh;
  max-width: 75rem;
  margin: 0 auto;

  @media ${theme.device.laptop} {
    grid-template-columns: 1fr 1fr;
  }
`;

const LoginDataBlock = styled.div`
  display: flex;
  gap: 1.5625rem;
  flex-direction: column;
  max-width: 23.75rem;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 2.25rem;
  }
`;

const LogoBlock = styled.div`
  img {
    max-width: 21.25rem;
    object-fit: cover;
  }
`;

const TextBlock = styled.div`
  padding-bottom: 2.5rem;
`;

const InputBlock = styled.div`
  display: block;
  position: relative;
`;

const Icon = styled.i`
  position: absolute;
  top: 0.625rem;
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const RegisterTextBlock = styled.div`
  padding-top: 5rem;
  text-align: center;

  a {
    text-decoration: none;
    color: ${() => theme.colors.primaryDarkBluish};
  }
`;

const WarningBlock = styled.div`
  text-align: center;
`;

const LoginImageBlock = styled.div`
  display: none;
  flex-direction: column;
  gap: 5.375rem;

  @media ${theme.device.laptop} {
    display: flex;
    padding-right: 2rem;

    img {
      max-height: 31.25rem;
    }
  }
`;

const SignUpButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SignInLogoBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;
