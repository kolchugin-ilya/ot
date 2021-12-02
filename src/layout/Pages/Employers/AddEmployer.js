import React, {useEffect} from 'react';
import styles from './Employers.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setNewEmployer} from "../../../store/actions/data-actions";
import axios from "axios";
import {dataExport} from "./vars";

const AddEmployer = () => {
    const state = useSelector(state => state.newDataReducer)
    const dispatch = useDispatch();
    const data = dataExport(state.first_name, state.last_name, state.otc, state.tab_number,state.position, state.employment_date, state.snils, state.birthday)
    const handleChange = (event) => {
        if (event.target.value.trim() !== "")
        dispatch(setNewEmployer(event.target.name, event.target.value))
    }
    // Создание нового сотрудника
    const submitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/create", {
            table: "EMPLOYERS",
            columns: "LAST_NAME, FIRST_NAME, OTC, TAB_NUMBER, POSITION, SNILS, EMPLOYMENT_DATE, BIRTHDAY, ACTIVE_SIGN",
            values: `'${state.last_name}', '${state.first_name}', '${state.otc}', '${state.tab_number}' , '${state.position}', '${state.snils}', '${state.employment_date}', '${state.birthday}', 1`
        })
            .then(response => {
                console.log(response)
                window.location = "/employers"
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }
    useEffect(() => {
        /* При каждой загрузке страницы обнуляем состояние */
        Object.entries(state).map(emp => {
            dispatch(setNewEmployer(emp[0], ""))
        })
    }, [])
    return (
        <form className={styles.container} onSubmit={(event) => submitForm(event)}>
            <p className={styles.titleAdd}>Добавление сотрудника</p>
            {
                data.map(data => {
                    return <div key={data.name} className={styles.row}>
                        <p>{data.label}</p>
                        <input onChange={(event) => handleChange(event)} required name={data.name} value={data.value} type={data.type}
                        />
                    </div>
                })
            }
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default AddEmployer;
