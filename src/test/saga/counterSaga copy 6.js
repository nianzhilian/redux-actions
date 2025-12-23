import {
  takeEvery,
  delay,
  put,
  fork,
  take,
  cancel,
  takeLatest,
  cancelled,
} from "redux-saga/effects";
import { actionTypes, dincrease, increase } from "../redux/actions";

//可以控制下面的流程
//自动增加  手动停止  自动增加 手动停止

function* newTask() {
  while (true) {
    yield take(actionTypes.AUTO_INCRESS);
    const task = yield fork(function* () {
      try {
        while(true){
            yield delay(5000);
            yield put(increase());
        }
      } finally {
        console.log('这里会执行吗')
        if (yield cancelled()) {
          console.log("自动增加任务被取消掉了");
        }
      }
    });
    console.log('fork任务之后 这里不阻塞 开启一个任务之后 会打印')
    yield take(actionTypes.STOP_INCRESS);
    console.log('这里没监听到action并不会触发执行')
    yield cancel(task)
  }
}

//利用fork实现一个 takeLatest指令  其原理是 开启一个监听任务 监听到了之后
//会先自动的取消之前的任务 并开启新的任务监听 每次都是同样的操作

export default function* () {
  yield fork(newTask);
  console.log("监听autoIncress监听到了");
}
