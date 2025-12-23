import { createEffect,effectTypes } from "../effectHelper";
import isPromise from "is-promise";
//创建call对象
export function call(func,...args){
    let context = null;
    let fnn = func;
    if(Array.isArray(func)){
        context = func[0];
        fnn = func[1]
    }
    return createEffect(effectTypes.CALL,{
        context,
        fn:fnn,
        args
    })
}

//运行指令
export function runCall(env,effect,next){
    const {context,fn,args} = effect.payload;
    const res = fn.call(context,...args);
    if(isPromise(res)){
        res.then(r=>next(r)).catch(error=>next(null,error))
    }else{
        next(res);
    }
}