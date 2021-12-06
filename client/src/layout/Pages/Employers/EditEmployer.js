import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import styles from "./Employers.module.css";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setArrays, setChangeEmployers, setError} from "../../../store/actions/data-actions";
import {dataExport} from "./vars";
import useSurvey from "../../../hooks/customHooks";

const EditEmployer = () => {
    const {fetchPositions} = useSurvey()
    const state = useSelector(state => state.changeDataReducer)
    const {position} = useSelector(state => state.dataReducer)
    const {error} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()
    // Для динамического формирования формы
    const data = dataExport(state.first_name, state.last_name, state.otc, state.tab_number, state.position, position, state.employment_date, state.snils, state.birthday)
    const id = new URLSearchParams(useLocation().search).get("id");
    /* Изменяем состояние соответствующего значения в инпуте */
    const handleChange = (event) => {
        dispatch(setChangeEmployers({...state, [event.target.name]: event.target.value}))
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
                window.location = "/employers";
            })
            .catch(error => {
                console.log("check update error", error);
            });
    }
    // Выгрузка соответствующего сотрудника
    useEffect(() => {
        // axios.post("http://localhost:3001/read", {
        //     table: "POSITIONS",
        //     columns: "ID, NAME",
        //     condition: ""
        // })
        //     .then(response => {
        //         dispatch(setArrays("position", response.data.result))
        //     })
        //     .catch(error => {
        //         console.log("check pos error", error);
        //     });
        fetchPositions();
        axios.post("http://localhost:3001/read", {
            table: "EMPLOYERS",
            columns: "*",
            condition: "AND ID=" + id
        }, {withCredentials: true})
            .then(response => {
                let employers = response.data.result[0];
                dispatch(setChangeEmployers({
                    first_name: employers.FIRST_NAME,
                    last_name: employers.LAST_NAME,
                    otc: employers.OTC,
                    tab_number: employers.TAB_NUMBER,
                    position: employers.POSITION,
                    employment_date: employers.EMPLOYMENT_DATE,
                    snils: employers.SNILS,
                    birthday: employers.BIRTHDAY
                }))
            })
            .catch(error => {
                dispatch(setError(
                    {
                        message: error.response.data.message,
                        error: true
                    }))
                window.setTimeout(
                    window.location = "/employers"
                    , 5000);
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
