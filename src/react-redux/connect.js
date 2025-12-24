import React from "react";
import ctx from "./context";

function connect(mapStateToProps,mapDispatchToProps) {
  return function (Component) {
    return class extends React.Component {
      static contextType = ctx;
      constructor(props) {
        super(props);
        console.log(this.context);
      }
      render() {
        console.log(this.context);
        return null;
      }
    };
  };
}

export default connect;
