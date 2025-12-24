import { createAction,createActions,handleAction, handleActions } from "redux-actions";
import * as types from './actionTypes'
//createActions 调用之后 返回的是 action创建函数
//解构之后可以拿到各个action创建函数

export const {incress,dincress,asyncIncress,asyncDincress} = createActions({
    [types.INCRESS]:null,
    [types.DINCRESS]:null,
    [types.ASYNC_INCRESS]:null,
    [types.ASYNC_DINCRESS]:null
});
// const reducer = handleAction(incress,(state,{type,payload})=>{
//     return payload?payload+1:state+1
// },0)
//调用 handleActions 返回的是一个reducer
//reducer(state,action){} 返回一个新的state
const reducer = handleActions({
    [types.INCRESS]:(state)=>state+1,
    [types.DINCRESS]:(state)=>state-1
},0)

export default reducer;