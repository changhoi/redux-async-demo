import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import post, { rootSaga } from "./modules/post/sagaReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ post });

export default createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
); // 두 번째 인수는 초기 상태를 지정할 수 있음

sagaMiddleware.run(rootSaga);
