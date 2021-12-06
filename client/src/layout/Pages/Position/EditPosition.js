import React, {useEffect} from 'react';
import styles from "./Position.module.css";
import {useSelector} from "react-redux";

const EditPosition = ({field, submitForm, onChange,fetchBr, id, formTitle, label}) => {
    const {error} = useSelector(state => state.dataReducer)

    useEffect(() => {
        fetchBr()
    }, [])
    return (
        id ?
            !error.error ?
                (<form className={styles.container} onSubmit={(event) => submitForm(event)}>
                    <p className={styles.titleAdd}>{formTitle}</p>
                             <div className={styles.row}>
                                <p>{label}</p>
                                <input onChange={(event) => onChange(event)} required name={field}
                                       value={field} type="text"
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
