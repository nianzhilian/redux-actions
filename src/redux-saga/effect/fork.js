import { effectTypes,createEffect } from "../effectHelper";
import runSaga from "../runSaga";
/**
 * 
 * @param {*} generatorFn 生成器函数开启一个新的任务
 * @returns 
 */
export function fork(generatorFn,...args){
    return createEffect(effectTypes.FORK,{
        fn:generatorFn,
        args
    })
}

/**
 * 
 * @param {*} env 上下文环境
 * @param {*} effect saga描述对象
 * @param {*} next 当前任务是否要继续执行
 * fork 不会阻塞 当前任务立马就完成了
 */
export function runForkEffect(env,effect,next){
    let task = runSaga(env,effect.payload.fn,...effect.payload.args);
    next(task);
}