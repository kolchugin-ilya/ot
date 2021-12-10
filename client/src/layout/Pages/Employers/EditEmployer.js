import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import styles from "./Employers.module.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setChangeEmployers} from "../../../store/actions/data-actions";
import {dataExport} from "./vars";
import useReadEmployers from "../../../hooks/useReadEmployers";

const EditEmployer = () => {
    const {fetchPositions, fetchPodr, fetchEmployersById} = useReadEmployers()
    const state = useSelector(state => state.changeDataReducer)
    const {position, podr, error} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()
    const data = dataExport(state, {position, podr})
    const id = new URLSearchParams(useLocation().search).get("id");
    const handleChange = (event) => {
        dispatch(setChangeEmployers({...state, [event.target.name]: event.target.value}))
    }
    const submitForm = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/update", {
            id: id,
            table: "EMPLOYERS",
            columns: `LAST_NAME='${state.last_name}', FIRST_NAME='${state.first_name}',OTC='${state.otc}',
                      TAB_NUMBER='${state.tab_number}', POSITION='${state.position}', SNILS='${state.snils}',
                      EMPLOYMENT_DATE='${state.employment_date}', BIRTHDAY='${state.birthday}', PODR_ID='${state.podr}', ACTIVE_SIGN=1`
        })
            .then(response => {
                window.location = "/employers";
            })
            .catch(error => {
                console.log("check update error", error);
            });
    }
    useEffect(() => {
        fetchPositions();
        fetchPodr();
        fetchEmployersById(id)
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
                                {
                                    (data.type === "select") ?
                                        <select name={data.name} required onChange={(event) => handleChange(event)}>
                                            {
                                                data.options.map(pos => {
                                                    return <option selected={(pos.ID===data.value)} value={pos.ID}>{pos.NAME}</option>
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
                </form>)
                :
                <div className={styles.container}>
                    {
                        error.message
                    }
                </div>
            :
            <div className={styles.container}>
                Некорректный параметр ID!
            </div>

    );
};

export default EditEmployer;
