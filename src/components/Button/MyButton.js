import React from 'react';
import styles from './MyButton.module.css'

export const MyButton = (props) => {
    return (
        <button className={styles.button}>
            {
                props.label
            }
        </button>
    );
};
