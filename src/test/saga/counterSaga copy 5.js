import { takeEvery,delay,put, fork,take, cancel, takeLatest} from "redux-saga/effects";
import { actionTypes,dincrease,increase } from "../redux/actions";
//使用
let task = false, isStop = false;

function* stopIncress(){
    if(task){
        yield cancel(task);
    }
}

function* newTask(){
    while (true) {
        yield take(actionTypes.AUTO_INCRESS);
        yield* stopIncress();
        task = yield fork(function* (){
            while(true){
                yield delay(2000)
                yield put(increase())
            }
        })
    }
}

function* stopAutoIncress(){
    yield* stopIncress();
}

//利用fork实现一个 takeLatest指令  其原理是 开启一个监听任务 监听到了之后
//会先自动的取消之前的任务 并开启新的任务监听 每次都是同样的操作



export default function*(){
    yield fork(newTask);
    //开启一个停止的 action监听器
    yield takeEvery(actionTypes.STOP_INCRESS,stopAutoIncress);
    console.log('监听asynDincrease')
}