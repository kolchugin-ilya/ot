import React, {useEffect} from 'react';
import styles from './Position.module.css';
import axios from "axios";
import {setChangeBRs} from "../../../store/actions/data-actions";
import {useDispatch, useSelector} from "react-redux";

const AddPosition = () => {
    const {namePosition} = useSelector(state => state.changeDataReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setChangeBRs('changePositions', {namePosition: ""}))
    }, [])

    function submitForm(event) {
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
    function onChange(event) {
        dispatch(setChangeBRs('changePositions', {namePosition: event.target.value}))
    }

    return (
        <form className={styles.container} onSubmit={(event) => submitForm(event)}>
            <p className={styles.titleAdd}>Добавление должности</p>
                     <div className={styles.row}>
                        <p>Должность</p>
                        <input onChange={(event) => onChange(event)} required name="namePosition" value={namePosition} type="text"
                        />
                    </div>
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default AddPosition;
