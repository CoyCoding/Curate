import React, { useEffect } from 'react';
//import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedToolbar from './EnhancedToolbar';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';

// Three basic Sorting functions for the table
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  cell:{
    lineBreak: 'anywhere',
    width: '50%',
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  },
  flex:{
    display: 'flex',
    justifyContent: 'flex-end',
  },
  edit:{
    marginRight: '4px'
  },
}));

function EnhancedTableBody(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("question");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const page = getSelectedPage(props.match.params.page);

  useEffect(() => {

  }, [props.faqs])

  function getSelectedPage(number){
    let pageNumber = parseInt(number);
    let maxPages = getMaxPages();
    if(pageNumber <= 0 || !pageNumber){
      pageNumber = 1;
    } else if(number > maxPages){
      pageNumber = getMaxPages();
    }
    return pageNumber -1;

    function getMaxPages(){
      return Math.ceil(props.faqs.length / rowsPerPage);
    }
  }

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  }

  function handleChangePage(event, newPage) {
    props.history.push(`/Dashboard/Page/${newPage+1}/`);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
    props.history.push(`/Dashboard/Page/1`)
  }

  const emptyRows = 0;

  function deleteQuestion(item){
      props.delete(item);
  }

  function editQuestion(question){
    props.history.push(`/Dashboard/Edit/${question.id}`)
  }

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedToolbar {...props} setModalOpen={props.toggleMenu}/>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.faqs.length}
            />
            <TableBody>
              {stableSort(props.faqs, getSorting(order, orderBy))
                .slice(page  * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell className={classes.cell} component="th">{row.question}</TableCell>
                      <TableCell className={classes.cell} align="left">{row.answer}</TableCell>
                      <TableCell  align="center">
                        <div className={classes.flex}>
                          <Button onClick={()=>{editQuestion(row)}} variant="outlined" color="primary" className={classes.edit}>EDIT</Button>
                          <Button onClick={()=>{deleteQuestion(row)}} variant="outlined" color="secondary"
                          className={classes.del}>DELETE</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.faqs.length}
          rowsPerPage={rowsPerPage}
          page={(page)}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

export default EnhancedTableBody;
