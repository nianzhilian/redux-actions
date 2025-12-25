import React,{useState,useEffect,useContext} from "react";
import ctx from "./context";

function connect(mapStateToProps,mapDispatchToProps) {
  return function (Component) {
    function Temp(props){
      const store = useContext(ctx);
      const [state, setstate] = useState(()=>{
        return mapStateToProps && mapStateToProps(store.getState());
      })
      useEffect(() => {
        const unlistener = store.subscribe(()=>{
          setstate(mapStateToProps && mapStateToProps(store.getState()))
        })
        return () => {
          //取消订阅
          unlistener && unlistener();
        };
      }, [store]);

      function getEvents(){
        return mapDispatchToProps(store.dispatch);
      }
      let handles = {};
      if(mapDispatchToProps){
        handles = getEvents();
      }
      return <Component {...state} {...handles} />
    }
    Temp.displayName = Component.displayName || Component.name;
    return Temp;
  };
}

export default connect;
