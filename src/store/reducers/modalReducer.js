const initialStateCloseButton = {
    showModal: false
};
export const closeButtonReducer = (state = initialStateCloseButton, action) => {
    switch (action.type) {
        case 'show':
            return {showModal: true};
        default:
            return {showModal: false};
    }
}
