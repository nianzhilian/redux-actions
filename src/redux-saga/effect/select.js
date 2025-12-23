import { createEffect,effectTypes } from "../effectHelper";
export function select(func){
    return createEffect(effectTypes.SELECT,{
        fn:func
    })
}

export function runSelect(env,effect,next){
    let state = env.store.getState();
    if(typeof effect.payload.fn == 'function'){
        state = effect.payload.fn(state);
    }
    next(state);
}