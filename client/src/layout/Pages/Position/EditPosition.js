import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import styles from "./Position.module.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setError, setNewData} from "../../../store/actions/data-actions";

const EditPosition = () => {
    const {namePosition} = useSelector(state => state.newDataReducer)
    const {error} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()
    const id = new URLSearchParams(useLocation().search).get("id");
    const handleChange = (event) => {
        if (event.target.value.trim() !== "")
            dispatch(setNewData("namePosition", event.target.value))
    }
    const submitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/update", {
            id: id,
            table: "POSITIONS",
            columns: `NAME='${namePosition}'`
        })
            .then(() => window.location = "/position")
            .catch(error => {
                console.log("check update error", error);
            });
    }
    useEffect(() => {
        axios.post("http://localhost:3001/read", {
            table: "POSITIONS",
            columns: "NAME",
            condition: "AND ID=" + id
        },{withCredentials: true})
            .then(response => {
                // Заполнение инпутов
                Object.entries(response.data.result[0]).map(cur => {
                        // dispatch(setNewData("namePosition", cur[1]))
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
                    window.location = "/position"
                    , 3000);
            });
    }, [])
    return (
        id ?
            !error.error ?
                (<form className={styles.container} onSubmit={(event) => submitForm(event)}>
                    <p className={styles.titleAdd}>Изменение должности</p>
                             <div key="1231" className={styles.row}>
                                <p>Должность</p>
                                <input onChange={(event) => handleChange(event)} required name="name"
                                       value={namePosition} type="text"
                                />
                            </div>
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
                Некорректный ID!
            </div>

    );
};

export default EditPosition;
