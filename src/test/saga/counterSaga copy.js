import { takeEvery,delay,put } from "redux-saga/effects";
import { actionTypes,dincrease,increase } from "../redux/actions";

function* asyncIncrease(){
    yield delay(2000);
    yield put(increase());
}

function* asynDincrease(){
    yield delay(2000)
    yield put(dincrease())
}

export default function*(){
    //takeEvery 只起到一个监听的作用 不会阻塞
    //生成器函数很快就执行完毕了
    //但是这个任务永远不会完成一直处在监听状态
    let action1 = yield takeEvery(actionTypes.ASYNC_INCREASE,asyncIncrease);
    console.log(action1)
    let action2 = yield takeEvery(actionTypes.ASYNC_DINCREASE,asynDincrease)
    console.log(action2)
    console.log('counter生成器函数执行完成')
}