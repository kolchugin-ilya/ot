export function setEmployers(employers) {
    return (dispatch) => {
        try {
            dispatch({type: "employers", employers: employers})
        } catch (e) {
            console.log(e)
        }
    }
}

export function setEditEmployer(currentEmployer) {
    return (dispatch) => {
        try {
            dispatch({type: "currentEmployer", currentEmployer: currentEmployer})
        } catch (e) {
            console.log(e)
        }
    }
}

export function setNewEmployer(param, value) {
    return (dispatch) => {
        try {
            dispatch({type: `${param}`, [param]: value})
        } catch (e) {
            console.log(e)
        }
    }
}
