import React from "react";
import {Route, Switch} from "react-router-dom";
import styles from './App.module.css'
import Login from "./layout/Pages/Login/Login";
import Employers from "./layout/Pages/Employers/Employers";
import Navbar from "./layout/Navbar/Navbar";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import PageNotFound from "./layout/Pages/PageNotFound/PageNotFound";

const App = () => {
    return (
            <div className={styles.container}>
                <Header/>
                <div className={styles.main}>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <Route exact path="/">
                            <div className={styles.indexText}>
                                Главная страница
                            </div>
                        </Route>
                        <Route exact path="/employers">
                            <Employers/>
                        </Route>
                        <Route exact>
                            <PageNotFound/>
                        </Route>
                    </Switch>
                </div>
                <Footer/>
            </div>
    );
};

export default App;
