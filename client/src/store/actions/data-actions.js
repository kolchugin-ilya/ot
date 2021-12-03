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
export function setNewData(param, value) {
    return (dispatch) => {
        try {
            dispatch({type: `${param}`, [param]: value})
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
