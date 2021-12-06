import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import styles from "./Position.module.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import useRead from "../../../hooks/useRead";
import {setChangeBRs} from "../../../store/actions/data-actions";

const EditPosition = () => {
    const {fetchPosition} = useRead()
    const {namePosition} = useSelector(state => state.changeDataReducer)
    const {error} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch();
    const id = new URLSearchParams(useLocation().search).get("id");
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
        fetchPosition(id)
    }, [])
    return (
        id ?
            !error.error ?
                (<form className={styles.container} onSubmit={(event) => submitForm(event)}>
                    <p className={styles.titleAdd}>Изменение должности</p>
                             <div className={styles.row}>
                                <p>Должность</p>
                                <input onChange={(event) => dispatch(setChangeBRs('changePositions', {namePosition: event.target.value}))} required name="name"
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
