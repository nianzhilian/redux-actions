import isGenerator from "is-generator";
import { isEffect } from "./effectHelper";
import isPromise from "is-promise";
import runEffects from "./runEffects";
import { Task } from "./Task";

//take fork cancel takeEvery all

 function runSaga(env,generator,...args){
    //得到一个生成器
    let iterator = generator(...args);
    if(isGenerator(iterator)){
        return proc(env,iterator);
    }else{
        console.log('是一个普通函数')
    }
    
}

export function proc(env,iterator){
    var cobj = {
        callback:null
    }
    next();
    function next(nextVal,err,isOver){
        let res;
        //如果报错生成器直接抛出异常
        if(err){
            res = iterator.throw(err)
            return;
        }
        //如果结束生成器直接返回 结束整个迭代
        if(isOver){
            res = iterator.return();
            cobj.callback && cobj.callback();
        }
        res = iterator.next(nextVal);
        let {value,done} = res;
        //如果迭代结束则返回
        if(done){
            cobj.callback && cobj.callback();
            return;
        }
        //剩下来判断本次迭代的值
        //1、是一个effect对象
        //2、是一个promise
        //3、其他普通函数
        if(isEffect(value)){
            console.log('先走的这里',value)
            runEffects(env,value,next)
        }else if(isPromise(value)){
            value.then((data)=>next(data)).catch((error)=>next(null,error))
        }else{
            next(value);
        }
    }
    console.log('返回一个任务对象')
    return new Task(next,cobj);
}

export default runSaga;