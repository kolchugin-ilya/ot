import React from 'react';
import styles from './Index.module.css'
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";

const Index = () => {
    return (
        <div className={styles.container}>
        <Header/>
            <div className={styles.main}>
                <Navbar/>
                <p>main part</p>
            </div>
            <Footer/>
        </div>
    );
};

export default Index;
