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

export const Aside = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(ForumUserContext);
  return (
    <>
      {!isLoggedIn ? (
        <aside>
          {NAV_LINKS.map(({ name, link }, index) => {
            return (
              <li key={index}>
                <NavLink to={link}>
                  <h1>{name}</h1>
                </NavLink>
              </li>
            );
          })}
        </aside>
      ) : (
        <aside>
          {LOGGED_USER_NAV_LINKS.map(({ name, link, icon }, index) => {
            return (
              <li key={index}>
                <i>{icon}</i>
                <NavLink to={link}>
                  <h1>{name}</h1>
                </NavLink>
              </li>
            );
          })}
          <LogOutButton onClick={() => setIsLoggedIn(false)}>
            <h1>Log Out</h1>
          </LogOutButton>
        </aside>
      )}
    </>
  );
};

const AsideWrapper = styled.aside`
  /* display: none; */

  //media query nuo desktopo
  //
`;

const GuestHeaderUnorderList = styled.ul``;

const UserHeaderNavigationList = styled.ul``;

const LogOutButton = styled.button`
  background: none;
  border: none;
`;
