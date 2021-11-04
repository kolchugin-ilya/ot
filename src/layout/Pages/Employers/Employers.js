import React from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import styles from './Employers.module.css';

const Employers = () => {
    return (
        <div className={styles.container}>
            <MyTable/>
        </div>
    );
};

export default Employers;