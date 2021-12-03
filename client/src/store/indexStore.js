import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers/rootReducer";

export const indexStore = createStore(rootReducer, applyMiddleware(thunk));
