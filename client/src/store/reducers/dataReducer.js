const initialState = {
    employers: [],
    position: [],
    error: {
        message: "",
        error: false,
        style: {}
    },
}
const newInitialState = {
    last_name: "",
    first_name: "",
    otc: "",
    tab_number: "",
    position: "",
    employment_date: "",
    snils: "",
    birthday: "",
    namePosition: ""
}

// Массивы при загрузке страниц и ошибка если массив не собран
export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "employers":
            return {...state, employers: action.employers};
        case "position":
            return {...state, position: action.position};
        case "error":
            return {...state, error: action.error};
        default:
            return state;
    }
}
// Изменение/добавление данных
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
        case "namePosition":
            return {...state, namePosition: action.namePosition};
        default:
            return state;
    }
}

