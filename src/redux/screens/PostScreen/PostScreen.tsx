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
