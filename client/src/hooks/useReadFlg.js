import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {setArrays, setChangeEmployers, setError} from "../store/actions/data-actions";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "grommet";
import {Edit, Trash} from "grommet-icons";

const useReadFlg = () => {
    const dispatch = useDispatch()

    return useMemo(() => ({
        // Список ФЛГ
        fetchFlg() {
            axios.post("http://localhost:3001/read", {
                table: "FLG",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    let flg = [];
                    response.data.result.map(pos => {
                        let pathEdit = "/flg/edit?id=" + pos.ID;
                        flg.push(Object.assign({
                            icons:
                                <div style={{display: "flex"}}>
                                    <Link to={pathEdit}>
                                        <Button icon={<Edit size="35x" color="#74cf70"/>}/>
                                    </Link>
                                    <Button icon={<Trash size="35x" color="#f76f57"/>}
                                            onClick={() => {
                                                if (window.confirm("Удалить данную запись?"))
                                                    axios.post("http://localhost:3001/delete", {
                                                        id: pos.ID,
                                                        table: "FLG"
                                                    })
                                                        .then(response => {
                                                            window.location.reload()
                                                        })
                                                        .catch(error => {
                                                            console.log("check flg error", error);
                                                        });
                                            }
                                            }/>
                                </div>
                        }, pos))
                    })
                    dispatch(setArrays({flg: flg}))
                })
                .catch(error => {
                    console.log("check flg error", error);
                });
        },
        // Заполнение страницы EditPosition
        fetchPositionById(id) {
            axios.post("http://localhost:3001/read", {
                table: "POSITIONS",
                columns: "NAME",
                condition: "AND ID=" + id
            },{withCredentials: true})
                .then(response => {
                    let positions = response.data.result[0];
                    dispatch(setChangeEmployers({
                        namePosition: positions.NAME
                    }))
                })
                .catch(error => {
                    dispatch(setError(
                        {
                            message: error.response.data.message,
                            error: true
                        }))
                    window.setTimeout(
                        window.location = "/position"
                        , 3000);
                });
        }
    }), [dispatch])
}

export default useReadFlg
