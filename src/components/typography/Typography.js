import styled from "styled-components";
import { theme } from "../../styles/theme";

export const GuestHeaderNavLinksText = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${() => theme.colors.white};

  &:hover {
    color: ${() => theme.colors.primaryDarkBluish};
  }
`;

export const LogoTextBold = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.75rem;
`;
export const SignTitleTextBold = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  line-height: 3.5156rem;
  color: ${() => theme.colors.primaryText};
`;

export const MediumTextBold = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  line-height: 22px;
`;
export const SmallTextBold = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.75rem;
`;
export const SmallerTextBold = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.4375rem;
`;

export const LargeTextRegular = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2rem;
  color: ${() => theme.colors.primaryText};
`;

export const SmallTextRegulat = styled.h5`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.3125rem;
  color: ${() => theme.colors.primaryText};
`;
export const SmallerTextRegulat = styled.h5`
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.3125rem;
  color: ${() => theme.colors.primaryText};
`;

export const WarningTextBold = styled.h5`
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.3125rem;
  color: ${() => theme.colors.warning};
`;
