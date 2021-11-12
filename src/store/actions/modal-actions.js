export function setCloseButton(props = 'close') {
    return (dispatch) => {
        try {
            dispatch({type: props})
        } catch (e) {
            console.log(e)
        }
    }
}
