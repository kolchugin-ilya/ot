import React from 'react';
import {TableBody, TableCell, TableHeader, TableRow, Table} from "grommet";
import {Menu} from "grommet-icons";
import styles from './MyTable.module.css';

const headers = [
    'ФИО',
    'Дата рождения',
    'Должность',
    'Подразделение',
    'Подразделение',
    'Подразделение',
    'Подразделение',
    'Подразделение',
];
const employers = [
    'Фамилия Имя Отчество',
    '01.01.1998',
    'Младший инженер',
    'Кафедра',
    'Кафедра',
    'Кафедра',
    'Подразделение',
    'Подразделение',
];

const MyTable = () => {
    return (
        <div className={styles.container}>
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableCell scope="col" border="bottom">
                        </TableCell>
                        {
                            headers.map(val => {
                                return <TableCell scope="col" border="bottom">
                                    {
                                        val
                                    }
                                </TableCell>
                            })
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        ['1','2','3','4','5',
                            '1','2','3','4','5',
                            '1','2','3','4','5'].map(len => {
                            return <TableRow>
                                <TableCell scope="row">
                                    <Menu size="50x"/>
                                    <Menu size="50x"/>
                                </TableCell>
                                {
                                    employers.map(emp => {
                                        return <TableCell scope="row">
                                            {
                                                emp
                                            }
                                        </TableCell>
                                    })
                                }
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default MyTable;
