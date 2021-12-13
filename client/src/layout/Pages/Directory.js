import React, {useEffect} from 'react';
import MyTable from "../../components/MyTable/MyTable";
import styles from "./Styles.module.css";
import {Link} from "react-router-dom";

const Directory = ({fetchMainArray, pTitle, linkPath, dataTable, headerTable}) => {
    useEffect(() => {
        fetchMainArray()
    }, [])
    return (
        <>
            <MyTable
                title={
                    <div className={styles.title}>
                        <p>{pTitle}</p>
                        <Link to={linkPath}>
                            <button>+ Добавить</button>
                        </Link>
                    </div>
                }
                data={dataTable}
                header={headerTable}
            />
        </>
    );
};

export default Directory;
