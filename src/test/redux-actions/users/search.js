import { createAction, createActions, handleActions } from "redux-actions";
import * as types from './actionTypes'
const search = createActions({
  [types.SET_SEARCH]: function (s) {
    return s;
  },
});

const { setSearch } = search;

export { setSearch };

const searchReducer =  handleActions(
  {
    [[types.SET_SEARCH]]: (state, {type,payload}) => {
      return {...state,...payload}
    },
  },
  {
    current: 1,
    pageSize: 15,
    type: 4,
  }
);

export default searchReducer
