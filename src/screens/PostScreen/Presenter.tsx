import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface IProps {
  postList: Array<{ title: string; body: string; id: number }>;
  onClick: MouseEventHandler;
}

const Presenter: React.FC<IProps> = props => {
  const { postList, onClick } = props;
  return (
    <>
      <button onClick={onClick}>가져오기</button>
      <Wrapper>
        <Container>
          {postList?.length &&
            postList.map((post, index) => (
              <PostDiv key={index}>
                <div>{post.title}</div>
                <div>{post.body}</div>
              </PostDiv>
            ))}
        </Container>
      </Wrapper>
    </>
  );
};

export default Presenter;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostDiv = styled.div`
  width: 90%;
  height: 10rem;
  border: 1px solid black;
  border-radius: 5px;
  margin: 1rem 0;
  padding: 0.25rem;
`;
