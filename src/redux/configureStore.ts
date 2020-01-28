import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import postThunk from "./modules/post/thunkReducer";
import createSagaMiddleware from "redux-saga";
import postSaga, { rootSaga } from "./modules/post/sagaReducer";
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ post: postThunk });

export default createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, thunk, logger)
); // 두 번째 인수는 초기 상태를 지정할 수 있음

sagaMiddleware.run(rootSaga);
