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
import Directory from './layout/Pages/Directories/Directory';
import {headerEmployers, headerFactors, headerFlg, headerJobType, headerPodr, headerPosition} from "./vars/headers";
import useReadDirectories from "./hooks/useReadDirectories";
import AddDirectory from "./layout/Pages/Directories/AddDirectory";
import {
    dataEmployersExport, dataFactorsExport, dataFlgExport,
    dataJobTypeExport,
    dataPodrExport,
    dataPositionExport,
    dataTypeEmployersExport
} from "./vars/data";
import EditDirectory from "./layout/Pages/Directories/EditDirectory";

const App = () => {
    const {employers, position, type_employers, job_type, podr, flg, factors} = useSelector(state => state.dataReducer)
    const state = useSelector(state => state.changeDataReducer)
    const {
        fetchEmployers,
        fetchPositions,
        fetchTypeEmployers,
        fetchJobType,
        fetchPodr,
        fetchFlg,
        fetchFactors
    } = useReadDirectories()

    const dataEmployers = dataEmployersExport(state, {position, podr, type_employers, job_type})
    const dataPosition = dataPositionExport(state)
    const dataTypeEmployers = dataTypeEmployersExport(state)
    const dataJobType = dataJobTypeExport(state)
    const dataPodr = dataPodrExport(state)
    const dataFlg = dataFlgExport(state)
    const dataFactors = dataFactorsExport(state)
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
                                <Route exact path="/employers/add">
                                    <AddDirectory
                                        data={dataEmployers}
                                        table="EMPLOYERS"
                                        title="Добавление сотрудника"
                                    />
                                </Route>
                                <Route exact path="/employers/edit">
                                    <EditDirectory
                                        data={dataEmployers}
                                        table="EMPLOYERS"
                                        title="Изменение сотрудника"
                                    />
                                </Route>
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
                                <Route exact path="/position/add">
                                    <AddDirectory
                                        data={dataPosition}
                                        table="POSITIONS"
                                        title="Добавление должности"
                                    />
                                </Route>
                                <Route exact path="/position/edit">
                                    <EditDirectory
                                        data={dataPosition}
                                        table="POSITIONS"
                                        title="Изменение должности"
                                    />
                                </Route>
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
                                <Route exact path="/type_employers/add">
                                    <AddDirectory
                                        data={dataTypeEmployers}
                                        table="TYPE_EMPLOYERS"
                                        title="Добавление типа персонала"
                                    />
                                </Route>
                                <Route exact path="/type_employers/edit">
                                    <EditDirectory
                                        data={dataTypeEmployers}
                                        table="TYPE_EMPLOYERS"
                                        title="Добавление типа персонала"
                                    />
                                </Route>
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
                                <Route exact path="/job_type/add">
                                    <AddDirectory
                                        data={dataJobType}
                                        table="JOB_TYPE"
                                        title="Добавление видов занятости"
                                    />
                                </Route>
                                <Route exact path="/job_type/edit">
                                    <EditDirectory
                                        data={dataJobType}
                                        table="JOB_TYPE"
                                        title="Добавление видов занятости"
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
                                <Route exact path="/podr/add">
                                    <AddDirectory
                                        data={dataPodr}
                                        table="PODR"
                                        title="Добавление подразделений"
                                    />
                                </Route>
                                <Route exact path="/podr/edit">
                                    <EditDirectory
                                        data={dataPodr}
                                        table="PODR"
                                        title="Добавление подразделений"
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
                                <Route exact path="/flg/add">
                                    <AddDirectory
                                        data={dataFlg}
                                        table="FLG"
                                        title="Добавление ФЛГ"
                                    />
                                </Route>
                                <Route exact path="/flg/edit">
                                    <EditDirectory
                                        data={dataFlg}
                                        table="FLG"
                                        title="Добавление ФЛГ"
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
                                <Route exact path="/factors/add">
                                    <AddDirectory
                                        data={dataFactors}
                                        table="FACTORS"
                                        title="Добавление вредных факторов"
                                    />
                                </Route>
                                <Route exact path="/factors/edit">
                                    <EditDirectory
                                        data={dataFactors}
                                        table="FACTORS"
                                        title="Добавление вредных факторов"
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
