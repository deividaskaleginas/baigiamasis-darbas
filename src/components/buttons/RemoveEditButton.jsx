import styled from "styled-components";

export const RemoveEditButton = ({ handleClick, icon, text }) => {
  return (
    <ButtonStyled onClick={handleClick}>
      {icon} {text}
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
