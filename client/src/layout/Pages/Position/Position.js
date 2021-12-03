import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import styles from './Position.module.css';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Edit, Trash} from "grommet-icons";
import {Button} from "grommet";
import {Link} from "react-router-dom";
import {setArrays, setError} from "../../../store/actions/data-actions";

const Position = () => {
    const {position} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()
    const deletePosition = (id) => {
        axios.post("http://localhost:3001/delete", {
            id: id,
            table: "POSITIONS"
        })
            .then(response => {
                readPosition();
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }
    const readPosition = () => {
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
                                                deletePosition(pos.ID)
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
    }
    useEffect(() => {
        readPosition();
    }, [])
    return (
        <>
            <MyTable
                title={<div className={styles.title}>
                    <p>Должности</p>
                    <Link to="/position/add">
                        <button>+ Добавить</button>
                    </Link>
                </div>}
                data={position}
                header={[
                    {title: '', field: 'icons'},
                    {title: 'Должность', field: 'NAME'},
                ]}
            />
        </>
    );
};

export default Position;

