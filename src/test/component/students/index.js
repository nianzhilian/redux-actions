import React from "react";
// import { connect } from '../../../react-redux';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { setSearch } from "../../redux-actions/users/search";
// import ctx from '../../../react-redux/context';
import { fetchStudents } from "../../redux-actions/users/result";
import Search from "../../../page/student/Search";
import StuTable from "../../../page/student/StuTable";
import Pager from "../../../components/Pager";
import store from "../..";
// let mapStateToProps = (state)=>({
//     current:1,
//     pageSize:15,
//     type:4
// })
const getState = state => {
    return state.users.search;
}
// let mapStateToProps = (state) => ({
//   defaultValue: {
//     current: 1,
//     pageSize: 15,
//     type: 4,
//   },
// });
//第一个参数是选择器数组 可以多个选择器进行组合，
//调用createSelector  会执行数组中的选择器 得到的返回值 会作为参数传递给第二个参数callback
const getSearchState = createSelector([getState],(state)=>(
    //会导致defaultValue的引用发生变化
    //解决办法是 只获取值  不直接给defaultValue赋值对象（直接赋值对象容易导致引用发生变化 会导致子组件进行不必要的重新渲染）
    //尽量扁平结构传递props  减少嵌套对象带来的浅比较
    {
        defaultValue:{
            current:state.current,
            pageSize:state.pageSize,
            type:state.type
        }
    }
))

let mapStateToProps = (state) => getSearchState(state);




// let mapDispatchToProps = (dispatch) => {
//   return {
//     onSearch: function (state) {
//       const newConfig = {
//         ...state,
//         current: 1,
//       };
//       if (newConfig.packType == -1) {
//         delete newConfig.packType;
//       }
//       dispatch(setSearch(newConfig));
//       dispatch(fetchStudents());
//     },
//     onChange: function (val) {
//       if (val != -1) {
//         dispatch(setSearch({ packType: val }));
//       }
//     },
//   };
// };


const handleSearch = (dispatch) => (state) => {
  const newConfig = { ...state, current: 1 };
  if (newConfig.packType == -1) {
    delete newConfig.packType;
  }
  dispatch(setSearch(newConfig));
  dispatch(fetchStudents());
};

const handleChange = (dispatch) => (val) => {
  if (val != -1) {
    dispatch(setSearch({ packType: val }));
  }
};

// 2. mapDispatchToProps 仅做 dispatch 绑定，不创建新函数
let mapDispatchToProps = (dispatch) => {
  return {
    onSearch: handleSearch(dispatch), // 引用稳定
    onChange: handleChange(dispatch), // 引用稳定
  };
};
const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

//这个回调主要是用来过滤状态的 因为厂库有很多状态数据 我只需要拿出这个组件需要的一部分状态数据即可
mapStateToProps = (state) => {
  return {
    lists: state.users.result.datas,
  };
};
const StuContainer = connect(mapStateToProps)(StuTable);

mapStateToProps = (state) => {
  return {
    current: state.users.search.current,
    pageSize: state.users.search.pageSize,
    panelNumber: 15,
    total: state.users.result.total,
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    onPageChange: function (page) {
      dispatch(
        setSearch({
          current: page,
        })
      );
      dispatch(fetchStudents());
    },
  };
};

const PagerContainer = connect(mapStateToProps, mapDispatchToProps)(Pager);
class StudentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.store = store;
  }
  componentDidMount() {
    this.store.dispatch(fetchStudents());
  }
  render() {
    console.log("StudentsContainer组件重新渲染了");
    return (
      <>
        <SearchContainer />
        <StuContainer />
        <PagerContainer />
      </>
    );
  }
}

export default StudentsContainer;
