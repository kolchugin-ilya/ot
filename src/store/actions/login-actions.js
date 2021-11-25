export function setSession(data) {
    return (dispatch) => {
        try {
            dispatch({type: "session", userInfo: data})
        } catch (e) {
            console.log(e)
        }
    }
}

export function setLoading(loading) {
    return (dispatch) => {
        try {
            dispatch({type: "loading", loading: loading})
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

export function setLogin(name="", password="") {
    return (dispatch) => {
        try {
            dispatch({type: "login", name: name, password: password})
        } catch (e) {
            console.log(e)
        }
    }
}
