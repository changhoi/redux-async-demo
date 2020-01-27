# React로 Redux 비동기를 동작시켜보자

새롭게 공동 창업을 시작한 이후로 개인적으로 공부하고 글 쓸 시간이 확 줄어서 계획했던 글을 쓰지를 못 하고 있다 (거창하게 JS에서 공부하기 어려웠던 부분들을 정리해보겠다고 목차만 써놨는데 공부만 하고 정리하지 못 하고 있다). 연휴를 맞아서 개인적인 시간이 남기도 하고 새로 빌딩 중인 앱에 리덕스를 붙여야 하는 상황이라 개별적으로 평소에 리덕스의 비동기를 위한 미들웨어를 공부해보려고 한다. 사실 비동기 처리를 위해서 미들웨어를 사용해야 한다는 것에 대해서 잘 이해를 못 했다. 자바스크립트는 기본적으로 비동기 처리가 간단하게 되는데 왜 비동기를 위한 미들웨어가 필요할까? 라는 생각이 들고 지금 글을 쓰는 과정에서도 그 부분을 해결하기 위한 관점이 가장 클 것 같다. 우선 프로젝트는 `CRA`를 통해 구성했다. 그리고 필요한 패키지들을 설치했다.

```bash
npx create-react-app . --typescript

yarn add react-redux redux axios styled-components
yarn add @types/{styled-components,react-redux} -D # redux는 타입스크립트로 구성되어 있어서 설치할 필요가 없다고 함
```

## 리덕스를 붙이기 전

`screens/PostScreen`을 Container, Presenter 구조로 나눠서 api로 데이터를 받아오는 로직을 `PostScreen.tsx`에 담고, CSS와 관련된 컴포넌트들을 `Presenter.tsx`에 담도록 했다.

```tsx
import React from "react";
import styled from "styled-components";

interface IProps {
  postList: Array<{ title: string; body: string; id: number }>;
}

const Presenter: React.FC<IProps> = props => {
  const { postList } = props;
  return (
    <Wrapper>
      <Container>
        {postList?.length &&
          postList.map((post, index) => (
            <PostDiv key={index}>
              <div>{post.title}</div>
              <div>{post.body}</div>
            </PostDiv>
          ))}
        <PostDiv></PostDiv>
      </Container>
    </Wrapper>
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
```

```tsx
// src/screen/PostScreen.tsx
import React, { useState, useEffect } from "react";
import Presenter from "./Presenter";
import Axios from "axios";
import { ENDPOINTS } from "../../../constants";

const PostScreen: React.FC = props => {
  const [postList, setPostList] = useState([]);

  const getPost = async () => {
    const { data: postList } = await Axios.get(ENDPOINTS.GET_POSTS, {
      baseURL: ENDPOINTS.BASE_URL
    });
    setPostList(postList);
  };

  useEffect(() => {
    getPost();
  });
  return <Presenter postList={postList} />;
};

export default PostScreen;
```

## 리덕스 구성하기

위와 같은 상황에서 글 쓰기와 불러오기를 `useEffect`에 들어가는 `getPost`와 같은 형태가 아니라 모듀 리덕스를 통해 동작하도록 바꿔보자.
`src/redux/configureStore.ts`를 만들고 아래 폴더에 `src/redux/modules/`를 만들어서 아래 리덕스 모듈들을 ducks 형태로 만들어서 전체적인 리덕스를 구성해보려고 한다.
`src/redux/modules/post.ts`를 만들고 ducks 형태로 리덕스 모듈을 구성하자.
