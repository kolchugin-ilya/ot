import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import styles from './Employers.module.css';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import useRead from "../../../hooks/useRead";

const Employers = () => {
    const {fetchEmployers} = useRead()
    const {employers} = useSelector(state => state.dataReducer)
    useEffect(() => {
        fetchEmployers()
    }, [])
    return (
        <>
            <MyTable
                title={
                    <div className={styles.title}>
                        <p>Список сотрудников</p>
                        <Link to="/employers/add">
                            <button>+ Добавить</button>
                        </Link>
                    </div>
                }
                data={employers}
                header={[
                    {title: '', field: 'icons'},
                    {title: 'Фамилия', field: 'LAST_NAME'},
                    {title: 'Имя', field: 'FIRST_NAME'},
                    {title: 'Отчество', field: 'OTC'},
                    {title: 'Дата рождения', field: 'BIRTHDAY', type: 'date'},
                    {title: 'Должность', field: 'POSITION_NAME'},
                    {title: 'Подразделение', field: 'PODR_NAME'}
                ]}
            />
        </>
    );
};

export default Employers;

