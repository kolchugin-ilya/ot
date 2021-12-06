import React, {useEffect} from 'react';
import styles from './Position.module.css';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

const AddPosition = () => {
    const {namePosition} = useSelector(state => state.newDataReducer)
    const dispatch = useDispatch();
    const submitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/create", {
            table: "POSITIONS",
            columns: "NAME, ACTIVE_SIGN",
            values: `'${namePosition}', 1`
        })
            .then(response => {
                console.log(response)
                window.location = "/position"
            })
            .catch(error => {
                console.log("check position error", error);
            });
    }
    useEffect(() => {
            // dispatch(setNewData("namePosition", ""))
    }, [])
    return (
        <form className={styles.container} onSubmit={(event) => submitForm(event)}>
            <p className={styles.titleAdd}>Добавление должности</p>
                     <div key={"123"} className={styles.row}>
                        <p>Должность</p>
                        {/*<input onChange={(event) => dispatch(setNewData("namePosition", event.target.value))} required name="name" value={namePosition} type="text"*/}
                        />
                    </div>
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default AddPosition;
