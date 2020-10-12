import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";



const headRows = [
  { id: "question", numeric: false, disablePadding: false, label: "Question" },
  { id: "answer", numeric: false, disablePadding: false, label: "Answer" },
];

function EnhancedTableHead(props) {
  const {
    classes, order, orderBy, onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}

            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">
          Info
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
