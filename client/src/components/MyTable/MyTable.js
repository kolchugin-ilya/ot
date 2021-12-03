import React from 'react';
import MaterialTable from "material-table";

const localization = {
    pagination: {
        labelDisplayedRows: '{from}-{to} из {count}',
        labelRowsSelect: 'записей'
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
    return (
        <div style={{width: '100%'}}>
            <span>{title}</span>
            <MaterialTable
                localization={localization}
                columns={header}
                data={data}
                title={""}
            />
        </div>
    );
};

export default MyTable;
