import { createEffect,effectTypes } from "../effectHelper";

export function cancel(task){
    return createEffect(effectTypes.CANCEL,{
        task
    })
}
export function runCancelEffect(env,effect,next){
    effect.payload.task.cancle();
    //这个指的是当前的任务  继续当前的任务
    next();
}