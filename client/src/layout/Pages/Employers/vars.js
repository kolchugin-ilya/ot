export const dataExport = (first_name, last_name, otc, tab_number,position, employment_date, snils, birthday) => [
    {label: "Фамилия", name: "last_name", value: last_name, type: "text"},
    {label: "Имя", name: "first_name", value: first_name, type: "text"},
    {label: "Отчество", name: "otc", value: otc, type: "text"},
    {label: "Табельный номер", name: "tab_number", value: tab_number, type: "text"},
    {label: "СНИЛС", name: "snils", value: snils, type: "text"},
    {label: "Дата приёма", name: "employment_date", value: employment_date, type: "date"},
    {label: "День рождения", name: "birthday", value: birthday, type: "date"}
]
