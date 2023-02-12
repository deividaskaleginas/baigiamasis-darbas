import { useContext } from "react";

import ForumQuestionsContext from "../../context/forumQuestionsContext";

import view from "../../assets/images/view.png";
import chatBubble from "../../assets/images/chatBubble.png";
import { Link } from "react-router-dom";
import {
  LargeTextRegular,
  MediumTextBold,
  SmallTextRegulat,
} from "../typography/Typography";
import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Question = ({ data, index }) => {
  const { handleViewed, comments } = useContext(ForumQuestionsContext);

  const questionComments = comments?.filter(
    (comments) => comments.questionID === data.id
  );

  return (
    <QuestionBlock key={index}>
      <QuestionTop>
        <QuestionTextInfoBlock>
          <QuestionTitleAndDateBlock>
            <Link
              onClick={() => handleViewed(data.id)}
              to={`/question/${data.id}`}
            >
              <MediumTextBold>{data.title}</MediumTextBold>
            </Link>

            <SmallTextRegulat>{data.date}</SmallTextRegulat>
          </QuestionTitleAndDateBlock>
          <QuestionIntroduction>
            <LargeTextRegular>
              {data.question.substring(0, 100)}...
            </LargeTextRegular>
          </QuestionIntroduction>
        </QuestionTextInfoBlock>
        <InquiredUserAvatar>{data.authorID}</InquiredUserAvatar>
      </QuestionTop>
      <QuestionTopBottom>
        <SmallTextRegulat>{data.votes} votes</SmallTextRegulat>
        <Viewed>
          <img src={view} alt="" />
          <SmallTextRegulat>{data.viewed}</SmallTextRegulat>
        </Viewed>
        <Commented>
          <img src={chatBubble} alt="" />
          <SmallTextRegulat>{questionComments.length}</SmallTextRegulat>
        </Commented>
      </QuestionTopBottom>
    </QuestionBlock>
  );
};

const QuestionBlock = styled.div`
  padding: 5px 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  @media ${theme.device.laptop} {
    max-width: 53.125rem;
    min-width: 48.375rem;
  }
`;

const QuestionTop = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const QuestionTextInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const QuestionTitleAndDateBlock = styled.div`
  a {
    text-decoration: none;
    color: ${() => theme.colors.primaryText};
  }
  @media ${theme.device.tablet} {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h3 {
      font-size: 1.5rem;
      line-height: 1.75rem;
    }
    h2 {
      line-height: 1.7581rem;
    }

    h5 {
      font-size: 1.125rem;
    }
  }
`;

const QuestionIntroduction = styled.div``;

const InquiredUserAvatar = styled.div`
  display: flex;
  justify-content: center;
`;

const Viewed = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

const QuestionTopBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.9375rem;
`;

const Commented = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;
