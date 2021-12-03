import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import styles from './App.module.css'
import Employers from "./layout/Pages/Employers/Employers";
import Navbar from "./layout/Navbar/Navbar";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./layout/Pages/PageNotFound/PageNotFound";
import Position from "./layout/Pages/Position/Position";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setLoading, setSession} from "./store/actions/login-actions";
import Login from "./layout/Pages/Login/Login";
import AddEmployer from "./layout/Pages/Employers/AddEmployer";
import EditEmployer from "./layout/Pages/Employers/EditEmployer";
import AddPosition from "./layout/Pages/Position/AddPosition";
import EditPosition from "./layout/Pages/Position/EditPosition";


const App = () => {
    const {loading, userInfo} = useSelector(state => state.loginReducer)
    const dispatch = useDispatch()

    const isLogin = () => {
        axios.post("http://localhost:3001/isLogin", {}, {withCredentials: true})
            .then(response => {
                if (response.data.user) {
                    dispatch(setSession({name: response.data.user.name, role: response.data.user.role}))
                } else {
                    localStorage.clear();
                    dispatch(setSession({name: "", role: ""}))
                }
                dispatch(setLoading(false))
            })
            .catch(error => {
                localStorage.clear();
                dispatch(setSession({name: "", role: ""}))
                dispatch(setLoading(false))
                console.log("check login error", error);
            });
    }

    useEffect(() => {
        isLogin();
    }, []);

    const PrivateRoute = ({component: Component, props}) => {
        return <Route {...props}>
            {
                (userInfo.name)
                    ?
                    <Component userInfo={userInfo}/>
                    :
                    <Redirect to="/login"/>
            }
        </Route>
    }
    const d = () => {
        return <div>12312312321</div>
    }
    return (
        (loading)
            ?
            <Loading/>
            :
            (userInfo.name) ?
                <div className={styles.container}>
                    <Header/>
                    <div className={styles.main}>
                        <Navbar/>
                        <div className={styles.data}>
                            <Switch>
                                <Route exact path="/">
                                    main
                                </Route>
                                <Route exact path="/employers" component={Employers}/>
                                <Route exact path="/employers/add" component={AddEmployer}/>
                                <Route exact path="/employers/edit" component={EditEmployer}/>
                                <Route exact path="/position" component={Position} />
                                <Route exact path="/position/add" component={AddPosition}/>
                                <Route exact path="/position/edit" component={EditPosition}/>
                                <Route>
                                    <PageNotFound/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
                </div>
                :
                <div className={styles.container}>
                    <Switch>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                        <PrivateRoute exact component={PageNotFound}/>
                    </Switch>
                </div>
    );
};
export default App;
