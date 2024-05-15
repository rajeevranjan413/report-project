import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


// const rows = []
// [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function UserTable() {
    const [users, setUsers] = useState([])
    let rows = [];

    useEffect(() => {
        const getRespose = async () => {
            const { data } = await axios.get("http://localhost:8000/api/user/employeeList", { withCredentials: true })
            console.log(data)
            setUsers(data)

        }

        getRespose()


    }, [])
    console.log(users)





    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center' >Name </TableCell>
                        <TableCell align='center' >Password </TableCell>
                        <TableCell align="center">Factory</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.topic}</TableCell>
                            {/* <TableCell align="center">{row.factory}</TableCell> */}
                            <TableCell align="center">{row.Address}</TableCell>
                            <TableCell align="center"><div className='flex  text-xl justify-center gap-4'><MdDelete /><FaEdit /></div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}