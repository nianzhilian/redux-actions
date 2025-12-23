
import { effectTypes } from "./effectHelper"
import { runSelect } from "./effect/select"
import { runCall } from "./effect/call";
import { runPut } from "./effect/put";
import { runTakeEffect } from "./effect/take";
import { runForkEffect } from "./effect/fork";
import { runCancelEffect } from "./effect/cancel";
import { runAllEffect } from "./effect/all";
export default function runEffects(env,effect,next){
    switch (effect.type) {
        case effectTypes.SELECT:
            runSelect(env,effect,next);
            break;
        case effectTypes.CALL:
            runCall(env,effect,next);
            break;
        case effectTypes.PUT:
            runPut(env,effect,next)
            break;
        case effectTypes.TAKE:
            runTakeEffect(env,effect,next)
            break;
        case effectTypes.FORK:
            runForkEffect(env,effect,next)
            break;
        case effectTypes.CANCEL:
            runCancelEffect(env,effect,next);
            break;
        case effectTypes.ALL:
            runAllEffect(env,effect,next);
            break;
        default:
            break;
    }

}