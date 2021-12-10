export const dataExport = (state, options) => [
    {label: "Фамилия", name: "last_name", value: state.last_name, type: "text"},
    {label: "Имя", name: "first_name", value: state.first_name, type: "text"},
    {label: "Отчество", name: "otc", value: state.otc, type: "text"},
    {label: "Табельный номер", name: "tab_number", value: state.tab_number, type: "text"},
    {label: "Должность", name: "namePosition", value: options.position[0], options: options.position, type: "select"},
    {label: "Тип персонала", name: "nameTypeEmployers", value: options.typeEmployers[0], options: options.typeEmployers, type: "select"},
    {label: "Подразделение", name: "podr", value: state.podr, options: options.podr, type: "select"},
    {label: "СНИЛС", name: "snils", value: state.snils, type: "text"},
    {label: "Дата приёма", name: "employment_date", value: state.employment_date, type: "date"},
    {label: "День рождения", name: "birthday", value: state.birthday, type: "date"}
]
