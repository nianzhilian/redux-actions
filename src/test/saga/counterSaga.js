import {
  takeEvery,
  delay,
  put,
  fork,
  take,
  cancel,
  takeLatest,
  cancelled,
  call,
  race
} from "redux-saga/effects";
import { actionTypes, dincrease, increase } from "../redux/actions";

function* task(){
    while(true){
        let res = yield take(actionTypes.AUTO_INCRESS);
        console.log(res)
        yield race({
            autoIncress:call(function*(){
                while(true){
                    yield delay(5000);
                    yield put(increase())
                }
            }),
            cancle:take(actionTypes.STOP_INCRESS)
        })
        console.log('这里会立马执行吗')
    }
}

//谁先完成则返回谁 类似与 promise.race
export default function* (){
   yield fork(task);
   console.log('监听autoIncress')
} 
