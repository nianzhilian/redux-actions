// import React,{useState,useEffect,useContext,useMemo} from "react";
// import ctx from "./context";

// function connect(mapStateToProps,mapDispatchToProps) {
//   return function (Component) {
//     const MemoizedComponent = React.memo(Component);
//     function Temp(props){
//       const store = useContext(ctx);
//       //使用useMemo 浅比较 防止状态发生变化导致子组件进行不必要的渲染
//       const mapState = useMemo(()=>{
//         return mapStateToProps?mapStateToProps(store.getState()):{}
//       },[store,mapStateToProps])
//       const [state, setstate] = useState(mapState);
//       useEffect(() => {
//         const unlistener = store.subscribe(()=>{
//           setstate(mapStateToProps && mapStateToProps(store.getState()))
//         })
//         return () => {
//           //取消订阅
//           unlistener && unlistener();
//         };
//       }, [store]);

//       function getEvents(){
//         return mapDispatchToProps(store.dispatch);
//       }
//       let handles = {};
//       if(mapDispatchToProps){
//         handles = getEvents();
//       }
//       return <MemoizedComponent {...state} {...handles} />
//     }
//     Temp.displayName = MemoizedComponent.displayName || MemoizedComponent.name;
//     return Temp;
//   };
// }

// export default connect;

//使用函数组件和 自定义hook进行封装
// import React,{ useState, useEffect, useContext, useMemo, useCallback } from "react";
// import ctx from "./context";

// // 浅比较工具（保持不变）
// const shallowEqual = (objA, objB) => {
//   if (objA === objB) return true;
//   if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
//     return false;
//   }
//   const keysA = Object.keys(objA);
//   const keysB = Object.keys(objB);
//   if (keysA.length !== keysB.length) return false;
//   for (const key of keysA) {
//     if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
//       return false;
//     }
//   }
//   return true;
// };

// function useConnect(mapStateToProps, mapDispatchToProps) {
//   // 1. 获取全局 store（顶层调用 Hook，合规）
//   const store = useContext(ctx);
//   if (!store) {
//     throw new Error("useConnect 必须在 Context.Provider 内部使用");
//   }

//   // 2. 初始化映射后的 state（顶层调用，合规）
//   const [mappedState, setMappedState] = useState(() => {
//     return mapStateToProps ? mapStateToProps(store.getState()) : {};
//   });

//   // 3. 订阅 store 变化（顶层调用 useEffect，合规）
//   useEffect(() => {
//     const handleStoreChange = () => {
//       const newState = mapStateToProps ? mapStateToProps(store.getState()) : {};
//       if (!shallowEqual(mappedState, newState)) {
//         setMappedState(newState);
//       }
//     };

//     const unsubscribe = store.subscribe(handleStoreChange);
//     return () => unsubscribe();
//   }, [store, mappedState, mapStateToProps]);

//   // 4. 修复核心：缓存 dispatch 方法（不嵌套 Hooks）
//   // 关键点：store.dispatch 引用永远不变，因此直接在 useMemo 内返回绑定 dispatch 的方法即可
//   const mappedDispatch = useMemo(() => {
//     if (!mapDispatchToProps) return {};

//     // 调用 mapDispatchToProps 获取方法对象
//     const dispatchProps = mapDispatchToProps(store.dispatch);
//     const memoizedDispatch = {};

//     // 遍历方法，直接绑定 dispatch（无需 useCallback，因为 dispatch 引用稳定）
//     Object.keys(dispatchProps).forEach((key) => {
//       console.log(dispatchProps)
//       // 由于 store.dispatch 永远不变，这里返回的函数引用也会稳定
//       memoizedDispatch[key] = (...args) => dispatchProps[key](...args);
//     });

//     return memoizedDispatch;
//   }, [store.dispatch, mapDispatchToProps]); // 依赖仅 dispatch 和映射函数

//   // 5. 合并 state 和 dispatch 并缓存（顶层调用 useMemo，合规）
//   return useMemo(
//     () => ({ ...mappedState, ...mappedDispatch }),
//     [mappedState, mappedDispatch]
//   );
// }


// function connect(mapStateToProps, mapDispatchToProps) {
//   return (Component) => {
//     const Wrapper = (props) => {
//       const connectProps = useConnect(mapStateToProps, mapDispatchToProps);
//       return <Component {...props} {...connectProps} />;
//     };
//     Wrapper.displayName = `Connect(${Component.name})`;
//     return Wrapper;
//   };
// }

// export default connect;



//使用class组件进行封装连接函数
// import React from "react";
// import ctx from "./context";

// // 浅比较工具（保持原有逻辑不变）
// const shallowEqual = (objA, objB) => {
//   if (objA === objB) return true;
//   if (
//     typeof objA !== "object" ||
//     objA === null ||
//     typeof objB !== "object" ||
//     objB === null
//   ) {
//     return false;
//   }
//   const keysA = Object.keys(objA);
//   const keysB = Object.keys(objB);
//   if (keysA.length !== keysB.length) return false;
//   for (const key of keysA) {
//     if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
//       return false;
//     }
//   }
//   return true;
// };

// // 核心 Connect 类组件（替代原来的 useConnect Hook）
// class ConnectComponent extends React.Component {
//   constructor(props,context) {
//     super(props,context);
//     // 从 Context 中获取 store
//     this.store = this.context;
//     if (!this.store) {
//       throw new Error("Connect 必须在 Context.Provider 内部使用");
//     }

