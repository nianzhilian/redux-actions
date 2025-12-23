import { combineReducers } from "../../redux";
import reducers from "./reducers";
import counter from "./counter";

export default combineReducers({
    users:reducers,
    counter
})