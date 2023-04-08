import React, { Dispatch, SetStateAction } from "react"
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItemButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"
import { useStyles } from "./GigExecution.styles"
import { features } from "./GigExecutionFeatures"
import LaunchIcon from '@mui/icons-material/Launch'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import { useGigStore } from "../../store/useGigStore"
import { assignGigger, getGiggers, getUnAssignedGiggers } from "../../api"
import { unassignGigger } from "../../api"

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'id';
const DEFAULT_ROWS_PER_PAGE = 5;

export const GigExecution: React.FC = () => {
    const classes = useStyles()
    const loadData = useGigStore(state => state.loadData)
    const [keySelected, setKey] = React.useState(1)
    const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = React.useState<keyof Data>(DEFAULT_ORDER_BY);
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [currentGig, setGig] = React.useState<string>('')
    const [giggers, setGiggers] = React.useState<GiggerType[]>([])
    const [page, setPage] = React.useState(0);
    const visibleRows = useGigStore(state => state.gigs)
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = async (id: string) => {
        setOpen(true)
        setGig(id)
        const data = await getGiggers(id)
        setGiggers(data)
    };
    const handleClose = () => {
        setOpen(false);
        setGiggers([])
    };
    React.useEffect(() => {
        loadData()
    }, [giggers]);
    const removeGigger = (giggerId: string, gigId: string) => {
        unassignGigger(giggerId, gigId)
        setGiggers(giggers.filter(gigger => gigger.id != giggerId))
    }
    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = visibleRows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleRequestSort = React.useCallback(
        (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => {
            const isAsc = orderBy === newOrderBy && order === 'asc';
            const toggledOrder = isAsc ? 'desc' : 'asc';
            setOrder(toggledOrder);
            setOrderBy(newOrderBy);

            // const sortedRows = stableSort(visibleRows, getComparator(toggledOrder, newOrderBy));
            // const updatedRows = sortedRows.slice(
            //     page * rowsPerPage,
            //     page * rowsPerPage + rowsPerPage,
            // );
            // setVisibleRows(updatedRows);
        },
        [order, orderBy, page, rowsPerPage],
    );
    const isSelected = (id: string) => selected.indexOf(id) !== -1;
    return (
        <Box className={classes.root}>
            <Box className={classes.title}>Gig Execution Module</Box>
            <Box className={classes.description}>Allocate Gigs, Track Execution, Track Execution by Giggers</Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                {features.map(feature => (
                    <Feature
                        key={feature.key}
                        name={feature.name}
                        color={keySelected === feature.key ? 'white' : '#808080'}
                        Logo={<feature.logo fill={keySelected === feature.key ? 'white' : '#3344FF'} />}
                        idx={feature.key}
                        setKey={setKey}
                    />
                ))}
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box style={{ fontWeight: '300', fontSize: '22px' }}>Allocate Gigs To Giggers</Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Select displayEmpty
                        sx={{
                            width: 100,
                            height: 40,
                            fontSize: '12px',
                            borderColor: 'white',
                            color: '#808080',
                            bgcolor: 'white'
                        }}
                    >
                        <MenuItem>Company</MenuItem>
                    </Select>
                    <Select displayEmpty
                        sx={{
                            width: 100,
                            height: 40,
                            fontSize: '12px',
                            borderColor: 'white',
                            color: '#808080',
                            bgcolor: 'white'
                        }}
                    >
                        <MenuItem>Invoice ID</MenuItem>
                    </Select>
                </Box>
            </Box>
            <Box className={classes.unallocated}>1023 Unallocated Open Gigs in the system</Box>
            <Box style={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginBottom: 10 }}>
                <Button variant="contained">Auto Assign</Button>
                <Button variant="outlined" >Approve</Button>
            </Box>
            <Box style={{ display: 'flex', overflow: 'auto', background: 'white' }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={visibleRows.length}
                        />
                        <TableBody>
                            {visibleRows
                                ? visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="center">{row.type}</TableCell>
                                            <TableCell align="center">{`${row.present}/${row.total}`}</TableCell>
                                            <TableCell align="center">{row.location}</TableCell>
                                            <TableCell align="center">
                                                {row.giggers}
                                                <a onClick={() => handleClickOpen(row.id)}><LaunchIcon style={{ fontSize: '13px', color: 'blue' }} /></a>
                                            </TableCell>
                                            <TableCell align="center">{row.status}</TableCell>
                                        </TableRow>
                                    );
                                })
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    PaperProps={{
                        style: {
                            width: '466px',
                            height: '261px'
                        }
                    }}
                >
                    <BootstrapDialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                        isDisable={giggers.length >= 5}
                        setGiggers={setGiggers}
                        gigId={currentGig}
                    >
                        <Box style={{ fontSize: '14px', display: 'flex', justifyContent: 'center' }}>
                            {`Giggers Assigned to Gig ID ${currentGig}:-`}
                        </Box>
                        <Box sx={{ fontSize: '10px', display: 'flex', justifyContent: 'center' }}>
                            {`(Max 5 Giggers can be assigned)`}
                        </Box>
                    </BootstrapDialogTitle>
                    <DialogContent>
                        <Table
                            size={'small'}
                        >
                            <TableHead>
                                <TableRow style={{ color: '#808080' }}>
                                    <TableCell><b>Gigger ID</b></TableCell>
                                    <TableCell><b>Gigger Name</b></TableCell>
                                    <TableCell><b>Status</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                            {giggers.map(gigger => (
                                <TableRow>
                                    <TableCell>{gigger.id}</TableCell>
                                    <TableCell>{gigger.name}</TableCell>
                                    <TableCell>
                                        {gigger.status}
                                        <IconButton onClick={() => removeGigger(gigger.id, currentGig)}>
                                            <DeleteIcon style={{ fontSize: '13px', color: '#808080' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>
                    </DialogContent>
                    <DialogActions sx={{ alignSelf: 'center' }}>
                        <Button sx={{ bgcolor: '#3344FF', borderRadius: '10px', width: '100px' }} variant="contained" autoFocus onClick={handleClose}>
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}
interface DialogTitleProps {
    id: string
    children?: React.ReactNode
    onClose: () => void
    isDisable: boolean,
    setGiggers: Dispatch<SetStateAction<{ id: string; name: string; status: string; }[]>>
    gigId: string
}

interface GiggerType {
    id: string
    name: string
    status: string
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, isDisable, setGiggers, gigId, ...other } = props;
    const [open, setOpen] = React.useState(false);
    const [unassignedGiggers, setUnassignedGiggers] = React.useState<GiggerType[]>([])
    const handleClickOpen = async () => {
        setOpen(true);
        const giggers = await getUnAssignedGiggers()
        setUnassignedGiggers(giggers)
    };
    const handleClose = () => {
        setOpen(false);
        setUnassignedGiggers([])
    };
    const addGigger = (gigger: GiggerType) => {
        if(isDisable) return
        assignGigger(gigId, gigger.id)
        gigger.status = 'Assigned'
        setGiggers(prev => ([...prev, gigger]))
        setUnassignedGiggers(unassignedGiggers.filter(g => g.id != gigger.id))
    }

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            left: 8,
                            top: 8,
                            color: 'black',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Button
                        disabled={isDisable}
                        onClick={handleClickOpen}
                        sx={{
                            position: 'absolute',
                            right: 6,
                            top: 6,
                            bgcolor: '#3344FF',
                            borderRadius: '10px',
                            width: '80px'
                        }} variant="contained" autoFocus>
                        Add
                    </Button>
                    <Dialog open={open}
                        PaperProps={{
                            style: {
                                width: '150px',
                                height: '261px'
                            }
                        }}
                    >
                        <DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    left: 8,
                                    top: 8,
                                    color: 'black',
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <List sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                {unassignedGiggers.map(gigger => (
                                    <ListItemButton
                                        sx={{ textDecoration: 'underline' }}
                                        onClick={() => addGigger(gigger)}
                                    >
                                        {gigger.name.split(' ')[0]}
                                    </ListItemButton>
                                ))}
                            </List>
                        </DialogContent>
                    </Dialog>
                </>

            ) : null}
        </DialogTitle>
    );
}

type FeatureType = {
    Logo: React.ReactNode
    name: string
    color: string
    idx: number
    setKey: (key: number) => void
}
const Feature: React.FC<FeatureType> = ({ Logo, name, color, idx, setKey }) => {
    const classes = useStyles()
    return (
        <Box style={{ background: color === 'white' ? '#3344FF' : '' }} className={classes.card} onClick={() => setKey(idx)}>
            <Box className={classes.logo}>
                {Logo}
            </Box>
            <Box style={{ color: color }}>{name}</Box>
        </Box>
    )
}

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, newOrderBy: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (newOrderBy: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, newOrderBy);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}

                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface Data {
    id: string
    type: string
    present: number
    total: number
    attendance?: string
    location: string
    giggers: number
    status: string
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Gig ID',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Gig Type',
    },
    {
        id: 'attendance',
        numeric: false,
        disablePadding: false,
        label: 'Attendance',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'Location',
    },
    {
        id: 'giggers',
        numeric: true,
        disablePadding: false,
        label: 'Giggers Assigned',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
];