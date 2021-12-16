import React, {useEffect} from 'react';
import styles from './Styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setChangeBRs} from "../../store/actions/data-actions";
import axios from "axios";

const AddDirectory = ({data, table, title}) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.changeDataReducer)

    function createData(table) {
        function post(table, columns, values, location) {
            console.log(state.name_position)
            return axios.post("http://localhost:3001/create", {
                table: table,
                columns: columns,
                values: values
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
                return post(table,
                    "LAST_NAME, FIRST_NAME, OTC, TAB_NUMBER, SNILS, EMPLOYMENT_DATE, FIRED_DATE, " +
                    "BIRTHDAY, ACTIVE_SIGN, POSITION, JOB_TYPE_ID, PODR_ID, TYPE_EMPLOYERS_ID",
                    `'${state.last_name}', '${state.first_name}', '${state.otc}', '${state.tab_number}', 
                    '${state.snils}', '${state.employment_date}', '${state.fired_date}', '${state.birthday}', 1, 
                    '${state.position_id}', '${state.job_type_id}', '${state.podr_id}', '${state.type_employers_id}'`,
                    "employers")
            case "POSITIONS":
                return post(table, "NAME, ACTIVE_SIGN", `'${state.name_position}', 1`, "position")
            case "TYPE_EMPLOYERS":
                return post(table, "NAME, ACTIVE_SIGN", `'${state.name_type_employers}', 1`, "type_employers")
            case "JOB_TYPE":
                return post(table, "NAME, ACTIVE_SIGN", `'${state.name_job_type}', 1`, "job_type")
            case "PODR":
                return post(table, "NAME, ACTIVE_SIGN", `'${state.name_podr}', 1`, "podr")
            case "FLG":
                return post(table, "NAME, ACTIVE_SIGN", `'${state.name_flg}', 1`, "flg")
            case "FACTORS":
                return post(table, "NAME, ACTIVE_SIGN", `'${state.name_factors}', 1`, "factors")
        }
    }

    const handleChange = (event) => {
        dispatch(setChangeBRs({...state, [event.target.name]: event.target.value}))
    }
    const submitForm = (event) => {
        event.preventDefault();
        createData(table)
    }
    useEffect(() => {

    }, [])
    return (
        <form className={styles.container} onSubmit={(event) => submitForm(event)}>
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
                                            return <option key={pos.ID} value={pos.ID}>{pos.NAME}</option>
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
        </form>
    );
};

export default AddDirectory;
