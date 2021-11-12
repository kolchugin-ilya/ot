import React from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import {dataEmployers, headersEmployers} from "../../../data";
import Modal from "../../Modal/Modal";

const Employers = () => {

    return (
        <>
            <Modal/>
            <MyTable
                headers={headersEmployers}
                data={dataEmployers}
            />
        </>
    );
};

export default Employers;
