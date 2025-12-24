import { createActions, handleActions } from "redux-actions";
import * as types from './actionTypes'

const result = createActions({
    [types.SET_TOTAL]:total=>total,
    [types.SET_LOADING]:bl=>bl,
    [types.SET_DATAS]:datas=>datas,
    [types.FETCH_STUDENTS]:null,
})

export const {setTotal,setLoading,setDatas,fetchStudents} = result;

export default handleActions({
    [types.SET_TOTAL]:(state,{type,payload})=>{
        return {
            ...state,
            total:payload
        }
    },
    [types.SET_LOADING]:(state,{type,payload})=>{
        return {
            ...state,
            isLoading:payload
        }
    },
    [types.SET_DATAS]:(state,{type,payload})=>{
        return {
            ...state,
            datas:payload
        }
    }
},{
    total:0,
    datas:[],
    isLoading:false
})
