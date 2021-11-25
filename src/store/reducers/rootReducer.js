import {combineReducers} from "redux";
import {toggleReducer} from "./headerReducer";
import {closeButtonReducer} from "./modalReducer";
import {loginReducer} from "./loginReducer";
import {dataReducer} from "./dataReducer";

export const rootReducer = combineReducers({
    toggle: toggleReducer,
    closeButton: closeButtonReducer,
    loginReducer: loginReducer,
    dataReducer: dataReducer
});
