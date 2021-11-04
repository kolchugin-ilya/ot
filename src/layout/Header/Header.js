import React, {useEffect} from 'react';
import styles from './Header.module.css'
import logo from "../../components/img/logo.png";
import {Button, Select} from "grommet";
import {Close, Menu} from "grommet-icons";
import {useDispatch, useSelector} from "react-redux";
import {setToggle} from "../../store/actions/header-actions";

const Header = () => {
    const {show} = useSelector(state => state.toggle)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setToggle())
    }, [dispatch])

    return (
        <>
            <div className={styles.adminHeader}>
                <p>db:12312321</p>
                <div className={styles.select}>
                    <p>user:</p>
                    <Select
                        value={'1'}
                        options={['1', '2', '3']}
                    />
                </div>
            </div>
            <div className={styles.header}>
            <span>
                <Button icon={(show) ? <Close/> : <Menu/>}
                        onClick={() =>
                            show ? dispatch(setToggle(false)) : dispatch(setToggle(true))}/>
            </span>
                <img src={logo} alt="Logo"/>
                <p><b>ИС «Отдел охраны труда НГТУ»</b></p>
            </div>
        </>
    );
};

export default Header;
