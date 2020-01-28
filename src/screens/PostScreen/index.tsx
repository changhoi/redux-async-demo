import PostScreen from "./PostScreen";
import { connect } from "react-redux";
import { getPost } from "../../redux/modules/post";

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    ...ownProps,
    ...state
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    ...ownProps,
    getPost: async () => dispatch(getPost())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
