import { call, put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";
import { ENDPOINTS } from "../../../constants";

// Action Types

export const FETCH_POST_FAIL = "FETCH_POST_FAIL";
export const FETCH_POST_START = "FETCH_POST_START";
export const FETCH_POST_END = "FETCH_POST_END";
export const FETCHING_POST = "FETCHING_POST";

// Saga

const fetchPost = () =>
  axios.get(ENDPOINTS.GET_POSTS, { baseURL: ENDPOINTS.BASE_URL });

function* fetchPostList() {
  try {
    const { data: postList } = yield call(fetchPost);
    yield put({ type: FETCH_POST_END, payload: { postList } });
  } catch (e) {
    yield put({ type: FETCH_POST_FAIL, payload: e });
  }
}

function* postSaga() {
  yield takeEvery(FETCHING_POST, fetchPostList);
}

export function* rootSaga() {
  yield all([postSaga()]);
}

// Action Creators

export function getPost() {
  return { type: FETCHING_POST };
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

    case FETCH_POST_FAIL:
      return applyFetchPostFail(state, action.payload);
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

const applyFetchPostFail = (state: any, payload: any) => {
  const error = { title: payload.message, body: JSON.stringify(payload.stack) };
  state.postList.push(error);
  return {
    ...state
  };
};

// Default Reducer export

export default reducer;
