import React from 'react'
import { useTable } from "react-table"

const TableHOC = (columns, data, containerClassname, heading) => {
    return function HOC() {
        const options = {
            columns,
            data
        }

        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(options)
        return (
            <div className={containerClassname}>
                <h2 className=''>{heading}</h2>

                <table className='' {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map((headerGroup) => {
                                <tr {...headerGroup.getHeaderGroupProps()}>

                                    {
                                        headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                            </th>
                                        ))
                                    }
                                </tr>
                            })
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            rows.map((row) => {
                                prepareRow(row)
                                return <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => (
                                            <td {...cell.getCellProps}>
                                                {cell.render("Cell")}
                                            </td>
                                        ))
                                    }
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default TableHOC
