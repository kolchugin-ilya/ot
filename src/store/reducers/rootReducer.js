import {combineReducers} from "redux";
import {toggleReducer} from "./headerReducer";
import {closeButtonReducer} from "./modalReducer";

export const rootReducer = combineReducers({
    toggle: toggleReducer,
    closeButton: closeButtonReducer
});
