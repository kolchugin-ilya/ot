import {combineReducers} from "redux";
import {toggleReducer} from "./headerReducer";

export const rootReducer = combineReducers({
    toggle: toggleReducer
});
