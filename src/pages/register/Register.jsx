import { useContext, useState } from "react";
import ForumUserContext from "../../context/forumUserContext";
import uniqid from "uniqid";
import { person, lockPassword } from "../../assets/svg";
import { NavLink, useNavigate } from "react-router-dom";
import { theme } from "../../styles/theme";
import styled from "styled-components";
import {
  FormInput,
  LargeTextRegular,
  RoundButton,
  SignTitleTextBold,
  SmallTextRegulat,
  SquareButton,
} from "../../components";

import signLogo from "../../assets/images/signLogo.png";
import signImage from "../../assets/images/signImage.png";

export const Register = () => {
  const { setIsLoggedIn, users, setLoggedUserData, setUsers } =
    useContext(ForumUserContext);

  const [exist, setExist] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character",
      pattern: "^[a-zA-Z0-9]{3,16}$",
      icon: person,
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "text",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      icon: lockPassword,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      pattern: values.password,
      icon: lockPassword,
      required: true,
    },
  ];

  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkIfUserExist = () => {
    const checkedUserList = users.filter(
      (user) => user.username === values.username
    );
    checkedUserList.length > 0 ? setExist(true) : createUser();
  };

  const createUser = () => {
    const userData = {
      id: uniqid(),
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
      votes: [],
    };

    setLoggedUserData(userData);
    setUsers([...users, userData]);

    fetch("http://localhost:3001/users/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    localStorage.setItem("userId", String(userData.id));
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfUserExist();
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
          <LargeTextRegular>Please sign up to continue</LargeTextRegular>
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
          {exist && (
            <WarningBlock>
              <SmallTextRegulat>
                User with this username already exists
              </SmallTextRegulat>
            </WarningBlock>
          )}
          <ButtonBlock>
            <SquareButton>Register</SquareButton>
          </ButtonBlock>
        </form>

        <RegisterTextBlock>
          <SmallTextRegulat>
            Already a member? <NavLink to="/login">Sign In</NavLink>
          </SmallTextRegulat>
        </RegisterTextBlock>
      </LoginDataBlock>
      <LoginImageBlock>
        <SignUpButtonBlock>
          <RoundButton type="button">Sign In</RoundButton>
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
  flex-direction: column;
  gap: 1.5625rem;
  max-width: 25rem;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 3.25rem;
  }
`;

const LogoBlock = styled.div`
  img {
    max-width: 21.875rem;
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
    color: ${() => theme.colors.primaryLightBlue};
  }
`;

const WarningBlock = styled.div`
  text-align: center;
`;

const LoginImageBlock = styled.div`
  display: none;
  flex-direction: column;
  gap: 9.375rem;

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
