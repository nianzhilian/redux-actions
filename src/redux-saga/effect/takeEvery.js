import { fork } from "./fork";
import { take } from "./take";

export function takeEvery(actionType,generatorFn,...args){
    return fork(function*(){
        while(true){
            let action = yield take(actionType);
            yield fork(generatorFn,args.concat(action))
        }
    })
}
