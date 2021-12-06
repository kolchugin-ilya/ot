import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import styles from './Position.module.css';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import useRead from "../../../hooks/useRead";

const Position = () => {
    const {fetchPositionsBr} = useRead()
    const {position} = useSelector(state => state.dataReducer)
    useEffect(() => {
        fetchPositionsBr()
    }, [])
    return (
        <>
            <MyTable
                title={
                    <div className={styles.title}>
                        <p>Должности</p>
                        <Link to="/position/add">
                            <button>+ Добавить</button>
                        </Link>
                    </div>
                }
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

