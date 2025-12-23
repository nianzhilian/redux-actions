import { select,delay,put,take,fork,cancel,takeEvery, all, call} from "../../redux-saga/effect";
import { increase,actionTypes, fetchUserList, setLoading, setSearch } from "../redux/actions";



//自动增-暂停-自动增-暂停
function* counterSaga(){
    while(true){
        yield take(actionTypes.AUTO_INCRESS);
        let task = yield fork(function*(){
            try {
                while(true){
                    yield delay(5000)
                    yield put(increase())
                }
            } catch (error) {
                
            }finally{

            }
        })
        yield take(actionTypes.STOP_INCRESS)
        yield cancel(task)
    }
}

function* studentSaga(){
    //监听接口请求
    yield take(actionTypes.fetchStudents);
    yield put(setLoading(true))
    const condition = yield select((state)=>{
        return {
            ...state.users.search,
            current:2
        }
    })
    let res = yield call(fetchUserList,condition);
    yield put(setLoading(false))
    yield put(setSearch(condition))
    console.log(res)
}

export default function*(){
    yield all([counterSaga(),studentSaga()]);
    console.log('所有任务完成，该迭代器才算执行完成');
}