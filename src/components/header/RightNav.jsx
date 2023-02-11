import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  chatsCircleUserMeniuIcon,
  questionUserMeniuIcon,
  thumbsUpUserMeniuIcon,
  plus,
} from "../../assets/svg";
import ForumUserContext from "../../context/forumUserContext";
import { theme } from "../../styles/theme";
import { GuestHeaderNavLinksText } from "../typography/Typography";

const NAV_LINKS = [
  { name: "Login", link: "/login" },
  { name: "Register", link: "/register" },
];

const LOGGED_USER_NAV_LINKS = [
  { name: "Start a New Topic", link: "/add", icon: plus },
  { name: "My Questions", link: "", icon: questionUserMeniuIcon },
  { name: "My Answers", link: "", icon: chatsCircleUserMeniuIcon },
  { name: "My Likes", link: "", icon: thumbsUpUserMeniuIcon },
];

export const RightNav = ({ open }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(ForumUserContext);
  return (
    <>
      {!isLoggedIn ? (
        <GuestHeaderUnorderList open={open}>
          {NAV_LINKS.map(({ name, link }, index) => {
            return (
              <li key={index}>
                <NavLink to={link}>
                  <GuestHeaderNavLinksText>{name}</GuestHeaderNavLinksText>
                </NavLink>
              </li>
            );
          })}
        </GuestHeaderUnorderList>
      ) : (
        <UserHeaderNavigationList open={open}>
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
        </UserHeaderNavigationList>
      )}
    </>
  );
};

const GuestHeaderUnorderList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  align-items: flex-end;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  right: 0;
  height: 100vh;
  width: 13.5rem;
  padding-top: 4.5rem;
  padding-right: 1.5625rem;
  gap: 1.5625rem;
  background-color: ${() => theme.colors.primaryLightBlue};
  transition: 0.3s ease-in-out;
`;

const UserHeaderNavigationList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  position: fixed;
  align-items: flex-end;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  top: 0;
  right: 0;
  height: 100vh;
  width: 15.5rem;
  padding-top: 3.5rem;
  padding-right: 1.5625rem;
  gap: 1.5625rem;
  background-color: ${() => theme.colors.primaryLightBlue};
  transition: 0.3s ease-in-out;
`;

const LogOutButton = styled.button`
  background: none;
  border: none;
`;
