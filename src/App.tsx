import React from "react";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import PostScreen from "./screens/PostScreen";
import rootReducer from "./redux/configureStore";

const store = createStore(rootReducer, applyMiddleware(logger)); // 두 번째 인수는 초기 상태를 지정할 수 있음

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PostScreen />
    </Provider>
  );
};

export default App;
