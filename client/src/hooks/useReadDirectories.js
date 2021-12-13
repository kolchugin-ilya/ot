import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {setArrays, setChangeEmployers, setError} from "../store/actions/data-actions";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "grommet";
import {Edit, Trash} from "grommet-icons";

function postDirectories(array,path, tableName, row) {
    let pathEdit = `/${path}/edit?id=` + row.ID;
    array.push(Object.assign({
        icons:
            <div style={{display: "flex"}}>
                <Link to={pathEdit}>
                    <Button icon={<Edit size="35x" color="#74cf70"/>}/>
                </Link>
                <Button icon={<Trash size="35x" color="#f76f57"/>}
                        onClick={() => {
                            if (window.confirm("Удалить запись?"))
                                axios.post("http://localhost:3001/delete", {
                                    id: row.ID,
                                    table: `${tableName}`
                                })
                                    .then(response => {
                                        window.location.reload()
                                    })
                                    .catch(error => {
                                        console.log("check directory read error", error);
                                    });
                        }
                        }/>
            </div>
    }, row))
}

const useReadDirectories = () => {
    const dispatch = useDispatch()

    return useMemo(() => ({
        // Массив сотрудников на странице Employers
        fetchEmployers() {
            axios.post("http://localhost:3001/readEmployers")
                .then(response => {
                    let employers = [];
                    /* Идём по массиву сотрудников и каждому добавляем
                     кнопки Редактировать и Удалить */
                    response.data.result.map(emp => {

                    })
                    // Изменяем состояние массива сотрудников
                    dispatch(setArrays({employers: employers}))
                }
                )
                .catch(error => {
                    console.log("check login error", error);
                });
        },
    }), [dispatch])
}

export default useReadDirectories
