import React from 'react'
// import { connect } from '../../../react-redux';
import { connect } from 'react-redux';
import {setSearch} from '../../redux-actions/users/search'
// import ctx from '../../../react-redux/context';
import { fetchStudents } from '../../redux-actions/users/result'
import Search from '../../../page/student/Search';
import  StuTable from '../../../page/student/StuTable'
import Pager from '../../../components/Pager'
import store from '../..';
let mapStateToProps = (state)=>({
    current:1,
    pageSize:15,
    type:4 
})

let mapDispatchToProps = (dispatch)=>{
    return {
        onSearch:function(state){ 
            const newConfig = {
                ...state,
                current:1
            }
            if(newConfig.packType == -1){
                delete newConfig.packType
            }
            dispatch(setSearch(newConfig))
            dispatch(fetchStudents())
        },
        onChange:function(val){
            if(val!=-1){
                dispatch(setSearch({packType:val}))
            } 
        }
    }
}
const SearchContainer = connect(mapStateToProps,mapDispatchToProps)(Search)

//这个回调主要是用来过滤状态的 因为厂库有很多状态数据 我只需要拿出这个组件需要的一部分状态数据即可
mapStateToProps = (state)=>{
    return {
        lists:state.users.result.datas
    }
}
const StuContainer = connect(mapStateToProps)(StuTable);

mapStateToProps = (state)=>{
    return {
         current:state.users.search.current,
         pageSize:state.users.search.pageSize,
         panelNumber:15,
         total:state.users.result.total
    }
}

mapDispatchToProps = (dispatch)=>{
    return {
        onPageChange:function(page){
            dispatch(setSearch({
                current:page
            }))
            dispatch(fetchStudents())
        }
    }
}

const PagerContainer = connect(mapStateToProps,mapDispatchToProps)(Pager);
class StudentsContainer extends React.Component{
    constructor(props){
        super(props);
        this.store = store;
    }
    componentDidMount(){
        this.store.dispatch(fetchStudents());
    }
    render(){
        console.log("StudentsContainer组件重新渲染了")
        return (
            <>
            <SearchContainer />
            <StuContainer />
            <PagerContainer />
            </>
        );
    }
}

export default StudentsContainer