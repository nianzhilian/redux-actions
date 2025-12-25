import React from "react";
import ctx from "./context";

function connect(mapStateToProps,mapDispatchToProps) {
  return function (Component) {
    return class extends React.Component {
      static contextType = ctx;
      getEventHandlers(){
        return mapDispatchToProps(this.store.dispatch);
      }
      constructor(props,context) {
        super(props,context);
        this.store = this.context;
        this.state = mapStateToProps(this.store.getState())
        this.handles = this.getEventHandlers();
        this.unlistens = this.store.subscribe(()=>{
          this.setState(mapStateToProps(this.store.getState()))
        })
      }
      componentWillUnmount(){
        //组件卸载 清除监听
        if(this.unlistens){
          this.unlistens();
        }
      }
      render() {
        return <Component {...this.state} {...this.handles} />;
      }
    };
  };
}

export default connect;
