const initialStateToggle = {
    show: false
};
export const toggleReducer = (state = initialStateToggle, action) => {
    switch (action.type) {
        case true:
            return {show: true};
        default:
            return {show: false};
    }
}