//     const { mapStateToProps, mapDispatchToProps } = this.props;
//     // 初始化映射后的 state
//     this.state = {
//       mappedState: mapStateToProps ? mapStateToProps(this.store.getState()) : {},
//     };

//     // 缓存 dispatch 方法（绑定 this 并保证引用稳定）
//     this.mappedDispatch = this.createMappedDispatch(mapDispatchToProps);
//     // 缓存订阅函数
//     this.unsubscribe = null;
//   }

//   // 上下文类型声明（Class 组件获取 Context 的方式）
//   static contextType = ctx;

//   // 创建映射后的 dispatch 方法（替代原来的 useMemo 逻辑）
//   createMappedDispatch(mapDispatchToProps) {
//     if (!mapDispatchToProps) return {};

//     const dispatchProps = mapDispatchToProps(this.store.dispatch);
//     const memoizedDispatch = {};

//     Object.keys(dispatchProps).forEach((key) => {
//       // 绑定函数并保证引用稳定（因为 store.dispatch 引用不变）
//       memoizedDispatch[key] = (...args) => dispatchProps[key](...args);
//     });

//     return memoizedDispatch;
//   }

//   // 处理 store 变化的回调函数
//   handleStoreChange = () => {
//     const { mapStateToProps } = this.props;
//     if (!mapStateToProps) return;

//     const newState = mapStateToProps(this.store.getState());
//     // 浅比较，避免不必要的重渲染
//     if (!shallowEqual(this.state.mappedState, newState)) {
//       this.setState({ mappedState: newState });
//     }
//   };

//   // 组件挂载时订阅 store
//   componentDidMount() {
//     // 订阅 store 变化，并保存取消订阅函数
//     this.unsubscribe = this.store.subscribe(this.handleStoreChange);
//   }
  
//   // 组件更新时检查依赖变化（替代 Hook 的依赖数组逻辑）
//   componentDidUpdate(prevProps) {
//     const { mapStateToProps, mapDispatchToProps } = this.props;
//     // 如果映射函数变化，重新计算 state 和 dispatch
//     if (
//       prevProps.mapStateToProps !== mapStateToProps ||
//       prevProps.mapDispatchToProps !== mapDispatchToProps
//     ) {
//       // 重新计算 mappedState
//       const newMappedState = mapStateToProps
//         ? mapStateToProps(this.store.getState())
//         : {};
//       this.setState({ mappedState: newMappedState });

//       // 重新创建 mappedDispatch
//       this.mappedDispatch = this.createMappedDispatch(mapDispatchToProps);
//     }
//   }

//   // 组件卸载时取消订阅
//   componentWillUnmount() {
//     if (this.unsubscribe) {
//       this.unsubscribe();
//     }
//   }

//   // 合并 props（替代 useMemo 合并逻辑）
//   getMergedProps() {
//     return { ...this.state.mappedState, ...this.mappedDispatch };
//   }

//   render() {
//     const { Component, forwardedRef, ...restProps } = this.props;
//     // 合并所有 props 并传递给被包装组件
//     const mergedProps = {
//       ...restProps,
//       ...this.getMergedProps(),
//     };

//     return <Component ref={forwardedRef} {...mergedProps} />;
//   }
// }

// // 高阶函数 connect（保持原有对外接口）
// function connect(mapStateToProps, mapDispatchToProps) {
//   return function wrapWithConnect(WrappedComponent) {
//     // 包装组件（处理 ref 转发）
//     const ConnectWrapper = React.forwardRef((props, ref) => {
//       return (
//         <ConnectComponent
//           Component={WrappedComponent}
//           mapStateToProps={mapStateToProps}
//           mapDispatchToProps={mapDispatchToProps}
//           forwardedRef={ref}
//           {...props}
//         />
//       );
//     });

//     // 设置 displayName，方便调试
//     ConnectWrapper.displayName = `Connect(${
//       WrappedComponent.displayName || WrappedComponent.name || "Component"
//     })`;

//     return ConnectWrapper;
//   };
// }

// export default connect;


import React,{useState,useMemo,useEffect,useContext} from 'react'
import ctx from "./context";

function useConnect(mapStateToProps,mapDiapatchToProps){
  const store = useContext(ctx);
  const [mapstate, setMapstate] = useState(()=>{
    //惰性初始化state
    return mapStateToProps && mapStateToProps(store.getState())
  })
  useEffect(() => {
    return store.subscribe(()=>{
      const newState = mapStateToProps && mapStateToProps(store.getState());
      setMapstate(newState)
    });
  }, [store,mapStateToProps]);

  const mapDispatch =  useMemo(()=>{
    if(!mapDiapatchToProps){
      return {};
    }
    const dispatchProps = mapDiapatchToProps && mapDiapatchToProps(store.dispatch);
    const memoryDipatch = {};

    Object.keys(dispatchProps).forEach((key)=>{
      memoryDipatch[key] = (...args)=>dispatchProps[key](...args)
    })
    
    return memoryDipatch;
  },[store.dispatch,mapDiapatchToProps])

  return useMemo(()=>{
    return {
      ...mapstate,
      ...mapDispatch
    }
  },[mapstate,mapDispatch])
}

function connect(mapStateToProps,mapDiapatchToProps){
  return function(Component){
    const Wrap = (props)=>{
      const mergedProps = useConnect(mapStateToProps,mapDiapatchToProps);
      return (
        <Component {...props} {...mergedProps} />
      )
    }
    Wrap.displayName = `Connect(${Component.name})`;
    return Wrap;
  }
}

export default connect;