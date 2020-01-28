import React from "react";
import Presenter from "./Presenter";

interface IProps {
  getPost: Function;
  postList: Array<any>;
}

const PostScreen: React.FC = props => {
  const { postList, getPost } = props as IProps;

  // const getPost = async () => {
  //   const { data: postList } = await Axios.get(ENDPOINTS.GET_POSTS, {
  //     baseURL: ENDPOINTS.BASE_URL
  //   });
  //   setPostList(postList);
  // };

  const onClick = async () => {
    await getPost();
  };

  return <Presenter onClick={onClick} postList={postList} />;
};

export default PostScreen;
