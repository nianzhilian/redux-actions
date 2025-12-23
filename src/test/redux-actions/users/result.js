import { createActions, handleActions } from "redux-actions";

const result = createActions({
    SET_TOTAL:total=>total,
    SET_LOADING:bl=>bl,
    SET_DATAS:datas=>datas
})

export const {setTotal,setLoading,setDatas} = result;

export default handleActions({
    [setTotal]:(state,{type,payload})=>{
        return {
            ...state,
            total:payload
        }
    },
    [setLoading]:(state,{type,payload})=>{
        return {
            ...state,
            isLoading:payload
        }
    },
    [setDatas]:(state,{type,payload})=>{
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
