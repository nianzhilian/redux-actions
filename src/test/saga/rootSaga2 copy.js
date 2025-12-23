import { select,delay,put,take,fork,cancel,takeEvery, all} from "../../redux-saga/effect";
import { increase,actionTypes } from "../redux/actions";

let task;

function* stop(){
    if(task){
        console.log('任务被取消了')
        yield cancel(task)
    }
}

//自动增-暂停-自动增-暂停
function* counterSaga(){
    while(true){
        yield take(actionTypes.AUTO_INCRESS);
        yield* stopIncress();
        task = yield fork(function*(){
            while(true){
                yield delay(5000)
                yield put(increase())
            }
        })
    }
}

function* stopIncress(){
    yield* stop();
} 
function* studentSaga(){
    yield delay(2000)
}

export default function*(){
    yield all([counterSaga(),studentSaga()]);
    console.log('所有任务完成，该迭代器才算执行完成');
}