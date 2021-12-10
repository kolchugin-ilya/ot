import React, {useEffect} from 'react';
import styles from '../Styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setChangeBRs} from "../../../store/actions/data-actions";
import axios from "axios";
import {useLocation} from "react-router-dom";
import useReadPositions from "../../../hooks/useReadPositions";

const EditPosition = () => {
    const id = new URLSearchParams(useLocation().search).get("id");
    const {error} = useSelector(state => state.dataReducer)
    const {namePosition} = useSelector(state => state.changeDataReducer)
    const {fetchPositionById} = useReadPositions();
    const dispatch = useDispatch()

    useEffect(() => {
        fetchPositionById(id)
    }, [])

    function submitForm(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/update", {
            id: id,
            table: "POSITIONS",
            columns: `NAME='${namePosition}'`
        })
            .then(response => {
                console.log(response)
                window.location = "/position"
            })
            .catch(error => {
                console.log("check update error", error);
            });
    }
    function onChange(event) {
        dispatch(setChangeBRs('changePositions', {namePosition: event.target.value}))
    }
    return (
        id ?
            !error.error ?
                (<form className={styles.container} onSubmit={(event) => submitForm(event)}>
                    <p className={styles.titleAdd}>Изменение должности</p>
                             <div className={styles.row}>
                                <p>Должность</p>
                                <input onChange={(event) => onChange(event)} required name={namePosition}
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
