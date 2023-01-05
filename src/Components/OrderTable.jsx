import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const OrderTable = ({orders}) => {
  return (
    <>
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 2500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center' style={{ fontWeight: 600 }}> Category </TableCell>
                  <TableCell align="center" style={{ fontWeight: 600 }}>
                    {" "}
                    Flavour{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {order.category}
                    </TableCell>
                    <TableCell align="center">{order.flavour}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </>
  )
}

export default OrderTable