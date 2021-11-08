import React from 'react';
import MyTable from "../../../components/MyTable/MyTable";
import {dataPosition, headersDefault} from "../../../data";

const Position = () => {

    return (
            <MyTable
                headers={headersDefault}
                data={dataPosition}
            />
    );
};

export default Position;
