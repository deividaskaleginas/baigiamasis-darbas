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
import { UserNavButton } from "../buttons/UserNavButton";
import { GuestHeaderNavLinksText } from "../typography/Typography";

const NAV_LINKS = [
  { name: "Login", link: "/login" },
  { name: "Register", link: "/register" },
];

export const Aside = () => {
  const { isLoggedIn, setIsLoggedIn, loggedUserData } =
    useContext(ForumUserContext);
  const {
    filteredUserQuestions,

    handleMyLikedQuestions,
  } = useContext(ForumQuestionsContext);

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
          <NavLink to={"/add"}>
            <LinkStyled>
              <i>{plus}</i>
              <GuestHeaderNavLinksText>
                Start a New Topic
              </GuestHeaderNavLinksText>
            </LinkStyled>
          </NavLink>

          <UserNavButton
            handleClick={() => filteredUserQuestions(loggedUserData.id)}
            icon={questionUserMeniuIcon}
            text={"My Questions "}
          />

          <UserNavButton
            handleClick={() => handleMyLikedQuestions(loggedUserData.votes)}
            icon={thumbsUpUserMeniuIcon}
            text={"My Likes "}
          />
          <LogOutButton onClick={() => setIsLoggedIn(false)}>
            <GuestHeaderNavLinksText>Log Out</GuestHeaderNavLinksText>
          </LogOutButton>
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
    padding: 1.5625rem;
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

const LinkStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9375rem;
`;
