import PostScreen from "./PostScreen";
import { connect } from "react-redux";
import { getPost } from "../../redux/modules/post/thunkReducer";

const mapStateToProps = (state: any, ownProps: any) => {
  const { post } = state;
  return {
    ...ownProps,
    ...post
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    ...ownProps,
    getPost: () => dispatch(getPost())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
