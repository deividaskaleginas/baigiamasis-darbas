import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import uniqid from "uniqid";

import ForumQuestionsContext from "../../context/forumQuestionsContext";
import ForumUserContext from "../../context/forumUserContext";
import { theme } from "../../styles/theme";
import { FormInput } from "../formInput/FormInput";
import { SmallTextRegulat } from "../typography/Typography";

export const Comments = ({ questionID }) => {
  const { comments, setComments } = useContext(ForumQuestionsContext);
  const { users, loggedUserData, isLoggedIn } = useContext(ForumUserContext);

  const [values, setValues] = useState({
    comment: "",
  });

  const inputs = [
    {
      id: 1,
      name: "comment",
      type: "textarea",
      placeholder: "Comment",
      errorMessage: "Comment should be 3-240 characters",
      pattern: "^.{3,16}$",
      label: "Comment",
      required: true,
    },
  ];

  const allComments = comments.filter(
    (comments) => comments.questionID === questionID
  );

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createComment = () => {
    const commentData = {
      questionID: questionID,
      id: uniqid(),
      date: new Date().toLocaleString(),
      userID: loggedUserData.id,
      comment: values.comment,
    };
    setComments([...comments, commentData]);

    fetch("http://localhost:3001/comments/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment();
    values.comment = "";
  };

  const deleteComment = (id) => {
    fetch(`http://localhost:3001/comments/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    const newCommentsData = comments.filter((comment) => comment.id !== id);
    setComments([...newCommentsData]);
  };

  return (
    <>
      <h1>Comments:</h1>
      <CommentsBlock>
        {allComments.map(({ date, comment, userID, id, edited }) => {
          const { username } = users.find((user) => user.id === userID);
          return (
            <UserCommentBlock key={id}>
              <PostingData>
                <span>Posted: {date}</span>
                {edited && <SmallTextRegulat>Edited {edited}</SmallTextRegulat>}
              </PostingData>
              {isLoggedIn && loggedUserData.id === userID ? (
                <AuthorOptionsBlock>
                  <button onClick={() => deleteComment(id)}>Delete</button>
                  <Link to={`/comment/${id}`}>Edit</Link>
                </AuthorOptionsBlock>
              ) : null}
              <CommentUserData>
                <span>User: {username}</span>
              </CommentUserData>
              <UserComment>
                <h5>Comment:</h5>
                <p>{comment}</p>
              </UserComment>
            </UserCommentBlock>
          );
        })}
      </CommentsBlock>
      {isLoggedIn && (
        <CommentContainer>
          <RegistrationFormContainer>
            <form onSubmit={handleSubmit}>
              <h1>Comment</h1>
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <div className="button-div">
                <button>Submit</button>
              </div>
            </form>
          </RegistrationFormContainer>
        </CommentContainer>
      )}
    </>
  );
};

const CommentUserData = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.9375rem;
  padding: 0 1.25rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
  }
`;

const UserComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 1.25rem;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegistrationFormContainer = styled.div`
  border-radius: 0.625rem;
  width: 18.75rem;
  margin: 0 1.25rem;

  form {
    h1 {
      text-align: center;
      color: #fff;
    }

    .button-div {
      display: flex;
      justify-content: center;
      padding: 0.625rem;
    }

    button {
      background-color: #ea5806;
      border: none;
      border-radius: 5px;
      color: #fff;
      padding: 0.3125rem 0;
      width: 50%;
    }

    button:hover {
      cursor: pointer;
      background-color: #c9520e;
    }
  }
`;

const CommentsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 1.25rem;
`;

const UserCommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.625rem 0.3125rem 1.25rem 0.3125rem;
  gap: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 0.3125rem;
`;

const PostingData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

const AuthorOptionsBlock = styled.div`
  display: flex;
  justify-content: flex-start;
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
