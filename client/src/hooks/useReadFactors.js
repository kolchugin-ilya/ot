import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {setArrays, setChangeEmployers, setError} from "../store/actions/data-actions";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "grommet";
import {Edit, Trash} from "grommet-icons";

const useReadFactors = () => {
    const dispatch = useDispatch()

    return useMemo(() => ({
        // Список вредных факторов
        fetchFactors() {
            axios.post("http://localhost:3001/read", {
                table: "FACTORS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    let factors = [];
                    response.data.result.map(pos => {
                        let pathEdit = "/factors/edit?id=" + pos.ID;
                        factors.push(Object.assign({
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
                                                        table: "FACTORS"
                                                    })
                                                        .then(response => {
                                                            window.location.reload()
                                                        })
                                                        .catch(error => {
                                                            console.log("check factors error", error);
                                                        });
                                            }
                                            }/>
                                </div>
                        }, pos))
                    })
                    dispatch(setArrays({factors: factors}))
                })
                .catch(error => {
                    console.log("check factors error", error);
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

export default useReadFactors
