export const dataEmployersExport = (state, options) => [
    {label: "Фамилия", name: "last_name", value: state.last_name, type: "text"},
    {label: "Имя", name: "first_name", value: state.first_name, type: "text"},
    {label: "Отчество", name: "otc", value: state.otc, type: "text"},
    {label: "Табельный номер", name: "tab_number", value: state.tab_number, type: "text"},
    {label: "Должность", name: "position_id", value: state.position_id, options: options.position, type: "select"},
    {label: "Тип персонала", name: "type_employers_id", value: state.type_employers_id, options: options.type_employers, type: "select"},
    {label: "Подразделение", name: "podr_id", value: state.podr, options: options.podr, type: "select"},
    {label: "Вид занятости", name: "job_type_id", value: state.job_type_id, options: options.job_type, type: "select"},
    {label: "СНИЛС", name: "snils", value: state.snils, type: "text"},
    {label: "Дата приёма", name: "employment_date", value: state.employment_date, type: "date"},
    {label: "Дата увольнения", name: "fired_date", value: state.fired_date, type: "date"},
    {label: "День рождения", name: "birthday", value: state.birthday, type: "date"}
]
export const dataPositionExport = (state) => [
    {label: "Должность", name: "name_position", value: state.name_position, type: "text"}
]
export const dataTypeEmployersExport = (state) => [
    {label: "Тип персонала", name: "name_type_employers", value: state.name_type_employers, type: "text"}
]
export const dataJobTypeExport = (state) => [
    {label: "Вид занятости", name: "name_job_type", value: state.name_job_type, type: "text"}
]
export const dataPodrExport = (state) => [
    {label: "Подразделение", name: "name_podr", value: state.name_podr, type: "text"}
]
export const dataFlgExport = (state) => [
    {label: "ФЛГ", name: "name_flg", value: state.name_flg, type: "text"}
]
export const dataFactorsExport = (state) => [
    {label: "Вредные факторы", name: "name_factors", value: state.name_factors, type: "text"}
]

