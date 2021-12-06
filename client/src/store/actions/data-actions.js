// Массивы при загрузке страниц
export function setArrays(table, payload) {
    return (dispatch) => {
        try {
            switch (table) {
                case "employers":
                    return dispatch({type: "employers", employers: payload})
                case "position":
                    return dispatch({type: "position", position: payload})
                default:
                    return;
            }
        } catch (e) {
            console.log(e)
        }
    }
}

// Изменение/добавление данных
// export function setNewData(param, value) {
//     return (dispatch) => {
//         try {
//             dispatch({type: `${param}`, [param]: value})
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }

// Изменение/добавление сотрудников
export function setChangeEmployers(payload) {
    return (dispatch) => {
        try {
            dispatch({
                type: "changeEmployers",
                first_name: payload.first_name,
                last_name: payload.last_name,
                otc: payload.otc,
                tab_number: payload.tab_number,
                position: payload.position,
                employment_date: payload.employment_date,
                snils: payload.snils,
                birthday: payload.birthday
            })
        } catch (e) {
            console.log(e)
        }
    }
}

export function setError(error) {
    return (dispatch) => {
        try {
            dispatch({type: "error", error: error})
        } catch (e) {
            console.log(e)
        }
    }
}
