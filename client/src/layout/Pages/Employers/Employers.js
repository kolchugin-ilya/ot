import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import styles from './Employers.module.css';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setEmployers} from "../../../store/actions/data-actions";
import {Edit, Trash} from "grommet-icons";
import {Button} from "grommet";
import {Link} from "react-router-dom";

const Employers = () => {
    const {employers} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()
    // Удаление сотрудника
    const deleteEmployer = (id) => {
        axios.post("http://localhost:3001/delete", {
            id: id,
            table: "EMPLOYERS"
        })
            .then(response => {
                readEmployers();
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }
    // Выгрузка всех сотрудников
    const readEmployers = () => {
        axios.post("http://localhost:3001/read", {
            table: "EMPLOYERS",
            columns: "ID, LAST_NAME, FIRST_NAME, OTC, BIRTHDAY, POSITION, PODR_ID",
            condition: ""
        })
            .then(response => {
                let employers = [];
                /* Идём по массиву сотрудников и каждому добавляем
                 кнопки Редактировать и Удалить */
                response.data.result.map(emp => {
                    let pathEdit = "/employers/edit?id=" + emp.ID;
                    employers.push(Object.assign({
                        icons:
                            <div style={{display: "flex"}}>
                                <Link to={pathEdit}>
                                    <Button icon={<Edit size="35x" color="#74cf70"/>}/>
                                </Link>
                                <Button icon={<Trash size="35x" color="#f76f57"/>}
                                        onClick={() => deleteEmployer(emp.ID)}/>
                            </div>
                    }, emp))
                })
                // Изменяем состояние массива сотрудников
                dispatch(setEmployers(employers))
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }
    useEffect(() => {
        readEmployers();
    }, [])
    return (
        <>
            <MyTable
                title={<div className={styles.title}>
                    <p>Список сотрудников</p>
                    <Link to="/employers/add">
                        <button>+ Добавить</button>
                    </Link>
                </div>}
                data={employers}
                header={[
                    {title: '', field: 'icons'},
                    {title: 'Фамилия', field: 'LAST_NAME'},
                    {title: 'Имя', field: 'FIRST_NAME'},
                    {title: 'Отчество', field: 'OTC'},
                    {title: 'Дата рождения', field: 'BIRTHDAY', type: 'date'},
                    {title: 'Должность', field: 'POSITION'},
                    {title: 'Подразделение', field: 'PODR_ID'}
                ]}
            />
        </>
    );
};

export default Employers;

