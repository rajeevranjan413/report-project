import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios"


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


// [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function TodayReportTable({ data }) {
    const [reports, setAllReports] = useState([]);



    useEffect(() => {
        const getRespose = async () => {
            const { data } = await axios.get("http://localhost:8000/api/report/allReport", { withCredentials: true })
            console.log(data)
            setAllReports(data.data)
        }

        getRespose()


    })

    const rows = reports
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' >Area </TableCell>
                        <TableCell align="center">Topic</TableCell>
                        <TableCell align="center">Chemical Used</TableCell>
                        <TableCell align="center">Prepared Premise</TableCell>
                        <TableCell align="center">Water Tempature</TableCell>
                        <TableCell align="center">Job Rating</TableCell>
                        <TableCell align="center">ATP Result</TableCell>
                        <TableCell align="center">Comment</TableCell>
                        <TableCell align="center">Photos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell> */}
                            <TableCell align="center">{row.area}</TableCell>
                            <TableCell align="center">{row.topic}</TableCell>
                            <TableCell align="center">{row.chemical}</TableCell>
                            <TableCell align="center">{row.premise}</TableCell>
                            <TableCell align="center">{row.rating}</TableCell>
                            <TableCell align="center">{row.result}</TableCell>
                            <TableCell align="center">{row.comment}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}