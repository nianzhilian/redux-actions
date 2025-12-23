import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
// import { thunk } from "redux-thunk";
import { bindActionCreators, thunk } from "../redux";
import rootReducers from "./redux";
import * as actions from "./redux/actions";
import { generateRandomUUID } from "../utils/util";
//import createSagaMiddleware from 'redux-saga'
import createSagaMiddleware from '../redux-saga'
import rootSaga from "./saga";
import rootSaga2 from "./saga/rootSaga2";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger1 = (store) => (next) => (action) => {
  console.log(
    "%c变化前的数据",
    "color: red; font-weight: bold;",
    store.getState()
  );
  next(action);
  console.log(
    "%c变化后的数据",
    "color: green; font-weight: bold;",
    store.getState()
  );
  console.log("");
};


//中间件聚合 最终 store.dispatch   指的是 applyMiddleware 中 第一个 中间件产生的dispatch生成器
//每一次dispatch 都会首先执行 thunk中的中间件链条

const sagaMid = createSagaMiddleware();
window.sagaMid = sagaMid;
window.store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(sagaMid, thunk, logger1))
);
//开启一个saga任务
sagaMid.run(rootSaga2);
console.log(window.store.dispatch);

window.bindTest = bindActionCreators(actions, window.store.dispatch);



function async(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('完成');
    }, 5000);
  })
}

//创建一个生成器函数
function* task(){
  console.log('函数体运行')
  let res = yield async();
  console.log('异步函数运行',res);
  res = yield async();
  console.log('异步函数又开始运行',res);
  res = yield 2;
  console.log('-----------------')
  console.log('这是一个普通函数',res)
  return '整个函数生成器执行完成'
}

window.testGentrator = task();

function run(){
  let itreator = task();
  next();
  function next(val){
    let res = itreator.next(val);
    console.log(res)
    if(res.done){
      return;
    }
    if(typeof res.value.then === 'function'){
      res.value.then((data)=>{
        next(data)
      })
    }else{
      next(res.value)
    }
  }
}