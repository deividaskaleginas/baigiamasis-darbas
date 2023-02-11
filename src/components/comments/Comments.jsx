import { useContext, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";

import ForumQuestionsContext from "../../context/forumQuestionsContext";
import ForumUserContext from "../../context/forumUserContext";
import { FormInput } from "../formInput/FormInput";

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
      label: "Comment",
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
    console.log(commentData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment();
  };

  return (
    <>
      <h1>Comments:</h1>
      <CommentsBlock>
        {allComments.map(({ date, comment, userID }) => {
          const { avatar, username } = users.find((user) => user.id === userID);
          return (
            <UserCommentBlock key={comment.id}>
              <div>
                <span>{date}</span>
              </div>
              <CommentUserData>
                <img src={avatar} alt="" />
                <span>{username}</span>
              </CommentUserData>
              <UserComment>
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
  gap: 15px;
  padding: 0 20px;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
  }
`;

const UserComment = styled.div`
  padding: 0 20px;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RegistrationFormContainer = styled.div`
  border-radius: 10px;
  width: 300px;
  margin: 0 20px;

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
`;

const UserCommentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;