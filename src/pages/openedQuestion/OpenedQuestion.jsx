import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Header,
  LargeTextRegular,
  MediumTextBold,
  SmallTextRegulat,
} from "../../components";
import ForumQuestionsContext from "../../context/forumQuestionsContext";
import ForumUserContext from "../../context/forumUserContext";
import { patchDataToServer } from "../../context/helpers";
import { theme } from "../../styles/theme";
import { Comments } from "../../components/comments/Comments";
import {
  arrowDownGrey,
  arrowDownRed,
  arrowUpGreen,
  arrowUpGrey,
} from "../../assets/svg";

export const OpenedQuestion = () => {
  const { questions, setQuestion, comments, setComments } = useContext(
    ForumQuestionsContext
  );

  const { loggedUserData, setLoggedUserData, isLoggedIn } =
    useContext(ForumUserContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const openedQuestion = questions.find((question) => question.id === id);

  const findUserVote = Array.from(loggedUserData?.votes ?? [])?.find(
    (vote) => vote.id === id
  );

  useEffect(() => {
    if (isLoggedIn) {
      if (findUserVote) {
        findUserVote.vote?.isLiked ? setIsLiked(true) : setIsLiked(false);
        findUserVote.vote?.isDisliked
          ? setIsDisliked(true)
          : setIsDisliked(false);
      } else {
        setIsLiked(false);
        setIsDisliked(false);
      }
    }
  }, []);

  const updateUserVote = (id) => {
    if (findUserVote) {
      const updatedUserVotes = loggedUserData.votes.map((vote) => {
        if (vote.id === id) {
          return {
            id: id,
            vote: { isLiked: isLiked, isDisliked: isDisliked },
          };
        } else {
          return vote;
        }
      });

      const editedVotes = { votes: updatedUserVotes };

      setLoggedUserData({ ...loggedUserData, votes: updatedUserVotes });
      patchDataToServer(`users/${loggedUserData.id}`, editedVotes);
    } else {
      const addUserVote = {
        id: id,
        vote: { isLiked: isLiked, isDisliked: isDisliked },
      };
      const addUserVoteToServer = {
        votes: [...loggedUserData?.votes, addUserVote ?? []],
      };

      setLoggedUserData({
        ...loggedUserData,
        votes: [...loggedUserData?.votes, addUserVote],
      });
      patchDataToServer(`users/${loggedUserData.id}`, addUserVoteToServer);
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      updateUserVote(id);
    }
  }, [isLiked, isDisliked]);

  const deleteQuestion = (id) => {
    fetch(`http://localhost:3001/questions/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    const newQuestionsData = questions.filter((question) => question.id !== id);

    setQuestion([...newQuestionsData]);

    const newCommentsData = comments.filter(
      (comments) => comments.questionID !== id
    );

    const deletedQuestionComments = comments.filter(
      (comments) => comments.questionID === id
    );

    deletedQuestionComments.forEach((comment) => {
      fetch(`http://localhost:3001/comments/${comment.id}`, {
        method: "DELETE",
      }).then((res) => res.json());
    });

    setComments([...newCommentsData]);
  };
  return (
    <>
      <Header />
      <OpenedQuestionSection>
        <QuestionTopBlock>
          <QuestionDataBlock>
            <MediumTextBold>{openedQuestion?.title}</MediumTextBold>

            <div>{openedQuestion?.author}</div>
            <QuestionDetails>
              <SmallTextRegulat>
                Asked {new Date(openedQuestion?.date).toLocaleString()}
              </SmallTextRegulat>
              <SmallTextRegulat>
                Viewed {openedQuestion?.viewed}
              </SmallTextRegulat>
              {openedQuestion?.edited !== "" ? (
                <SmallTextRegulat>
                  Edited {openedQuestion?.edited}
                </SmallTextRegulat>
              ) : null}
            </QuestionDetails>
          </QuestionDataBlock>
        </QuestionTopBlock>
        <MoreAboutQuestion>
          {isLoggedIn ? (
            <ButtonsBlock>
              <Button onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? arrowUpGreen : arrowUpGrey}
              </Button>
              <Button onClick={() => setIsDisliked(!isDisliked)}>
                {isDisliked ? arrowDownRed : arrowDownGrey}
              </Button>
            </ButtonsBlock>
          ) : (
            <div></div>
          )}

          <QuestionInfo>
            <LargeTextRegular>{openedQuestion?.question}</LargeTextRegular>
          </QuestionInfo>
          {isLoggedIn && loggedUserData.id === openedQuestion.authorID ? (
            <AuthorOptionsBlock>
              <button
                onClick={() => {
                  deleteQuestion(id);
                  navigate("/");
                }}
              >
                Delete
              </button>
              <Link to={`/edit/${id}`}>Edit</Link>
            </AuthorOptionsBlock>
          ) : null}
        </MoreAboutQuestion>

        <Comments questionID={id} />
      </OpenedQuestionSection>
    </>
  );
};

const OpenedQuestionSection = styled.section`
  min-width: 23.75rem;
  padding: 0 0.625rem;
  margin: 0 auto;

  @media ${theme.device.laptop} {
    max-width: 53.125rem;
  }
`;

const QuestionTopBlock = styled.div`
  display: flex;
  padding: 1.25rem 0;
`;

const QuestionDataBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

  @media ${theme.device.tablet} {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
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

const QuestionDetails = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.3125rem;
`;

const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoreAboutQuestion = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr;
  padding-bottom: 1.875rem;
  margin-bottom: 2rem;
  border-bottom: 0.0938rem solid #e0e0e0;
`;

const QuestionInfo = styled.div`
  @media ${theme.device.tablet} {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h3 {
      font-size: 1.5rem;
      line-height: 1.75rem;
    }
    h2 {
      font-size: 1.2rem;
      line-height: 1.7rem;
    }

    h5 {
      font-size: 1.125rem;
    }
  }
`;

const AuthorOptionsBlock = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;

  button {
    color: ${theme.colors.white};
    background: ${theme.colors.primaryDarkBluish};
    padding: 0.3125rem;
    border: none;
    border-radius: 0.625rem;
  }

  a {
    color: ${theme.colors.white};
    background: ${theme.colors.primaryDarkBluish};
    text-align: center;
    padding: 0.3125rem;
    border-radius: 0.625rem;
    min-width: 3.125rem;
  }
`;
