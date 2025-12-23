import { takeEvery,delay,put, fork,take, cancel} from "redux-saga/effects";
import { actionTypes,dincrease,increase } from "../redux/actions";
//模拟一个自动增加数字的任务
function* newTask(){
    let task;
    //监听action
    yield take(actionTypes.AUTO_INCRESS);
    if(task){
        yield cancel(task);
    }
    task = yield fork(function*(){
        while(true){
            yield delay(2000)
            yield put(increase())
        }
    })
}
export default function*(){
    //fork指令不会阻塞
    yield fork(newTask)
    console.log('监听asynDincrease')
}