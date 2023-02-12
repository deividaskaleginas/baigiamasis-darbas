import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import headerLogo from "../../assets/images/headerLogo.png";

import { theme } from "../../styles/theme";
import { Burger } from "./Burger";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderStyled>
      <div onClick={() => navigate("/")}>
        <img src={headerLogo} />
      </div>
      <Burger />
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.white};
  width: 100%;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  height: 3.75rem;
`;
