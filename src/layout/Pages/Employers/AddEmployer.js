import React from 'react';
import styles from './Employers.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setEmployers, setNewEmployer} from "../../../store/actions/data-actions";
import axios from "axios";
import {Button} from "grommet";
import {Edit, Trash} from "grommet-icons";

const AddEmployer = () => {
    const {first_name, last_name, otc, tab_number,position, empl_date, snils, birthday, error} = useSelector(state => state.newDataReducer)
    const dispatch = useDispatch();
    const data = [
        {label: "Фамилия", name: "last_name", value: last_name, type: "text"},
        {label: "Имя", name: "first_name", value: first_name, type: "text"},
        {label: "Отчество", name: "otc", value: otc, type: "text"},
        {label: "Табельный номер", name: "tab_number", value: tab_number, type: "text"},
        {label: "Должность", name: "position", value: position, type: "text"},
        {label: "СНИЛС", name: "snils", value: snils, type: "text"},
        {label: "Дата приёма", name: "empl_date", value: empl_date, type: "date"},
        {label: "День рождения", name: "birthday", value: birthday, type: "date"}
    ]
    const handleChange = (event) => {
        if (event.target.value.trim() !== "")
        dispatch(setNewEmployer(event.target.name, event.target.value))
    }
    return (
        <form className={styles.container} onSubmit={(event) => {
            event.preventDefault();
            console.log(
                " last_name " + last_name +
                "first_name " + first_name +
                "дата приёма: " + empl_date
            )
            axios.post("http://localhost:3001/create", {
                table: "EMPLOYERS",
                columns: "LAST_NAME, FIRST_NAME, OTC, BIRTHDAY, ACTIVE_SIGN",
                values: `'${last_name}', '${first_name}', '${otc}', '${birthday}', 1`
            })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log("check login error", error);
                });
        }}>
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
