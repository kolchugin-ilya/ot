import React from 'react';
import {TableBody, TableCell, TableHeader, TableRow, Table} from "grommet";
import {Menu} from "grommet-icons";
import styles from './MyTable.module.css';

const headers = [
    'ФИО',
    'Дата рождения',
    'Должность',
    'Подразделение'
];
const employers = [
    'Фамилия Имя Отчество',
    '01.01.1998',
    'Младший инженер',
    'Кафедра'
];

const MyTable = () => {
    return (
        <Table className={styles.container}>
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
                    ['1','2','3','4','5','6','7','8','1','1','1','1','1','1','1','1','2','3','4','5','6','7','8','1','1','1','1','1','1','1'].map(len => {
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
    );
};

export default MyTable;