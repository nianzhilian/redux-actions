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
import * as actions from '../redux-actions/counter/actionTypes'
import { incress,dincress } from "../redux-actions/counter";

function* asyncIncress(){
    yield delay(2000);
    yield put(incress())
}

function* asyncDincress(){
    yield delay(2000);
    yield put(dincress())
}

export default function* (){
    //监听异步增
   yield takeEvery(actions.ASYNC_INCRESS,asyncIncress)
   //监听异步减
   yield takeEvery(actions.ASYNC_DINCRESS,asyncDincress)
} 
