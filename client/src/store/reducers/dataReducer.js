const initialState = {
    employers: [],
    position: [],
    type_employers: [],
    podr: [],
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
    position: 1,
    employment_date: "",
    snils: "",
    birthday: "",
    podr: 1,
    namePosition: ""
}
// Массивы при загрузке страниц и ошибка если массив не собран
export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "employers":
            return {...state, employers: action.employers};
        case "position":
            return {...state, position: action.position};
        case "type_employers":
            return {...state, type_employers: action.type_employers};
        case "podr":
            return {...state, podr: action.podr};
        case "error":
            return {...state, error: action.error};
        default:
            return state;
    }
}
// Изменение/добавление данных
export const changeDataReducer = (state = newInitialState, action) => {
    switch (action.type) {
        case "changeEmployers":
            return {...state, ...action}
        case "changePositions":
            return {...state, namePosition: action.namePosition}
        default:
            return state;
    }
}

