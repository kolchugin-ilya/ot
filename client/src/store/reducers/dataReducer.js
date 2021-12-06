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
export const changeDataReducer = (state = newInitialState, action) => {
    switch (action.type) {
        case "changeEmployers":
            return {
                ...state, last_name: action.last_name,
                first_name: action.first_name, otc: action.otc, tab_number: action.tab_number,
                position: action.position, employment_date: action.employment_date, snils: action.snils,
                birthday: action.birthday
            }
        default:
            return state;
    }
}

