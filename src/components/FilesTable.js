import React from "react";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import ActionButtons from "./ActionButtons";

const headerStyle = {
    overflow: "visible",
    whiteSpace: "normal",
    wordBreak: "break-all",
    textOverflow: "none"
}

export default function FilesTable({items, total, deleteF, currentPage, pageSize, setCurrentPageF}) {

    const actionsBtn = (fileName) => ActionButtons(fileName, deleteF);

    const onPageChange = (page, sizePerPage) => {
        setCurrentPageF(page);
    }

    const options = {
        page: currentPage,
        sizePerPage: pageSize,
        paginationSize: 3,
        paginationPosition: 'top',
        hideSizePerPage: true,
        onPageChange: onPageChange,
    };

    return (
        <BootstrapTable striped
                        bordered
                        hover
                        data={items}
                        pagination={true}
                        remote={true}
                        fetchInfo={{dataTotalSize: total}}
                        options={options}
        >
            <TableHeaderColumn tdStyle={headerStyle} dataField='originalFileName' isKey>File
                name</TableHeaderColumn>
            <TableHeaderColumn width='150' dataField='state'>State</TableHeaderColumn>
            <TableHeaderColumn tdStyle={headerStyle} width='150' dataField='errorCause'>Error
                cause</TableHeaderColumn>
            <TableHeaderColumn width='190' dataField='action' text='Action'
                               dataFormat={(cell, row, rowIndex, formatExtraData) => actionsBtn(row.originalFileName)}
            />
        </BootstrapTable>
    );
}