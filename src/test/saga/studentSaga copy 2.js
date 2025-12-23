import { takeEvery,put } from "redux-saga/effects";
import { actionTypes,setLoading,fetchUserList,setTotal} from "../redux/actions";

//dispatch 一个普通的action对象 发出指令  交由 saga进行副作用的处理
function* fetchStudents(){
    yield put(setLoading(true))
    let res = yield fetchUserList();
    yield put(setTotal(res.dataMain.pagination.total));
    yield put(setLoading(false));
}

export default function*(){
    yield takeEvery(actionTypes.fetchStudents,fetchStudents)
}