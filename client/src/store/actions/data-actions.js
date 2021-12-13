// Массивы при загрузке страниц
export function setArrays(payload) {
    return (dispatch) => {
        try {
            dispatch({type: "fetchArray", ...payload})
        } catch (e) {
            console.log(e)
        }
    }
}
// Изменение/добавление сотрудников
export function setChangeEmployers(payload) {
    return (dispatch) => {
        try {
            dispatch({
                type: "changeEmployers",
                ...payload
            })
        } catch (e) {
            console.log(e)
        }
    }
}
export function setChangeBRs(br, payload) {
    return (dispatch) => {
        try {
            dispatch({type: br, ...payload})
        } catch (e) {
            console.log(e)
        }
    }
}
//Обработчик ошибок
export function setError(error) {
    return (dispatch) => {
        try {
            dispatch({type: "error", error: error})
        } catch (e) {
            console.log(e)
        }
    }
}
