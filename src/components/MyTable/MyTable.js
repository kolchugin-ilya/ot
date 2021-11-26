import React, {useEffect} from 'react';
import MaterialTable from "material-table";
import {useDispatch} from "react-redux";
import {setCloseButton} from "../../store/actions/modal-actions";

const localization = {
    pagination: {
        labelDisplayedRows: '{from}-{to} из {count}',
        labelRowsSelect: 'строк'
    },
    toolbar: {
        searchTooltip: 'Поиск',
        searchPlaceholder: 'Поиск'
    },
    header: {
        actions: 'Actions'
    },
    body: {
        emptyDataSourceMessage: 'Массив пустой',
        filterRow: {
            filterTooltip: 'Filter'
        }
    }
}

const MyTable = ({data, header, title}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCloseButton('close'))
    }, [dispatch])

    return (
        <div style={{width: '100%'}}>
            <MaterialTable
                localization={localization}
                columns={header}
                data={data}
                title={<div style={{display: "flex"}}><p>{title}</p><button>button</button></div>}
            />
        </div>
    );
};

export default MyTable;
