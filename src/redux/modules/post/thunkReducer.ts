// imports
import axios from "axios";
import { ENDPOINTS } from "../../../constants";

// Action Types

export const FETCH_POST_START = "FETCH_POST_START";
export const FETCH_POST_END = "FETCH_POST_END";
export const FETCHING_POST = "FETCHING_POST";

// Action Creators

export function getPost() {
  return async (dispatch: Function) => {
    dispatch(startPost());
    const { data: postList } = await axios.get(ENDPOINTS.GET_POSTS, {
      baseURL: ENDPOINTS.BASE_URL
    });
    return dispatch(endPost(postList));
  };
}

export function startPost() {
  return { type: FETCH_POST_START };
}

export function endPost(postList: Array<any>) {
  return { type: FETCH_POST_END, payload: { postList } };
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
    case FETCH_POST_END:
      const { postList } = action.payload;
      return applyFetchPostEnd(state, postList);

    case FETCH_POST_START:
      return applyFetchPostStart(state);
    default:
      return state;
  }
}

// Reducer Functions

const applyFetchPostStart = (state: any) => {
  return { ...state, isFetching: true };
};

const applyFetchPostEnd = (state: any, postList: Array<any>) => {
  return {
    ...state,
    postList,
    isFetching: false
  };
};

// Default Reducer export

export default reducer;
