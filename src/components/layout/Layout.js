import React from "react";
import PropTypes from 'prop-types'
//只运行一次该模块不做任何的导入
import "./index.css";

class Layout extends React.Component {
    static propTypes = {
        header:PropTypes.element,
        aside:PropTypes.element,
        children:PropTypes.element
    }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <header className="header">{this.props.header}</header>
        <div className="middle">
          <div className="aside">{this.props.aside}</div>
          <div className="main">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Layout;
