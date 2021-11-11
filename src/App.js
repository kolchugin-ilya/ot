import React from "react";
import {Route, Switch} from "react-router-dom";
import styles from './App.module.css'
import Login from "./layout/Pages/Login/Login";
import Employers from "./layout/Pages/Employers/Employers";
import Navbar from "./layout/Navbar/Navbar";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import PageNotFound from "./layout/Pages/PageNotFound/PageNotFound";
import Position from "./layout/Pages/Position/Position";
import MyTable from "./components/MyTable/MyTable";
import {dataEmployers, dataPosition, headersDefault, headersEmployers} from "./data";
import {Button, Layer} from "grommet";
import {MyButton} from "./components/Button/MyButton";
import Modal from "./layout/Modal/Modal";

const App = () => {
    return (
            <div className={styles.container}>
                <Header/>
                <div className={styles.main}>
                    <Navbar/>
                    <div className={styles.data}>
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
                                <Modal/>
                                <MyTable
                                    headers={headersEmployers}
                                    data={dataEmployers}
                                />
                            </Route>
                            <Route exact path="/position">
                                <MyTable
                                    headers={headersDefault}
                                    data={dataPosition}
                                />
                            </Route>
                            <Route exact>
                                <PageNotFound/>
                            </Route>
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </div>
    );
};
export default App;
