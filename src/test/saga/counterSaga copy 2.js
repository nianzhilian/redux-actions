import { takeEvery,delay,put, fork,take, cancel} from "redux-saga/effects";
import { actionTypes,dincrease,increase } from "../redux/actions";

function* asyncIncrease(){
    console.log('加任务执行了')
    yield delay(2000);
    yield put(increase());
}

function* asynDincrease(){
    yield delay(2000)
    yield put(dincrease())
}

function* newTask(){
    console.log('新的任务执行了')
    let task;
    while (true) {
        //只要监听到这个action
        yield take(actionTypes.ASYNC_INCREASE);

        //如果连着调用还没等到上次任务结束就有开始 触发监听了 则取消之前的任务
        if(task){
            yield cancel(task);
            console.log('之前的任务被取消掉了')
        }

        //就会执行下面的任务 下面的任务会同步执行完成
        task = yield fork(asyncIncrease);
        console.log(task)
    }
}

export default function*(){
    //fork指令不会阻塞
    yield fork(newTask)
    yield takeEvery(actionTypes.ASYNC_DINCREASE,asynDincrease);
    console.log('监听asynDincrease')
}