import React, {useEffect} from 'react';
import axios from "axios";
import {setChangeBRs} from "../../../store/actions/data-actions";
import {useDispatch, useSelector} from "react-redux";
import styles from '../Styles.module.css';

const AddPosition = () => {
    const {nameTypeEmployers} = useSelector(state => state.changeDataReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setChangeBRs('changeTypeEmployers', {nameTypeEmployers: ""}))
    }, [])

    function submitForm(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/create", {
            table: "TYPE_EMPLOYERS",
            columns: "NAME, ACTIVE_SIGN",
            values: `'${nameTypeEmployers}', 1`
        })
            .then(response => {
                console.log(response)
                window.location = "/type_employers"
            })
            .catch(error => {
                console.log("check type employers error", error);
            });
    }

    function onChange(event) {
        dispatch(setChangeBRs('changeTypeEmployers', {nameTypeEmployers: event.target.value}))
    }

    return (
        <form className={styles.container} onSubmit={(event) => submitForm(event)}>
            <p className={styles.titleAdd}>Добавление типа персонала</p>
            <div className={styles.row}>
                <p>Тип персонала</p>
                <input onChange={(event) => onChange(event)} required name="nameTypeEmployers" value={nameTypeEmployers}
                       type="text"
                />
            </div>
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default AddPosition;
