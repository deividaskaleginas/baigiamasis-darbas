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
      (comments) => comments.questionID == id
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

            <div>{openedQuestion?.authorID}</div>
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
          {isLoggedIn && (
            <ButtonsBlock>
              <Button onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? (
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0607 0.939341C12.4749 0.353554 11.5251 0.353554 10.9393 0.939341L1.3934 10.4853C0.807611 11.0711 0.807611 12.0208 1.3934 12.6066C1.97919 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.939341ZM13.5 22V2H10.5V22H13.5Z"
                      fill="#36CB69"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0607 0.939341C12.4749 0.353554 11.5251 0.353554 10.9393 0.939341L1.3934 10.4853C0.807611 11.0711 0.807611 12.0208 1.3934 12.6066C1.97919 13.1924 2.92893 13.1924 3.51472 12.6066L12 4.12132L20.4853 12.6066C21.0711 13.1924 22.0208 13.1924 22.6066 12.6066C23.1924 12.0208 23.1924 11.0711 22.6066 10.4853L13.0607 0.939341ZM13.5 22V2H10.5V22H13.5Z"
                      fill="#808080"
                    />
                  </svg>
                )}
              </Button>
              <Button
                background={isDisliked ? "red" : "blue"}
                onClick={() => setIsDisliked(!isDisliked)}
              >
                {isDisliked ? (
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9393 21.0607C11.5251 21.6464 12.4749 21.6464 13.0607 21.0607L22.6066 11.5147C23.1924 10.9289 23.1924 9.97919 22.6066 9.3934C22.0208 8.80761 21.0711 8.80761 20.4853 9.3934L12 17.8787L3.51472 9.3934C2.92893 8.80761 1.97919 8.80761 1.3934 9.3934C0.807611 9.97919 0.807611 10.9289 1.3934 11.5147L10.9393 21.0607ZM10.5 0L10.5 20H13.5L13.5 0L10.5 0Z"
                      fill="#ED6571"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9393 21.0607C11.5251 21.6464 12.4749 21.6464 13.0607 21.0607L22.6066 11.5147C23.1924 10.9289 23.1924 9.97919 22.6066 9.3934C22.0208 8.80761 21.0711 8.80761 20.4853 9.3934L12 17.8787L3.51472 9.3934C2.92893 8.80761 1.97919 8.80761 1.3934 9.3934C0.807611 9.97919 0.807611 10.9289 1.3934 11.5147L10.9393 21.0607ZM10.5 0L10.5 20H13.5L13.5 0L10.5 0Z"
                      fill="#888888"
                    />
                  </svg>
                )}
              </Button>
            </ButtonsBlock>
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
  padding: 20px 0;
`;

const QuestionDataBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9375rem;

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

const QuestionDetails = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  //background-color: ${(props) => props.background || "blue"};
  background: none;
  border: none;
  padding: 5px;
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

  border-bottom: 1.5px solid #e0e0e0;
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
