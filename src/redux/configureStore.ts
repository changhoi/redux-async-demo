import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import post from "./modules/post";

const rootReducer = combineReducers({ post });

export default createStore(rootReducer, applyMiddleware(thunk, logger)); // 두 번째 인수는 초기 상태를 지정할 수 있음
