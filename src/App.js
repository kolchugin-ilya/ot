import React from "react";
import {Route, Switch} from "react-router-dom";
import styles from './App.module.css'
import Login from "./layout/Pages/Login/Login";

const App = () => {
    return (
            <div className={styles.app}>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                </Switch>
            </div>
    );
};

export default App;
