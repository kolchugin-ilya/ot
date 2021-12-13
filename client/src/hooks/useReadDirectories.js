import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {setArrays, setChangeEmployers, setError} from "../store/actions/data-actions";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "grommet";
import {Edit, Trash} from "grommet-icons";

function postDirectories(array,pathEdit,tableName,row) {
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
                                    .then(() => {
                                        window.location.reload()
                                    })
                                    .catch(error => {
                                        console.log(`check directory ${tableName} error`, error);
                                    });
                        }
                        }/>
            </div>
    }, row))
}

const useReadDirectories = () => {
    const dispatch = useDispatch()

    return useMemo(() => ({
        // Массив сотрудников
        fetchEmployers() {
            axios.post("http://localhost:3001/readEmployers")
                .then(response => {
                    let array = [];
                    response.data.result.map(curr => {
                        let pathEdit = "/employers/edit?id=" + curr.ID
                        postDirectories(array,pathEdit,"EMPLOYERS",curr)
                    })
                    dispatch(setArrays({employers: array}))
                }
                )
                .catch(error => {
                    console.log("check directory EMPLOYERS error", error);
                });
        },
        // Массив должностей
        fetchPositions() {
            axios.post("http://localhost:3001/read", {
                table: "POSITIONS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                        let array = [];
                        response.data.result.map(curr => {
                            let pathEdit = "/position/edit?id=" + curr.ID
                            postDirectories(array,pathEdit,"POSITIONS",curr)
                        })
                        dispatch(setArrays({position: array}))
                    }
                )
                .catch(error => {
                    console.log("check directory POSITIONS error", error);
                });
        },
        // Массив типов персонала
        fetchTypeEmployers() {
            axios.post("http://localhost:3001/read", {
                table: "TYPE_EMPLOYERS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                        let array = [];
                        response.data.result.map(curr => {
                            let pathEdit = "/type_employers/edit?id=" + curr.ID
                            postDirectories(array,pathEdit,"TYPE_EMPLOYERS",curr)
                        })
                        dispatch(setArrays({type_employers: array}))
                    }
                )
                .catch(error => {
                    console.log("check directory TYPE_EMPLOYERS error", error);
                });
        },
        // Массив видов занятости
        fetchJobType() {
            axios.post("http://localhost:3001/read", {
                table: "JOB_TYPE",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                        let array = [];
                        response.data.result.map(curr => {
                            let pathEdit = "/job_type/edit?id=" + curr.ID
                            postDirectories(array,pathEdit,"JOB_TYPE",curr)
                        })
                        dispatch(setArrays({job_type: array}))
                    }
                )
                .catch(error => {
                    console.log("check directory JOB_TYPE error", error);
                });
        },
        // Массив видов занятости
        fetchPodr() {
            axios.post("http://localhost:3001/read", {
                table: "PODR",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                        let array = [];
                        response.data.result.map(curr => {
                            let pathEdit = "/podr/edit?id=" + curr.ID
                            postDirectories(array,pathEdit,"PODR",curr)
                        })
                        dispatch(setArrays({podr: array}))
                    }
                )
                .catch(error => {
                    console.log("check directory PODR error", error);
                });
        },
        // Массив ФЛГ
        fetchFlg() {
            axios.post("http://localhost:3001/read", {
                table: "FLG",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                        let array = [];
                        response.data.result.map(curr => {
                            let pathEdit = "/flg/edit?id=" + curr.ID
                            postDirectories(array,pathEdit,"FLG",curr)
                        })
                        dispatch(setArrays({flg: array}))
                    }
                )
                .catch(error => {
                    console.log("check directory FLG error", error);
                });
        },
        // Массив вредных факторов
        fetchFactors() {
            axios.post("http://localhost:3001/read", {
                table: "FACTORS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                        let array = [];
                        response.data.result.map(curr => {
                            let pathEdit = "/factors/edit?id=" + curr.ID
                            postDirectories(array,pathEdit,"FACTORS",curr)
                        })
                        dispatch(setArrays({factors: array}))
                    }
                )
                .catch(error => {
                    console.log("check directory FACTORS error", error);
                });
        },
    }), [dispatch])
}

export default useReadDirectories
