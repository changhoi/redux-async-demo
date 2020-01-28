import React from "react";

import { Provider } from "react-redux";
import PostScreen from "./screens/PostScreen";
import store from "./redux/configureStore";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PostScreen />
    </Provider>
  );
};

export default App;
