import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import headerLogo from "../../assets/images/headerLogo.png";

import ForumUserContext from "../../context/forumUserContext";
import { Burger } from "./Burger";

export const Header = () => {
  return (
    <HeaderStyled>
      <div>
        <img src={headerLogo} />
      </div>
      <Burger />
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  height: 3.75rem;
`;
