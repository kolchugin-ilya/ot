import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import styles from './Position.module.css';
import {Link} from "react-router-dom";

const Position = ({data, header, title, link, fetchBr}) => {
    useEffect(() => {
        fetchBr()
    }, [])
    return (
        <>
            <MyTable
                title={
                    <div className={styles.title}>
                        <p>{title}</p>
                        <Link to={link}>
                            <button>+ Добавить</button>
                        </Link>
                    </div>
                }
                data={data}
                header={[
                    {title: '', field: 'icons'},
                    {title: `${header}`, field: 'NAME'},
                ]}
            />
        </>
    );
};

export default Position;

