import { createAction, createActions, handleActions } from "redux-actions";

const search = createActions({
  SET_SEARCH: function (s) {
    return s;
  },
});

console.log(search);

const { setSearch } = search;

console.log({
    [setSearch]:'张三'
})

export { setSearch };

const searchReducer =  handleActions(
  {
    [setSearch]: (state, {type,payload}) => {
      return {...state,...payload}
    },
  },
  {
    current: 1,
    pageSize: 15,
    type: 4,
  }
);

console.log(searchReducer)

export default searchReducer
