// imports
import axios from "axios";
import { ENDPOINTS } from "../../../constants";

// Action Types

export const GET_POST = "GET_POST";
export const CREATE_POST = "CREATE_POST";

// Action Creators

export function getPost() {
  return { type: GET_POST };
}

export function createPost(title: string, content: string) {
  return { type: CREATE_POST, title, content };
}

// Initial State

interface IPost {
  title: string;
  body: string;
}

export const initialState: { postList: Array<IPost>; newPost?: IPost } = {
  postList: []
};

// Reducer
function reducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_POST:
      return applyGetPost();
    case CREATE_POST:
      const { title, body } = action as IPost & { type: string };
      return applyCreatePost(state, title, body);
    default:
      return state;
  }
}

// Reducer Functions

const applyGetPost = async () => {
  const postList = await axios.get(ENDPOINTS.GET_POSTS, {
    baseURL: ENDPOINTS.BASE_URL
  });
  return {
    postList
  };
};

const applyCreatePost = async (state: any, title: string, body: string) => {
  const newPost = await axios.post(ENDPOINTS.GET_POSTS, {
    baseURL: ENDPOINTS.BASE_URL,
    body: { title, body }
  });
  return { ...state, newPost };
};

// Default Reducer export

export default reducer;
