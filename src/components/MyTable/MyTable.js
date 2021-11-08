import React from 'react';
import {TableBody, TableCell, TableHeader, TableRow, Table} from "grommet";
import {Edit, Trash} from "grommet-icons";
import styles from './MyTable.module.css';

const MyTable = (props) => {
    return (
            <Table className={styles.container}>
                <TableHeader>
                    <TableRow>
                        <TableCell scope="row">
                        </TableCell>
                        {
                            props.headers.map(val => {
                                return <TableCell scope="col" border>
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
                        props.data.map(len => {
                            return <TableRow className={styles.tableRow}>
                                <TableCell scope="row" border>
                                    <div className={styles.icons}>
                                        <Edit size="35x"  color="#74cf70"/>
                                        <Trash size="35x" color="#f76f57"/>
                                    </div>
                                </TableCell>
                                {
                                    len.map(emp => {
                                        return <TableCell scope="row"  border="bottom" border>
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
