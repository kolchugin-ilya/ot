const initialState = {
    employers: [],
    currentEmployer: ""
}
const newInitialState = {
    last_name: "",
    first_name: "",
    otc: "",
    tab_number: "",
    position: "",
    employment_date: "",
    snils: "",
    birthday: ""
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "employers":
            return {...state, employers: action.employers};
        case "currentEmployer":
            return {...state, currentEmployer: action.currentEmployer};
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
        case "employment_date":
            return {...state, employment_date: action.employment_date};
        case "snils":
            return {...state, snils: action.snils};
        case "birthday":
            return {...state, birthday: action.birthday};
        default:
            return state;
    }
}

