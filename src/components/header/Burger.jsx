import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { RightNav } from "./RightNav";

export const Burger = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BurgerStyled open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </BurgerStyled>
      <RightNav open={open} />
    </>
  );
};

const BurgerStyled = styled.div`
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 20;
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;

  @media ${theme.device.laptop} {
    display: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    border-radius: 10px;
    background-color: ${({ open }) => (open ? "#fff" : "#333")};
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
