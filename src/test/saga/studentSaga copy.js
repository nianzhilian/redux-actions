import { takeEvery,put } from "redux-saga/effects";
import { actionTypes,setLoading} from "../redux/actions";

function mock(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(Math.random()>0.5){
                resolve('获取数据完成')
            }else{
                reject('获取数据错误')
            }
        }, 2000);
    })
}

function* fetchStudents(){
    yield put(setLoading(true))
    try {
        const resp = yield mock();
        console.log(resp)
    } catch (error) {
        console.log(error)
    }
}

export default function*(){
    yield takeEvery(actionTypes.fetchStudents,fetchStudents)
}