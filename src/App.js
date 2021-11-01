import React from "react";
import {Route, Switch} from "react-router-dom";
import styles from './App.module.css'
import Login from "./layout/Pages/Login/Login";
import Index from "./layout/Pages/Index/Index";

const App = () => {
    return (
            <div className={styles.app}>
                <Switch>
                    <Route exact path="/">
                        <Login/>
                    </Route>
                    <Route exact path="/ind">
                        <Index/>
                    </Route>
                </Switch>
            </div>
    );
};

export default App;
