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

function async11(){
    //生成一个1000毫秒到5000毫秒之间的随机数
    let duration = Math.floor(Math.random()*4000 + 1000);
    console.log('duration:'+duration)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random()>0.5){
                resolve(increase())
            }else{
                resolve(dincrease());
            }
        }, duration);
    })
}

//谁先完成则返回谁 类似与 promise.race
export default function* (){
   let res = yield race({
    action1:call(async11),
    action2:call(async11)
    });
    console.log(res)
} 
