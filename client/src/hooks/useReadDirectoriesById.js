import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import axios from "axios";
import {setChangeBRs, setChangeEmployers, setError} from "../store/actions/data-actions";

const useReadDirectoriesById = () => {
    const dispatch = useDispatch()

    function postDirectoriesById(id, table, row, location) {
        if (!id) {
            dispatch(setChangeBRs({
                [row]: ""
            }));
            return;
        }
        axios.post("http://localhost:3001/read", {
            table: table,
            columns: "NAME",
            condition: "AND ID=" + id
        }, {withCredentials: true})
            .then(response => {
                let array = response.data.result[0];
                dispatch(setChangeBRs({
                    [row]: array.NAME
                }))
            })
            .catch(error => {
                dispatch(setError(
                    {
                        message: error.response.data.message,
                        error: true
                    }))
                window.setTimeout(
                    window.location = `/${location}`
                    , 5000);
            });
    }

    return useMemo(() => ({
        // Заполнение страницы сотрудников
        fetchEmployersById(id) {
            if (!id) {
                dispatch(setChangeBRs({
                    last_name: "",
                    first_name: "",
                    otc: "",
                    position_id: 1,
                    type_employers_id: 1,
                    job_type_id: 1,
                    podr_id: 1,
                    tab_number: "",
                    snils: "",
                    birthday: "",
                    employment_date: "",
                    fired_date: "",
                }));
                return;
            }
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
        // Заполнение страницы должностей
        fetchPositionById(id) {
            postDirectoriesById(id, "POSITIONS", "name_position", "position")
        },
        // Заполнение страницы типов персонала
        fetchTypeEmployersById(id) {
            postDirectoriesById(id, "TYPE_EMPLOYERS", "name_type_employers", "type_employers")
        },
        // Заполнение страницы видов занятости
        fetchJobTypeById(id) {
            postDirectoriesById(id, "JOB_TYPE", "name_job_type", "job_type")
        },
        // Заполнение страницы подразделений
        fetchPodrById(id) {
            postDirectoriesById(id, "PODR", "name_podr", "podr")
        },
        // Заполнение страницы ФЛГ
        fetchFlgById(id) {
            postDirectoriesById(id, "FLG", "name_flg", "flg")
        },
        // Заполнение страницы вредных факторов
        fetchFactorsById(id) {
            postDirectoriesById(id, "FACTORS", "name_factors", "factors")
        }
    }), [dispatch])
}

export default useReadDirectoriesById
