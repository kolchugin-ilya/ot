import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import Modal from "../../Modal/Modal";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setEmployers} from "../../../store/actions/data-actions";
import {Edit, Trash} from "grommet-icons";
import {Button} from "grommet";

const Employers = () => {
    const {employers} = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()

    const readData = () => {
        axios.post("http://localhost:3001/read", {
            table: "EMPLOYERS",
            columns: "ID, LAST_NAME, FIRST_NAME, OTC, BIRTHDAY, POSITION, PODR_ID"
        }, {withCredentials: true})
            .then(response => {
                let employers = [];
                response.data.result.map(emp => {
                    employers.push(Object.assign({
                        icons:
                            <div style={{display: "flex"}}>
                                <Button icon={<Edit size="35x" color="#74cf70"/>}
                                        onClick={() =>
                                            alert("edit" + emp.ID)}/>
                                <Button icon={<Trash size="35x" color="#f76f57"/>}
                                        onClick={() =>
                                            alert("delete")}/>
                            </div>
                    }, emp))
                })
                dispatch(setEmployers(employers))
            })
            .catch(error => {
                console.log("check login error", error);
            });
    }

    const header = [
        {title: '', field: 'icons'},
        {title: 'Фамилия', field: 'LAST_NAME'},
        {title: 'Имя', field: 'LAST_NAME'},
        {title: 'Отчество', field: 'OTC'},
        {title: 'Дата рождения', field: 'BIRTHDAY', type: 'date'},
        {title: 'Должность', field: 'POSITION'},
        {title: 'Подразделение', field: 'PODR_ID'}
    ]

    useEffect(() => {
        readData();
    }, [])

    return (
        <>
            <Modal/>
            <MyTable
                title='Список сотрудников'
                data={employers}
                header={header}
            />
        </>
    );
};

export default Employers;

