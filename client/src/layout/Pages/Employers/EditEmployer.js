import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import styles from "./Employers.module.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setError, setNewData} from "../../../store/actions/data-actions";
import {dataExport} from "./vars";

const EditEmployer = () => {
    const state = useSelector(state => state.newDataReducer)
    const {error} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()
    // Для динамического формирования формы
    const data = dataExport(state.first_name, state.last_name, state.otc, state.tab_number, state.position, state.employment_date, state.snils, state.birthday)
    const id = new URLSearchParams(useLocation().search).get("id");
    /* Изменяем состояние соответствующего значения в инпуте */
    const handleChange = (event) => {
        if (event.target.value.trim() !== "")
            dispatch(setNewData(event.target.name, event.target.value))
    }
    // Сабмит формы, передаём айди, название таблицы и изменяемые поля
    const submitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/update", {
            id: id,
            table: "EMPLOYERS",
            columns: `LAST_NAME='${state.last_name}', FIRST_NAME='${state.first_name}',OTC='${state.otc}',
                      TAB_NUMBER='${state.tab_number}', POSITION='${state.position}', SNILS='${state.snils}',
                      EMPLOYMENT_DATE='${state.employment_date}', BIRTHDAY='${state.birthday}', ACTIVE_SIGN=1`
        })
            .then(response => {
                console.log(response)
                window.location = "/employers";
            })
            .catch(error => {
                console.log("check update error", error);
            });
    }
    // Выгрузка соответствующего сотрудника
    useEffect(() => {
        axios.post("http://localhost:3001/read", {
            table: "EMPLOYERS",
            columns: "LAST_NAME, FIRST_NAME, OTC, TAB_NUMBER, SNILS",
            condition: "AND ID=" + id
        },{withCredentials: true})
            .then(response => {
                // Заполнение инпутов
                Object.entries(response.data.result[0]).map(emp => {
                    // console.log("1: " + emp[0].toLowerCase() + " 2: " + emp[1])
                    //     dispatch(setNewData(emp[0].toLowerCase(), emp[1]))
                    }
                )
            })
            .catch(error => {
                dispatch(setError(
                    {
                        message: error.response.data.message,
                        error: true
                    }))
                window.setTimeout(
                    window.location = "/employers"
                    , 3000);
            });
    }, [])
    return (
        id ?
            !error.error ?
            (<form className={styles.container} onSubmit={(event) => submitForm(event)}>
                <p className={styles.titleAdd}>Изменение сотрудника</p>
                {
                    data &&
                    data.map(data => {
                        return <div key={data.name} className={styles.row}>
                            <p>{data.label}</p>
                            <input onChange={(event) => handleChange(event)} required name={data.name}
                                   value={data.value} type={data.type}
                            />
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
                Некорректный ID сотрудника!
            </div>

    );
};

export default EditEmployer;
