import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {setArrays, setChangeEmployers, setError} from "../store/actions/data-actions";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "grommet";
import {Edit, Trash} from "grommet-icons";

const useReadEmployers = () => {
    const dispatch = useDispatch()

    return useMemo(() => ({
        // Список типов персонала на странице TypeEmployers
        fetchTypeEmployers() {
            axios.post("http://localhost:3001/read", {
                table: "TYPE_EMPLOYERS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    let type_emp = [];
                    response.data.result.map(pos => {
                        let pathEdit = "/type_employers/edit?id=" + pos.ID;
                        type_emp.push(Object.assign({
                            icons:
                                <div style={{display: "flex"}}>
                                    <Link to={pathEdit}>
                                        <Button icon={<Edit size="35x" color="#74cf70"/>}/>
                                    </Link>
                                    <Button icon={<Trash size="35x" color="#f76f57"/>}
                                            onClick={() => {
                                                if (window.confirm("Удалить тип персонала?"))
                                                    axios.post("http://localhost:3001/delete", {
                                                        id: pos.ID,
                                                        table: "TYPE_EMPLOYERS"
                                                    })
                                                        .then(response => {
                                                            window.location.reload()
                                                        })
                                                        .catch(error => {
                                                            console.log("check type employers error", error);
                                                        });
                                            }
                                            }/>
                                </div>
                        }, pos))
                    })
                    dispatch(setArrays("typeEmployers", type_emp))
                })
                .catch(error => {
                    console.log("check type employers error", error);
                });
        },
        // Заполнение страницы EditTypeEmployers
        fetchTypeEmployersById(id) {
            axios.post("http://localhost:3001/read", {
                table: "TYPE_EMPLOYERS",
                columns: "NAME",
                condition: "AND ID=" + id
            },{withCredentials: true})
                .then(response => {
                    let positions = response.data.result[0];
                    dispatch(setChangeEmployers({
                        typeEmployers: positions.NAME
                    }))
                })
                .catch(error => {
                    dispatch(setError(
                        {
                            message: error.response.data.message,
                            error: true
                        }))
                    window.setTimeout(
                        window.location = "/type_employers"
                        , 3000);
                });
        }
    }), [dispatch])
}

export default useReadEmployers
