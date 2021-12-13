import React, {useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import styles from './App.module.css'
import Navbar from "./layout/Navbar/Navbar";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./layout/Pages/PageNotFound/PageNotFound";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setLoading, setSession} from "./store/actions/login-actions";
import Login from "./layout/Pages/Login/Login";
import AddEmployer from "./layout/Pages/Employers/AddEmployer";
import EditEmployer from "./layout/Pages/Employers/EditEmployer";
import AddPosition from "./layout/Pages/Position/AddPosition";
import EditPosition from "./layout/Pages/Position/EditPosition";
import AddTypeEmployers from "./layout/Pages/TypeEmployers/AddTypeEmployers";
import Directory from './layout/Pages/Directory';
import {headerEmployers, headerFactors, headerFlg, headerJobType, headerPodr, headerPosition} from "./layout/headers";
import useReadDirectories from "./hooks/useReadDirectories";

const App = () => {
    const {employers,position,type_employers,job_type,podr,flg,factors} = useSelector(state => state.dataReducer)
    const {fetchEmployers,fetchPositions,fetchTypeEmployers,fetchJobType,fetchPodr,fetchFlg,fetchFactors} = useReadDirectories()
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
        isLogin()
        fetchEmployers()
        fetchPositions()
        fetchTypeEmployers()
        fetchJobType()
        fetchFlg()
        fetchFactors()
        fetchPodr()
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
                                {/* Список сотрудников  */}
                                <Route exact path="/employers">
                                    <Directory
                                        fetchMainArray={fetchEmployers}
                                        pTitle="Список сотрудников"
                                        linkPath="/employers/add"
                                        dataTable={employers}
                                        headerTable={headerEmployers}
                                    />
                                </Route>
                                <Route exact path="/employers/add" component={AddEmployer}/>
                                <Route exact path="/employers/edit" component={EditEmployer}/>
                                {/*Должность*/}
                                <Route exact path="/position">
                                    <Directory
                                        fetchMainArray={fetchPositions}
                                        pTitle="Список должностей"
                                        linkPath="/position/add"
                                        dataTable={position}
                                        headerTable={headerPosition}
                                    />
                                </Route>
                                <Route exact path="/position/add" component={AddPosition}/>
                                <Route exact path="/position/edit" component={EditPosition}/>
                                {/*Тип персонала*/}
                                <Route exact path="/type_employers">
                                    <Directory
                                        fetchMainArray={fetchTypeEmployers}
                                        pTitle="Список типов персонала"
                                        linkPath="/type_employers/add"
                                        dataTable={type_employers}
                                        headerTable={headerPosition}
                                    />
                                </Route>
                                <Route exact path="/type_employers/add" component={AddTypeEmployers}/>
                                <Route exact path="/type_employers/edit" component={EditPosition}/>
                                {/*Вид занятости*/}
                                <Route exact path="/job_type">
                                    <Directory
                                        fetchMainArray={fetchJobType}
                                        pTitle="Список видов занятости"
                                        linkPath="/job_type/add"
                                        dataTable={job_type}
                                        headerTable={headerJobType}
                                    />
                                </Route>
                                {/*Подразделения*/}
                                <Route exact path="/podr">
                                    <Directory
                                        fetchMainArray={fetchPodr}
                                        pTitle="Список подразделений"
                                        linkPath="/podr/add"
                                        dataTable={podr}
                                        headerTable={headerPodr}
                                    />
                                </Route>
                                {/*ФЛГ*/}
                                <Route exact path="/flg">
                                    <Directory
                                        fetchMainArray={fetchFlg}
                                        pTitle="Список ФЛГ"
                                        linkPath="/flg/add"
                                        dataTable={flg}
                                        headerTable={headerFlg}
                                    />
                                </Route>
                                {/*Вредные факторы*/}
                                <Route exact path="/factors">
                                    <Directory
                                        fetchMainArray={fetchFactors}
                                        pTitle="Список вредных факторов"
                                        linkPath="/factors/add"
                                        dataTable={factors}
                                        headerTable={headerFactors}
                                    />
                                </Route>
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
