import React, {useEffect} from 'react';
import styles from './Position.module.css';

const AddPosition = ({field, submitForm, clearFields, onChange, formTitle, label}) => {
    useEffect(() => {
        clearFields()
    }, [])
    return (
        <form className={styles.container} onSubmit={(event) => submitForm(event)}>
            <p className={styles.titleAdd}>{formTitle}</p>
                     <div className={styles.row}>
                        <p>{label}</p>
                        <input onChange={(event) => onChange(event)} required name={field} value={field} type="text"
                        />
                    </div>
            <button type="submit">Сохранить</button>
        </form>
    );
};

export default AddPosition;
