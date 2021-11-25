export function setEmployers(employers) {
    return (dispatch) => {
        try {
            dispatch({type: "employers", employers: employers})
        } catch (e) {
            console.log(e)
        }
    }
}
