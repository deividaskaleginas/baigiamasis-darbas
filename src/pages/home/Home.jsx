import styled from "styled-components";
import { Aside, Header, Questions } from "../../components";

export const Home = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Aside />
        <Questions />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  // media query nuo kada rodyt
  display: flex;
`;
