import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
let _prevLocation, _newLocation, _action, _unblock;
function GuardHelp(props) {
  let location = useLocation();
  let history = useHistory();
  //在这里处理只阻塞一次和只监听一次
  const [hasBlocked, setBlocked] = useState(false);
  const [hasListen, setListen] = useState(false);
  useEffect(() => {
    let unblock = null;
    let unhistory = null;
    if (!hasBlocked) {
      //添加路由跳转阻塞
      unblock = history.block((newLocation, ac) => {
        // _prevLocation = location;
        // _newLocation = newLocation;
        // _action = ac;
        // _unblock = unblock;
        //实例化一个promise对象时 里面的执行器函数会立马执行 这是同步的操作
        return new Promise((resolve, reject) => {
          if (props.onBeforeChange) {
            props.onBeforeChange(
              location,
              newLocation,
              ac,
              resolve,
              unblock,
              "是否要跳转"
            );
          } else {
            resolve(true);
          }
          setBlocked(true);
        });
      });
    }
    if (!hasListen) {
      //添加路由跳转监听
      unhistory = history.listen((newLocation, ac) => {
        console.log(
          location,
          newLocation,
          ac,
          newLocation.pathname != location.pathname
        );
        if (props.onPageChange) {
          props.onPageChange(location, newLocation, ac, unhistory);
          //setListen(true);
          //手动取消监听  仅仅监听一次
          //unhistory();
        }
      });
    }

    return () => {
      unhistory && unhistory();
      unblock && unblock();
      //   unhistory?.();
      //   unblock?.();
    };
  }, [history, location, hasBlocked, hasListen]);
  return null;
}

class RouterGuard extends React.Component {
  constructor(props) {
    super(props);
  }
  // handleConfirm = (msg,cb)=>{
  //     if(this.props.onBeforeChange){
  //         this.props.onBeforeChange(_prevLocation,_newLocation,_action,cb,_unblock,msg);
  //     }else{
  //         cb(true)
  //     }
  // }
  render() {
    return (
      <Router>
        <GuardHelp
          onPageChange={this.props.onPageChange}
          onBeforeChange={this.props.onBeforeChange}
        />
        {this.props.children}
      </Router>
    );
  }
}

export default RouterGuard;
