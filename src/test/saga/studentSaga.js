import { takeEvery,put,select,call,cps } from "redux-saga/effects";
import { actionTypes,setLoading,fetchUserList,setTotal} from "../redux/actions";

//dispatch 一个普通的action对象 发出指令  交由 saga进行副作用的处理

function mock(condition,cb){
    setTimeout(() => {
        if(Math.random()>0.5){
            cb(null,{
                count:22
            })
        }else{
            cb(new Error('出错了111!'),null)
        }
        
    }, 2000);
}

function* fetchStudents(){
    yield put(setLoading(true))
    let condion = yield select((state)=>{
        return {
            ...state.users.search,
            current:2
        }
    });
    try {
        let res = yield cps(mock,condion);
        console.log(res);
        yield put(setTotal(res.count));
    } catch (error) {
        console.log(error)
    }finally{
        yield put(setLoading(false));
    }
    
    // yield put(setTotal(res.dataMain.pagination.total));
    // yield put(setLoading(false));
}

export default function*(){
   let res = yield takeEvery(actionTypes.fetchStudents,fetchStudents);
   console.log(res)
}