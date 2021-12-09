import React, {useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {setArrays, setChangeEmployers, setError} from "../store/actions/data-actions";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button} from "grommet";
import {Edit, Trash} from "grommet-icons";

const useRead = () => {
    const dispatch = useDispatch()

    return useMemo(() => ({
        fetchEmployers() {
            axios.post("http://localhost:3001/readEmployers")
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
                                            onClick={() => {
                                                if (window.confirm("Удалить сотрудника?"))
                                                    axios.post("http://localhost:3001/delete", {
                                                        id: emp.ID,
                                                        table: "EMPLOYERS"
                                                    })
                                                        .then(response => {
                                                            window.location.reload()
                                                        })
                                                        .catch(error => {
                                                            console.log("check login error", error);
                                                        });
                                            }
                                            }/>
                                </div>
                        }, emp))
                    })
                    // Изменяем состояние массива сотрудников
                    dispatch(setArrays("employers", employers))
                })
                .catch(error => {
                    console.log("check login error", error);
                });
        },
        fetchEmployersById(id) {
            axios.post("http://localhost:3001/readEmployersById", {
                id: id
            }, {withCredentials: true})
                .then(response => {
                    let employers = response.data.result[0];
                    dispatch(setChangeEmployers({
                        first_name: employers.FIRST_NAME,
                        last_name: employers.LAST_NAME,
                        otc: employers.OTC,
                        tab_number: employers.TAB_NUMBER,
                        position: employers.POSITION,
                        employment_date: employers.EMPLOYMENT_DATE,
                        snils: employers.SNILS,
                        birthday: employers.BIRTHDAY
                    }))
                })
                .catch(error => {
                    dispatch(setError(
                        {
                            message: error.response.data.message,
                            error: true
                        }))
                    window.setTimeout(
                        window.location = "/employers"
                        , 5000);
                });
        },
        fetchPositions() {
            axios.post("http://localhost:3001/read", {
                table: "POSITIONS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    dispatch(setArrays("position", response.data.result))
                })
                .catch(error => {
                    console.log("check pos error", error);
                });
        },
        fetchTypeEmployers() {
            axios.post("http://localhost:3001/read", {
                table: "TYPE_EMPLOYERS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    dispatch(setArrays("type_employers", response.data.result))
                })
                .catch(error => {
                    console.log("check type_emp error", error);
                });
        },
        fetchPodr() {
            axios.post("http://localhost:3001/read", {
                table: "PODR",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    dispatch(setArrays("podr", response.data.result))
                })
                .catch(error => {
                    console.log("check podr error", error);
                });
        },
        fetchPodrBr() {
            axios.post("http://localhost:3001/read", {
                table: "PODR",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    let podr = [];
                    response.data.result.map(pos => {
                        let pathEdit = "/podr/edit?id=" + pos.ID;
                        podr.push(Object.assign({
                            icons:
                                <div style={{display: "flex"}}>
                                    <Link to={pathEdit}>
                                        <Button icon={<Edit size="35x" color="#74cf70"/>}/>
                                    </Link>
                                    <Button icon={<Trash size="35x" color="#f76f57"/>}
                                            onClick={() => {
                                                if (window.confirm("Удалить подразделение?"))
                                                    axios.post("http://localhost:3001/delete", {
                                                        id: pos.ID,
                                                        table: "PODR"
                                                    })
                                                        .then(response => {
                                                            window.location.reload()
                                                        })
                                                        .catch(error => {
                                                            console.log("check podr error", error);
                                                        });
                                            }
                                            }/>
                                </div>
                        }, pos))
                    })
                    dispatch(setArrays("podr", podr))
                })
                .catch(error => {
                    console.log("check podr error", error);
                });
        },
        fetchPositionsBr() {
            axios.post("http://localhost:3001/read", {
                table: "POSITIONS",
                columns: "ID, NAME",
                condition: ""
            })
                .then(response => {
                    let positions = [];
                    response.data.result.map(pos => {
                        let pathEdit = "/position/edit?id=" + pos.ID;
                        positions.push(Object.assign({
                            icons:
                                <div style={{display: "flex"}}>
                                    <Link to={pathEdit}>
                                        <Button icon={<Edit size="35x" color="#74cf70"/>}/>
                                    </Link>
                                    <Button icon={<Trash size="35x" color="#f76f57"/>}
                                            onClick={() => {
                                                if (window.confirm("Удалить должность?"))
                                                    axios.post("http://localhost:3001/delete", {
                                                        id: pos.ID,
                                                        table: "POSITIONS"
                                                    })
                                                        .then(response => {
                                                            window.location.reload()
                                                        })
                                                        .catch(error => {
                                                            console.log("check login error", error);
                                                        });
                                            }
                                            }/>
                                </div>
                        }, pos))
                    })
                    dispatch(setArrays("position", positions))
                })
                .catch(error => {
                    console.log("check login error", error);
                });
        },
        fetchTypeEmployersBr() {
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
                                                if (window.confirm("Удалить выбранную запись?"))
                                                    axios.post("http://localhost:3001/delete", {
                                                        id: pos.ID,
                                                        table: "TYPE_EMPLOYERS"
                                                    })
                                                        .then(response => {
                                                            window.location.reload()
                                                        })
                                                        .catch(error => {
                                                            console.log("check type_employers error", error);
                                                        });
                                            }
                                            }/>
                                </div>
                        }, pos))
                    })
                    dispatch(setArrays("type_employers", type_emp))
                })
                .catch(error => {
                    console.log("check login error", error);
                });
        },
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

export default useRead
