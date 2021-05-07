import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { inject, observer } from "mobx-react";

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';

import MovieComposer from 'components/Pages/MovieComposer';

import FilterDialog from 'components/Dialogs/FilterDialog';
import StateIndicator from "components/indicators/StateIndicator.js";
import CancelButton from 'components/Buttons/CancelButton';
import PreviewDialogButton from "components/Buttons/PreviewDialogButton";

import { getTimingString } from "AgPlatformUtility.js";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { headCells, classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const _EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    const { onClick } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: false,
            })}
        >
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Movie Clip List
            </Typography>
            <Tooltip title="Filter list">
                <IconButton aria-label="filter list" onClick={onClick}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

const EnhancedTableToolbar = inject(({ manager }) => ({
    onClick: manager.openFilterDialog,
}))(observer(_EnhancedTableToolbar));


const useTableStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    toolbar: {
        backgroundColor: theme.palette.primary.light,
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const _ResultTable = (props) => {
    const classes = useTableStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const { strings, option_dict_dict, media_infos } = props;

    const headCells = [
        { id: 'quality', align: "left", label: strings.quality },
        { id: 'fps', align: "right", label: strings.fps },
        { id: 'actor', align: "left", label: strings.actor },
        { id: 'voice', align: "left", label: strings.voice },
        { id: 'script', align: "left", label: strings.script },
        { id: 'speech_speed', align: "right", label: strings.speech_speed },
        { id: 'motion', align: "left", label: strings.motion },
        { id: 'motion_speed', align: "right", label: strings.motion_speed },
        { id: 'motion_timing', align: "left", label: strings.motion_timing },
        { id: 'emotion', align: "left", label: strings.emotion },
        { id: 'emotion_timing', align: "left", label: strings.emotion_timing },
        { id: 'progress', align: "center", label: strings.progress },
        { id: 'request', align: "center", label: strings.request },
    ];

    let no_result = false;

    function createData(media_info) {
        const id = media_info.id;

        if (!id) {
            no_result = true;
            return { id };
        }
        const quality = option_dict_dict.quality[media_info.spec.quality];
        const fps = media_info.spec.fps;
        const actor = option_dict_dict.actor[media_info.spec.actor];
        const voice = option_dict_dict.voice[media_info.spec.voice];
        const script = media_info.spec.script;
        const speech_speed = media_info.spec.speech_speed;
        const motion = option_dict_dict.motion[media_info.spec.motion];
        const motion_speed = media_info.spec.speech_speed;
        const motion_timing = getTimingString(media_info.spec.script, media_info.spec.motion_timing);
        const emotion = option_dict_dict.emotion[media_info.spec.emotion];
        const emotion_timing = getTimingString(media_info.spec.script, media_info.spec.emotion_timing);
        const progress = (<StateIndicator progress={media_info.progress} />);
        const request = (media_info.progress.task_state === "SUCCESS" ? <PreviewDialogButton id={media_info.id} /> : <CancelButton task_id={media_info.progress.task_id} />);
        return { id, quality, fps, actor, voice, script, speech_speed, motion, motion_speed, motion_timing, emotion, emotion_timing, progress, request };
    }

    const rows = media_infos.map((m) => {
        return createData(m);
    });

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage) + no_result ? 1 : 0;

    const getTableCells = (row) => {
        const cells = headCells.map(cell => {
            return (
                <TableCell align={cell.align}>
                    {row[cell.id]}
                </TableCell>
            );
        });
        return (
            <>
                {cells}
            </>
        );
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    if (!row.id) {
                                        return null;
                                    }
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            {getTableCells(row)}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={headCells.length} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}

const ResultTable = inject(({ app_store, manager }) => ({
    strings: app_store.strings,
    option_dict_dict: app_store.options,
    media_infos: manager.array_of_media_info,
}))(observer(_ResultTable));

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    toolbar: {
        backgroundColor: theme.palette.primary.light,
    },
    content: {
        display: 'flex',
    },
    left: {
        width: '70%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: theme.spacing(1),
    },
    right: {
        width: '30%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: theme.spacing(1),
    },
}));

const MovieManager = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.toolbar}>
                <Toolbar variant='dense'>
                    Movie Manager
                </Toolbar>
            </div>
            <div className={classes.content}>
                <div className={classes.left}>
                    <ResultTable />
                    <FilterDialog />
                </div>
                <div className={classes.right}>
                    <MovieComposer />
                </div>
            </div>
        </div>
    );
}

export default MovieManager;