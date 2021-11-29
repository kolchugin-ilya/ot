const initialState = {
    employers: [],
}
const newInitialState = {
    last_name: "",
    first_name: "",
    otc: "",
    tab_number: "",
    position: "",
    empl_date: "",
    snils: "",
    birthday: ""
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "employers":
            return {...state, employers: action.employers};
        default:
            return state;
    }
}

export const newDataReducer = (state = newInitialState, action) => {
    switch (action.type) {
        case "last_name":
            return {...state, last_name: action.last_name};
        case "first_name":
            return {...state, first_name: action.first_name};
        case "otc":
            return {...state, otc: action.otc};
        case "tab_number":
            return {...state, tab_number: action.tab_number};
        case "position":
            return {...state, position: action.position};
        case "empl_date":
            return {...state, empl_date: action.empl_date};
        case "snils":
            return {...state, snils: action.snils};
        case "birthday":
            return {...state, birthday: action.birthday};
        default:
            return state;
    }
}

