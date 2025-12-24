import { takeEvery,put,select,call,cps } from "redux-saga/effects";
import * as stuActions from '../redux-actions/users/actionTypes'
import {setLoading,setTotal,setDatas} from '../redux-actions/users/result'
import { fetchUserList } from "../redux/actions";

function* fetchStudents(){
    yield put(setLoading(true));
    const condation = yield select((state)=>{
        return {
            ...state.users.search,
            current:2
        }
    });
   const res = yield call(fetchUserList,condation);
   yield put(setDatas(res.dataMain.list))
   yield put(setTotal(res.dataMain.pagination.total))
   yield put(setLoading(false))
}

export default function*(){
   let res = yield takeEvery(stuActions.FETCH_STUDENTS,fetchStudents);
   console.log(res)
}