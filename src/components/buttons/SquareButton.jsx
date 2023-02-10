import styled from "styled-components";
import { theme } from "../../styles/theme";
import { MediumTextBold } from "../typography/Typography";

export const SquareButton = ({ children }) => {
  return (
    <Button>
      <MediumTextBold>{children}</MediumTextBold>
    </Button>
  );
};

const Button = styled.button`
  border: none;
  border-radius: 0.625rem;
  min-width: 10.9375rem;
  color: ${() => theme.colors.white};
  background: ${() => theme.colors.primaryDarkBluish};
  padding: 0.3625rem 0.8125rem;
  cursor: pointer;

  &:hover {
    background-color: ${() => theme.colors.primaryLightBlue};
  }
`;
