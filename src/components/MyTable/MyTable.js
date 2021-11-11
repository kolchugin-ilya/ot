import React from 'react';
import MaterialTable from "material-table";
import {Close, Edit, Menu, Trash} from "grommet-icons";
import styles from './MyTable.module.css';
import {Button} from "grommet";

const MyTable = (props) => {
    const data = [];
    for (let i = 1; i < 30; i++) {
        data.push({
            icons: <div className={styles.icons}>
                <Button icon={<Edit size="35x" color="#74cf70"/>}
                        onClick={() =>
                            alert("edit")}/>
                <Button icon={<Trash size="35x" color="#f76f57"/>}
                        onClick={() =>
                            alert("delete")}/>
            </div>,
            name: "ФИО" + i,
            bdate: "0" + i + ".0" + i + ".1998",
            position: "pos" + i,
            podr: "podr" + i
        })
    }
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
                columns={[
                    {title: '', field: 'icons'},
                    {title: 'ФИО', field: 'name'},
                    {title: 'Дата рождения', field: 'bdate', type: 'date'},
                    {title: 'Должность', field: 'position'},
                    {title: 'Подразделение', field: 'podr'},
                ]}
                data={data}
                title="Список сотрудников"
            />
        </div>
    );
};

export default MyTable;
