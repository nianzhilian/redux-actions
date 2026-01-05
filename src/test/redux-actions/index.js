import { combineReducers } from "../../redux";
import counter from './counter'
import users from "./users";
import { connectRouter } from "connected-react-router";
import history from "../history";
console.log(connectRouter(history))
export default combineReducers({
    users,
    counter,
    router:connectRouter(history)//指定路由状态  调用时返回一个对应的状态的reducer  接收同一个history对象
})