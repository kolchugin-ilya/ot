import React from 'react';
import styles from './Navbar.module.css';
import {Link} from "react-router-dom";

const MyNav = () => {
    return (
        <div className={styles.list}>
            <ul>
                <li>Справочники</li>
                <li><Link to="spisok_sotr">Список сотрудников</Link></li>
                <li><Link to="dolzh">Должность</Link></li>
                <li><Link to="tip_pers">Тип персонала</Link></li>
                <li><Link to="vid_zanyatosti">Вид занятости</Link></li>
                <li><Link to="podr">Подразделения</Link></li>
                <li><Link to="flg">ФЛГ</Link></li>
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
                <li><Link to="">Выйти</Link></li>
            </ul>
        </div>
    )
}

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <MyNav/>
            </div>
            <div className={styles.navbarMobile}>
                <MyNav/>
            </div>
        </div>
    );
};

export default Navbar;