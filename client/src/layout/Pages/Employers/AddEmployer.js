import React, {useEffect} from 'react';
import styles from '../Styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setChangeEmployers} from "../../../store/actions/data-actions";
import axios from "axios";
import {dataExport} from "./vars";
import useReadEmployers from "../../../hooks/useReadEmployers";

const AddEmployer = () => {
    const {fetchPositions, fetchPodr} = useReadEmployers()
    const {position, podr} = useSelector(state => state.dataReducer)
    const state = useSelector(state => state.changeDataReducer)
    const dispatch = useDispatch();
    const data = dataExport(state, {position, podr})
    const handleChange = (event) => {
        dispatch(setChangeEmployers({...state, [event.target.name]: event.target.value}))
    }
    // Создание нового сотрудника
    const submitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/create", {
            table: "EMPLOYERS",
            columns: "LAST_NAME, FIRST_NAME, OTC, TAB_NUMBER, POSITION, PODR_ID, SNILS, EMPLOYMENT_DATE, BIRTHDAY, ACTIVE_SIGN",
            values: `'${state.last_name}', '${state.first_name}', '${state.otc}', '${state.tab_number}' , '${state.position}', '${state.podr}', '${state.snils}', '${state.employment_date}', '${state.birthday}', 1`
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
        dispatch(setChangeEmployers({
                ...state,
                last_name: "",
                first_name: "",
                otc: "",
                tab_number: "",
                position: 1,
                snils: "",
                employment_date: "",
                birthday: "",
                podr: 1
            }
        ))
        fetchPositions();
        fetchPodr()
    }, [])
    console.log(state)
    return (
        <form className={styles.container} onSubmit={(event) => submitForm(event)}>
            <p className={styles.titleAdd}>Добавление сотрудника</p>
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
                                            return <option value={pos.ID}>{pos.NAME}</option>
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

export default AddEmployer;
