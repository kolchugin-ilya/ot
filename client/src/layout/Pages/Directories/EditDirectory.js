import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import styles from './Styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import useReadDirectoriesById from "../../../hooks/useReadDirectoriesById";
import {setChangeBRs} from "../../../store/actions/data-actions";

const EditDirectory = ({data, table, title}) => {
    const state = useSelector(state => state.changeDataReducer)
    const {error} = useSelector(state => state.dataReducer)
    const id = new URLSearchParams(useLocation().search).get("id");
    const {
        fetchEmployersById,
        fetchPositionById,
        fetchPodrById,
        fetchTypeEmployersById,
        fetchJobTypeById,
        fetchFlgById,
        fetchFactorsById
    } = useReadDirectoriesById()
    const dispatch = useDispatch()

    function changeData(table) {
        function post(id, table, columns, location) {
            return axios.post("http://localhost:3001/update", {
                id: id,
                table: table,
                columns: columns,
            })
                .then(() => {
                    window.location = `/${location}`
                })
                .catch(error => {
                    console.log(`check ${location} error`, error);
                });
        }
        switch (table) {
            case "EMPLOYERS":
                return post(id, table, `LAST_NAME='${state.last_name}', FIRST_NAME='${state.first_name}',OTC='${state.otc}',
                       TAB_NUMBER='${state.tab_number}', POSITION='${state.position_id}', TYPE_EMPLOYERS_ID='${state.type_employers_id}', SNILS='${state.snils}',
                       EMPLOYMENT_DATE='${state.employment_date}', BIRTHDAY='${state.birthday}', PODR_ID='${state.podr_id}', ACTIVE_SIGN=1, JOB_TYPE_ID='${state.job_type_id}',
                       FIRED_DATE='${state.fired_date}'`,
                    "employers")
            case "POSITIONS":
                return post(id, table, `NAME='${state.name_position}'`, "position")
            case "TYPE_EMPLOYERS":
                return post(id, table, `NAME='${state.name_type_employers}'`, "type_employers")
            case "JOB_TYPE":
                return post(id, table, `NAME='${state.name_job_type}'`, "job_type")
            case "PODR":
                return post(id, table, `NAME='${state.name_podr}'`, "podr")
            case "FLG":
                return post(id, table, `NAME='${state.name_flg}'`, "flg")
            case "FACTORS":
                return post(id, table, `NAME='${state.name_factors}'`, "factors")
        }
    }

    const handleChange = (event) => {
        dispatch(setChangeBRs({...state, [event.target.name]: event.target.value}))
    }
    const submitForm = (event) => {
        event.preventDefault();
        changeData(table)
    }
    useEffect(() => {
        switch (table) {
            case "EMPLOYERS":
                return fetchEmployersById(id)
            case "POSITIONS":
                return fetchPositionById(id)
            case "TYPE_EMPLOYERS":
                return fetchTypeEmployersById(id)
            case "JOB_TYPE":
                return fetchJobTypeById(id)
            case "PODR":
                return fetchPodrById(id)
            case "FLG":
                return fetchFlgById(id)
            case "FACTORS":
                return fetchFactorsById(id)
        }
    }, [])
    return (
        id ?
            !error.error ?
                (<form className={styles.container} onSubmit={(event) => submitForm(event)}>
                    <p className={styles.titleAdd}>{title}</p>
                    {
                        data &&
                        data.map(data => {
                            return <div key={data.name} className={styles.row}>
                                <p>{data.label}</p>
                                {
                                    (data.type === "select") ?
                                        <select name={data.name} required onChange={(event) => handleChange(event)}>
                                            {
                                                data.options.map(pos => {
                                                    return <option selected={(pos.ID === data.value)}
                                                                   value={pos.ID}>{pos.NAME}</option>
                                                })
                                            }
                                        </select>
                                        :
                                        <input onChange={(event) => handleChange(event)} required name={data.name}
                                               value={data.value} type={data.type}
                                        />
                                }
                            </div>
                        })
                    }
                    <button type="submit">Сохранить</button>
                </form>)
                :
                <div className={styles.container}>
                    {
                        error.message
                    }
                </div>
            :
            <div className={styles.container}>
                Некорректный параметр ID!
            </div>

    );
};

export default EditDirectory;
