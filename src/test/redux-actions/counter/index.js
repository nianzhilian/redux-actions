import { createAction,createActions,handleAction, handleActions } from "redux-actions";

const counter = createActions({
    INCRESS:null,
    DINCRESS:null,
})

const {incress,dincress} = counter;

export {incress,dincress};
// const reducer = handleAction(incress,(state,{type,payload})=>{
//     return payload?payload+1:state+1
// },0)

const reducer = handleActions({
    [incress]:(state)=>state+1,
    [dincress]:(state)=>state-1
},0)

export default reducer;