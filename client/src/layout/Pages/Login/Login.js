import React, {useEffect} from 'react';
import styles from './Login.module.css'
import logo from '../../../components/Img/logo4.png';
import {Text, TextInput} from "grommet";
import {MyButton} from "../../../components/Button/MyButton";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setError, setLogin} from "../../../store/actions/login-actions";

const Login = () => {
    const {name, password, error} = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3001/login", {
            "name": name,
            "password": password
        }, {withCredentials: true})
            .then(response => {
                    if (response.data.session.userinfo) {
                        localStorage.setItem('userinfo', response.data.session.userinfo.name)
                        window.location = "/"
                    }
                }
            )
            .catch(error => {
                dispatch(setError(
                    {
                        message: error.response.data.message,
                        error: true,
                        style: {borderColor: "red"}
                    }))
                console.log("check login error", error);
            });
    }

    useEffect(() => {
        dispatch(setLogin())
    },[])

    return (
        <div className={styles.container}>
            <title>
                Отдел охраны труда НГТУ
            </title>
            {/*Заголовок*/}
            <div className={styles.header}>
                <img src={logo} alt="Logo"/>
                <div className={styles.text}>
                    <div>
                        НГТУ им. Р. Е. Алексеева
                    </div>
                    <div>
                        «Отдел охраны труда НГТУ»
                    </div>
                </div>
            </div>
            {/*Форма*/}
            <form className={styles.main} onSubmit={(event) => handleSubmit(event)}>
                <Text size="45px">Вход</Text>
                <TextInput
                    style={error.style}
                    required
                    type="text"
                    value={name}
                    placeholder="Логин"
                    onChange={(event) => {
                        dispatch(setLogin(event.target.value, password))
                    }}
                />
                <TextInput
                    style={error.style}
                    required
                    type="password"
                    value={password}
                    placeholder="Пароль"
                    onChange={(event) => {
                        dispatch(setLogin(name, event.target.value))
                    }}
                />
                <div className={styles.buttons}>
                    <MyButton
                        type="submit"
                        label="Вход"
                    />
                    {
                        error &&
                        <div className={styles.message}>{error.message}</div>
                    }
                </div>
            </form>
        </div>
    );
};

export default Login;
