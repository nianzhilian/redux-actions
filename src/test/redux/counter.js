import { actionTypes } from "./actions";
export default function(state=10,{type}){
    switch (type) {
        case actionTypes.INCREASE:
            return state+1
        case actionTypes.DINCREASE:
            return state - 1
        default:
            return state;
    }
}