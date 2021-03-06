import React from 'react';
import styles from './Navbar.module.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import axios from "axios";
import {setSession} from "../../store/actions/login-actions";

const MyNav = () => {
    const dispatch = useDispatch();

    const logout = () => {
        axios.post("http://localhost:3001/logout", {}, {withCredentials: true})
            .then(response => {
                localStorage.clear()
                dispatch(setSession({name: "", role: ""}))
                window.location = "/"
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    return (
        <div className={styles.list}>
            <ul>
                <li>Справочники</li>
                <li><Link to="/employers">Список сотрудников</Link></li>
                <li><Link to="/position">Должность</Link></li>
                <li><Link to="/type_employers">Тип персонала</Link></li>
                <li><Link to="/job_type">Вид занятости</Link></li>
                <li><Link to="/podr">Подразделения</Link></li>
                <li><Link to="/flg">ФЛГ</Link></li>
                <li><Link to="/factors">Вредные факторы</Link></li>
            </ul>
            <ul>
                <li>Отчеты</li>
                <li><Link to="import">Импорт данных из 1С</Link></li>
            </ul>
            <ul>
                <li>Администратору</li>
                <li><Link to="polzovateli">Пользователи системы</Link></li>
            </ul>
            <ul>
                <li><Link onClick = {() => logout()} to="">Выйти</Link></li>
            </ul>
        </div>
    )
}

const Navbar = () => {
    const {show} = useSelector(state => state.toggle)

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <MyNav/>
            </div>
            {
                show &&
                <div className={styles.navbarMobile}>
                    <MyNav/>
                </div>
            }
        </div>
    );
};

export default Navbar;
