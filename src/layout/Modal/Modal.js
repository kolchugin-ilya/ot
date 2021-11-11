import React from 'react';
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import styles from './Modal.module.css';

const Modal = () => {
    return (
            <Rodal visible={true}
                   onClose={() => alert("alert close")}
                   width="75"
                   height="75"
                   measure="%"
            >
                <div className={styles.container}>
123
                </div>
            </Rodal>
    );
};

export default Modal;
