import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import useReadTypeEmployers from "../../../hooks/useReadTypeEmployers";
import styles from "../Styles.module.css";

const TypeEmployers = () => {
    const {fetchTypeEmployers} = useReadTypeEmployers()
    const {typeEmployers} = useSelector(state => state.dataReducer)
    useEffect(() =>{
        fetchTypeEmployers()
    }, [])
    return (
        <>
            <MyTable
                title={
                    <div className={styles.title}>
                        <p>Тип персонала</p>
                        <Link to="/type_employers/add">
                            <button>+ Добавить</button>
                        </Link>
                    </div>
                }
                data={typeEmployers}
                header={[
                    {title: '', field: 'icons'},
                    {title: `Тип персонала`, field: 'NAME'},
                ]}
            />
        </>
    );
};

export default TypeEmployers;

