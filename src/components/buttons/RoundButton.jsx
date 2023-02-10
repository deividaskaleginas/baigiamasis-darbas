import styled from "styled-components";
import { theme } from "../../styles/theme";
import { MediumTextBold } from "../typography/Typography";

export const RoundButton = ({ children }) => {
  return (
    <Button>
      <MediumTextBold>{children}</MediumTextBold>
    </Button>
  );
};

const Button = styled.button`
  border: none;
  border-radius: 6.25rem;
  max-width: 15.9375rem;
  color: ${() => theme.colors.white};
  background: ${() => theme.colors.primaryLightBlue};
  padding: 1.0625rem 5rem;
  cursor: pointer;

  &:hover {
    background-color: ${() => theme.colors.primaryDarkBluish};
  }
`;
