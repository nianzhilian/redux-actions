import { combineReducers } from "../../redux";
import { generateRandomUUID } from "../../utils/util";
import search from "./search";

const initState = {
  isLoading: false,
  datas: [
    {
      id: generateRandomUUID(),
      name: "张三",
      age: 10,
    },
    {
      id: generateRandomUUID(),
      name: "李四",
      age: 11,
    },
  ],
  total:0
};

function reducers(state = initState, { type, payload }) {
  switch (type) {
    case "add":
      return {
        ...state,
        datas: [...state.datas, payload],
      };
    case "delete":
      return {
        ...state,
        datas: state.datas.filter((item, index) => item.id != payload),
      };
    case "update":
      return {
        ...state,
        datas: state.datas.map((item, index) =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
      };
    case "loading":
      return {
        ...state,
        isLoading: payload,
      };
    case 'total':
      return {
        ...state,
        total:payload
      }
    default:
      return state;
  }
}

export default combineReducers({
  result: reducers,
  search
});
