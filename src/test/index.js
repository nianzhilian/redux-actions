import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
// import { thunk } from "redux-thunk";
import { bindActionCreators, thunk } from "../redux";
// import createSagaMiddleware from '../redux-saga'
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./saga";
import * as actions from './redux-actions/actionsGeneratorFn'
import rootReducers from './redux-actions'

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
  composeEnhancers(applyMiddleware(sagaMid,thunk, logger1))
);
//开启一个saga任务
sagaMid.run(rootSaga);
console.log(actions)
window.bindTest = bindActionCreators(actions, window.store.dispatch);