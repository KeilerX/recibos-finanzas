import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom"
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import LoadingScreen from '../layout/loading_screen/LoadingScreen'
import VisibilityIcon from '@material-ui/icons/Visibility';

const useStyles = makeStyles({
    root: {
        width: '98%',
        margin: 'auto',
    },
    subTable: {
        width: '95%',
        margin: 'auto',
        marginTop: 20,
        marginBottom: 50,
    },
    container: {
        minHeight: 440,
        maxHeight: 440,
    },
    icon: {
        cursor: 'pointer',
    },
})

const TableCustom = (props) => {
    const classes = useStyles()
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const history = useHistory()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    const viewWallet = (key) => {
        console.log(Object.keys(props.data)[key])
        history.push(`/wallet/${Object.keys(props.data)[key]}`)
        
    }

    return (
        <Paper className={props.style ? classes[props.style] : classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows ? props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, key) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                                    {props.columns.map((column) => {
                                        const value = row[column.id].value;
                                        return (
                                            value === 'link' ?
                                            <TableCell key={column.id} align={column.align}>
                                                <VisibilityIcon onClick={() => viewWallet(key)} className={classes.icon}/>
                                            </TableCell> :
                                            <TableCell key={column.id} align={column.align}>
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        }) : <LoadingScreen />}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TableCustom