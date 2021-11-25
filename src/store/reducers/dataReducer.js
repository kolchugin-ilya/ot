const initialState = {
    employers: []
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "employers":
            return {...state, employers: action.employers};
        default:
            return state;
    }
}

