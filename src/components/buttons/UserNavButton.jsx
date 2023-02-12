import styled from "styled-components";
import { GuestHeaderNavLinksText } from "../typography/Typography";

export const UserNavButton = ({ handleClick, icon, text }) => {
  return (
    <ButtonStyled onClick={handleClick}>
      {icon}
      <GuestHeaderNavLinksText>{text}</GuestHeaderNavLinksText>
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.9375rem;
  background: none;
  border: none;
`;
