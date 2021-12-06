import {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {setArrays} from "../store/actions/data-actions";
import axios from "axios";

const useSurvey = () => {
    const dispatch = useDispatch()

    return useMemo(() => ({
        fetchPositions() {
            axios.post("http://localhost:3001/read", {
                table: "POSITIONS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    dispatch(setArrays("position", response.data.result))
                })
                .catch(error => {
                    console.log("check pos error", error);
                });
        }
    }), [dispatch])
}

export default useSurvey
