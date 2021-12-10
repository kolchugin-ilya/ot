const initialState = {
    employers: [],
    position: [],
    typeEmployers: [],
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
    employment_date: "",
    snils: "",
    birthday: "",
    namePosition: "",
    nameTypeEmployers: ""
}
// Массивы при загрузке страниц и ошибка если массив не собран
export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "employers":
            return {...state, employers: action.employers};
        case "position":
            return {...state, position: action.position};
        case "typeEmployers":
            return {...state, typeEmployers: action.typeEmployers};
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
        case "changeTypeEmployers":
            return {...state, nameTypeEmployers: action.nameTypeEmployers}
        default:
            return state;
    }
}

