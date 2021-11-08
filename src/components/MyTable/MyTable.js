import React from 'react';
import MaterialTable from "material-table";
import {Edit, Trash} from "grommet-icons";
import styles from './MyTable.module.css';

const MyTable = (props) => {
    const data = [];
    for (let i = 1; i < 30; i++) {
        data.push({
            icons: <div className={styles.icons}>
                <Edit size="35x" color="#74cf70"/><Trash size="35x" color="#f76f57"/>
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
        // <Table className={styles.container}>
        //     <TableHeader>
        //         <TableRow>
        //             <TableCell scope="row">
        //             </TableCell>
        //             {
        //                 props.headers.map(val => {
        //                     return <TableCell scope="col" border>
        //                         {
        //                             val
        //                         }
        //                     </TableCell>
        //                 })
        //             }
        //         </TableRow>
        //     </TableHeader>
        //     <TableBody>
        //         {
        //             props.data.map(len => {
        //                 return <TableRow className={styles.tableRow}>
        //                     <TableCell scope="row" border>
        //                         <div className={styles.icons}>
        //                             <Edit size="35x"  color="#74cf70"/>
        //                             <Trash size="35x" color="#f76f57"/>
        //                         </div>
        //                     </TableCell>
        //                     {
        //                         len.map(emp => {
        //                             return <TableCell scope="row"  border="bottom" border>
        //                                 {
        //                                     emp
        //                                 }
        //                             </TableCell>
        //                         })
        //                     }
        //                 </TableRow>
        //             })
        //         }
        //     </TableBody>
        // </Table>
    );
};

export default MyTable;
