import { take,all } from "redux-saga/effects";
import counterSaga from "./counterSaga";
import studentSaga from "./studentSaga";

export default function* rootSaga(){
    //监听所有的任务 所有任务完成之后 整个生成器函数才会执行完成
    yield all([counterSaga(),studentSaga()]);
    console.log('所有的任务执行完毕')
}