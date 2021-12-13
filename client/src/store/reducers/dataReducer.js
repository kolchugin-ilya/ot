const fetchArrayState = {
    employers: [],
    position: [],
    type_employers: [],
    job_type: [],
    podr: [],
    flg: [],
    factors: [],
    error: {
        message: "",
        error: false,
        style: {}
    },
}
const changeArrayState = {
    // EMPLOYERS (список сотрудников)
    last_name: "",
    first_name: "",
    otc: "",
    position_id: "",
    type_employers_id: "",
    job_type_id: "",
    podr_id: "",
    tab_number: "",
    snils: "",
    birthday: "",
    employment_date: "",
    fired_date: "",
    // POSITIONS (должности)
    name_position: "",
    // TYPE_EMPLOYERS (типы персонала)
    name_type_employers: "",
    // JOB_TYPE (вид занятости)
    name_job_type: "",
    // PODR (подразделения)
    name_podr: "",
    // FLG (ФЛГ)
    name_flg: "",
    // FACTORS (вредные факторы)
    name_factors: ""
}
// Массивы при загрузке страниц и ошибка если массив не собран
export const dataReducer = (state = fetchArrayState, action) => {
    switch (action.type) {
        case "fetchArray":
            return {...state, ...action}
        default:
            return state;
    }
}
// Изменение/добавление данных
export const changeDataReducer = (state = changeArrayState, action) => {
    switch (action.type) {
        case "changeData":
            return {...state, ...action}
        default:
            return state;
    }
}

