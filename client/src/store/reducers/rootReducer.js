import {combineReducers} from "redux";
import {toggleReducer} from "./headerReducer";
import {closeButtonReducer} from "./modalReducer";
import {loginReducer} from "./loginReducer";
import {changeDataReducer, changeEmployers, dataReducer} from "./dataReducer";

export const rootReducer = combineReducers({
    toggle: toggleReducer,
    closeButton: closeButtonReducer,
    loginReducer: loginReducer,
    dataReducer: dataReducer,
    changeDataReducer: changeDataReducer
});
