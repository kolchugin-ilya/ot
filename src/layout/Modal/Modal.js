import React, {useEffect} from 'react';
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import styles from './Modal.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setCloseButton} from "../../store/actions/modal-actions";

const employers = [
    'Фамилия',
    'Имя',
    'Отчество',
    'Таб. номер\n',
    'Должность',
    'Тип персонала',
    'Дата приема',
    'Подразделение',
    'СНИЛС',
    'Дата рождения',
    'Фамилия',
];

const Modal = () => {
    const {showModal} = useSelector(state => state.closeButton)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCloseButton('close'))
    }, [dispatch])

    return (
        <Rodal visible={showModal}
               onClose={() => {
                   dispatch(setCloseButton('close'))
               }}
               width={75}
               height={75}
               measure="%"
        >
            <div className={styles.container}>
                modal
                {
                    employers.map(emp => {
                        return <div className={styles.input}>
                            <p> {emp} </p>
                            <input/>
                        </div>
                    })
                }
                <div className={styles.button}>
                <button>123</button>
                </div>
            </div>
        </Rodal>
    );
};

export default Modal;
