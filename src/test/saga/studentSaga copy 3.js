import { takeEvery,put,select,call } from "redux-saga/effects";
import { actionTypes,setLoading,fetchUserList,setTotal} from "../redux/actions";

//dispatch 一个普通的action对象 发出指令  交由 saga进行副作用的处理

function* fetchStudents(){
    yield put(setLoading(true))
    let condion = yield select((state)=>{
        return {
            ...state.users.search,
            current:2
        }
    });
    let res = yield call(fetchUserList,condion)
    yield put(setTotal(res.dataMain.pagination.total));
    yield put(setLoading(false));
}

export default function*(){
    yield takeEvery(actionTypes.fetchStudents,fetchStudents)
}