import { createEffect,effectTypes } from "../effectHelper";

export function take(actionType){
    return createEffect(effectTypes.TAKE,{
        actionType
    });
}

/**
 * 
 * @param {*} env 上下文
 * @param {*} effect effect 描述对象
 * @param {*} next 迭代函数
 */
export function runTakeEffect(env,effect,next){
    env.channel.take(effect.payload.actionType,(action)=>{
        next(action);
    })
}