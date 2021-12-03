const initialState = {
    error: {
        message: "",
        error: false,
        style: {}
    },
    loading: true,
    userInfo: {
        name: localStorage.getItem('userinfo') || "",
        role: ""
    },
    name: "",
    password: ""
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "loading":
            return {...state, loading: action.loading};
        case "error":
            return {...state, error: action.error};
        case "session":
            return {...state, userInfo: action.userInfo};
        case "login":
            return {...state, name: action.name, password: action.password};
        default:
            return state;
    }
}
