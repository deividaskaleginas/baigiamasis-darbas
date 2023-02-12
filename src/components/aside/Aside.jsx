import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  chatsCircleUserMeniuIcon,
  questionUserMeniuIcon,
  thumbsUpUserMeniuIcon,
  plus,
} from "../../assets/svg";
import ForumQuestionsContext from "../../context/forumQuestionsContext";
import ForumUserContext from "../../context/forumUserContext";
import { theme } from "../../styles/theme";
import { GuestHeaderNavLinksText } from "../typography/Typography";

const NAV_LINKS = [
  { name: "Login", link: "/login" },
  { name: "Register", link: "/register" },
];

export const Aside = () => {
  const { isLoggedIn, setIsLoggedIn, loggedUserData } =
    useContext(ForumUserContext);
  const { filteredUserQuestions } = useContext(ForumQuestionsContext);
  const LOGGED_USER_NAV_LINKS = [
    { name: "Start a New Topic", link: "/add", icon: plus },
    {
      name: "My Questions",
      link: "",
      icon: questionUserMeniuIcon,
    },
    { name: "My Answers", link: "", icon: chatsCircleUserMeniuIcon },
    { name: "My Likes", link: "", icon: thumbsUpUserMeniuIcon },
  ];

  return (
    <>
      {!isLoggedIn ? (
        <AsideWrapper>
          {NAV_LINKS.map(({ name, link }, index) => {
            return (
              <li key={index}>
                <NavLink to={link}>
                  <GuestHeaderNavLinksText>{name}</GuestHeaderNavLinksText>
                </NavLink>
              </li>
            );
          })}
        </AsideWrapper>
      ) : (
        <AsideWrapper>
          {LOGGED_USER_NAV_LINKS.map(({ name, link, icon }, index) => {
            return (
              <li key={index}>
                <i>{icon}</i>
                <NavLink to={link}>
                  <GuestHeaderNavLinksText>{name}</GuestHeaderNavLinksText>
                </NavLink>
              </li>
            );
          })}
          <LogOutButton onClick={() => setIsLoggedIn(false)}>
            <GuestHeaderNavLinksText>Log Out</GuestHeaderNavLinksText>
          </LogOutButton>
          <button onClick={() => filteredUserQuestions(loggedUserData.id)}>
            my
          </button>
        </AsideWrapper>
      )}
    </>
  );
};

const AsideWrapper = styled.aside`
  display: none;

  @media ${theme.device.laptop} {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    min-width: 15.625rem;
    max-height: 20.75rem;
    padding-right: 1.5625rem;
    margin-top: 2rem;
    gap: 1.5625rem;
    border-radius: 0.625rem;
    background-color: ${theme.colors.primaryLightBlue};
  }
`;

const LogOutButton = styled.button`
  background: none;
  border: none;
`;
