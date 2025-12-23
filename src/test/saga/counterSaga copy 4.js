import { takeEvery,delay,put, fork,take, cancel, takeLatest} from "redux-saga/effects";
import { actionTypes,dincrease,increase } from "../redux/actions";
//使用
let isStop = false;
function* newTask(){
    isStop = false;
    while (true) {
        yield delay(5000)
        if(isStop) break;
        yield put(increase())
    }
}
function stopIncress(){
    isStop = true;
}
export default function*(){
    //功能和takeEvery一样 不会阻塞  只不过 会自动取消之前的任务
    yield takeLatest(actionTypes.AUTO_INCRESS,newTask);
    //开启一个停止的 action监听器
    yield takeLatest(actionTypes.STOP_INCRESS,stopIncress);
    console.log('监听asynDincrease')
}