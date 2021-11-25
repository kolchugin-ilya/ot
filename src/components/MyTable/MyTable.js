import React, {useEffect} from 'react';
import MaterialTable from "material-table";
import {Close, Edit, Menu, Trash} from "grommet-icons";
import styles from './MyTable.module.css';
import {Button} from "grommet";
import {useDispatch, useSelector} from "react-redux";
import {setCloseButton} from "../../store/actions/modal-actions";
import Modal from "../../layout/Modal/Modal";

const MyTable = ({data}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCloseButton('close'))
    }, [dispatch])

    // const data = [];
    // for (let i = 1; i < 30; i++) {
    //     data.push({
    //         icons: <div className={styles.icons}>
    //             <Button icon={<Edit size="35x" color="#74cf70"/>}
    //                     onClick={() =>
    //                     {
    //                         dispatch(setCloseButton('show'))
    //                     }
    //                     }/>
    //             <Button icon={<Trash size="35x" color="#f76f57"/>}
    //                     onClick={() =>
    //                         alert("delete")}/>
    //         </div>,
    //         name: "ФИО" + i,
    //         bdate: "0" + i + ".0" + i + ".1998",
    //         position: "pos" + i,
    //         podr: "podr" + i
    //     })
    // }
    const header = [
        {title: '', field: 'ID'},
        {title: 'ФИО', field: 'LAST_NAME'},
        {title: 'Дата рождения', field: 'bdate', type: 'FIRST_NAME'},
        {title: 'Должность', field: 'position'},
        {title: 'Подразделение', field: 'podr'}
    ]
    // const payload = [{
    //     name: "ФИО",
    //     bday: "23123213",
    //     position: "1123123",
    //     podr: "podr"
    // }]
    return (
        <div style={{width: '100%'}}>
            <MaterialTable
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} из {count}',
                        labelRowsSelect: 'строк'
                    },
                    toolbar: {
                        searchTooltip: 'Поиск',
                        searchPlaceholder: 'Поиск'
                    },
                    header: {
                        actions: 'Actions'
                    },
                    body: {
                        emptyDataSourceMessage: 'Массив пустой',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
                columns={header}
                data={data}
                title="Список сотрудников"
            />
        </div>
    );
};

export default MyTable;
