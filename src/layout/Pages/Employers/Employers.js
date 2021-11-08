import React from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import {dataEmployers, headersEmployers} from "../../../data";

const Employers = () => {

    return (
            <MyTable
                headers={headersEmployers}
                data={dataEmployers}
            />
    );
};

export default Employers;
