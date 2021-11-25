import React, {useEffect} from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import {dataEmployers, headersEmployers} from "../../../data";
import Modal from "../../Modal/Modal";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setEmployers} from "../../../store/actions/data-actions";

const Employers = () => {
    const { employers } = useSelector(state => state.dataReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.post("http://localhost:3001/read", {
            table: "EMPLOYERS"
        }, {withCredentials: true})
            .then(response => {
                    console.log(response.data.result)
                    dispatch(setEmployers(response.data.result))
            })
            .catch(error => {
                console.log("check login error", error);
            });
        console.log(employers)
    },[])

    return (
        <>
            <Modal/>
            <MyTable data={employers}
            />
        </>
    );
};

export default Employers;

