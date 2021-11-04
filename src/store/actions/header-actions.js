// Кнопка Х
export function setToggle(props = false) {
    return (dispatch) => {
        try {
            dispatch({type: props})
        } catch (e) {
            console.log(e)
        }
    }
}