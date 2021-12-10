import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import styles from './Position.module.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import useReadPositions from "../../../hooks/useReadPositions";

const Position = () => {
    const {fetchPositions} = useReadPositions()
    const {position} = useSelector(state => state.dataReducer)
    useEffect(() =>{
        fetchPositions()
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
                    {title: `Должность`, field: 'NAME'},
                ]}
            />
        </>
    );
};

export default Position;

