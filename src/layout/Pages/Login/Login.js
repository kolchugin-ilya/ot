import React from 'react';
import styles from './Login.module.css'
import logo from '../../../components/img/logo4.png';
import {CheckBox, Text, TextInput} from "grommet";
import {MyButton} from "../../../components/Button/MyButton";

const Login = () => {
    return (
            <div className={styles.container}>
                <title>
                    Отдел охраны труда НГТУ
                </title>
                {/*Заголовок*/}
                <div className={styles.header}>
                    <img src={logo} alt="Logo" />
                    <div className={styles.text}>
                        <div>
                            НГТУ им. Р. Е. Алексеева
                        </div>
                        <div>
                            «Отдел охраны труда НГТУ»
                        </div>
                    </div>
               </div>
                <div className={styles.main}>
                    <Text size="45px">Вход</Text>
                    <TextInput
                        placeholder="Логин"
                    />
                    <TextInput
                        type={"password"}
                        placeholder="Пароль"
                    />
                    <div className={styles.buttons}>
                        <div className={styles.checkbox}>
                            <input type="checkbox" />
                            <label>Сохранить пароль</label>
                        </div>
                            <MyButton
                                label="Вход"
                            />
                    </div>
                </div>
            </div>
    );
};

export default Login;
