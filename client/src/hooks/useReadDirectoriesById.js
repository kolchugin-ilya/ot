import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import axios from "axios";
import {setChangeBRs, setChangeEmployers, setError} from "../store/actions/data-actions";


const useReadDirectoriesById = () => {
    const dispatch = useDispatch()

    return useMemo(() => ({
        // Заполнение страницы сотрудников
        fetchEmployersById(id) {
            axios.post("http://localhost:3001/readEmployersById", {
                id: id
            }, {withCredentials: true})
                .then(response => {
                    let employers = response.data.result[0];
                    dispatch(setChangeBRs({
                        first_name: employers.FIRST_NAME,
                        last_name: employers.LAST_NAME,
                        otc: employers.OTC,
                        tab_number: employers.TAB_NUMBER,
                        type_employers_id: employers.TYPE_EMPLOYERS_ID,
                        job_type_id: employers.JOB_TYPE_ID,
                        podr_id: employers.PODR_ID,
                        fired_date: employers.FIRED_DATE,
                        position_id: employers.POSITION,
                        employment_date: employers.EMPLOYMENT_DATE,
                        snils: employers.SNILS,
                        birthday: employers.BIRTHDAY
                    }))
                })
                .catch(error => {
                    dispatch(setError(
                        {
                            message: error.response.data.message,
                            error: true
                        }))
                    window.setTimeout(
                        window.location = "/employers"
                        , 5000);
                });
        },

    }), [dispatch])
}

export default useReadDirectoriesById
