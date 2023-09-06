import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Dialog from "./Dialog";
import Chip from '@mui/material/Chip';

interface Column {
  id:
    | "no"
    | "date"
    | "material"
    | "party"
    | "rate"
    | "total"
    | "amount"
    | "paid";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "no", label: "No" },
  { id: "paid", label: "Paid" },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "material",
    label: "Material",
  },
  {
    id: "party",
    label: "Party",
  },
  {
    id: "rate",
    label: "Rate(1kg)",
  },
  {
    id: "total",
    label: "Total(kg)",
  },
  {
    id: "amount",
    label: "Amount",
  },
];

interface Data {
  no: number;
  date: string;
  material: string;
  party: string;
  rate: number;
  total: number;
  amount: number;
  paid: boolean;
}

function createData({
  no,
  material,
  party,
  rate,
  total,
  paid,
}: {
  no: number;
  material: string;
  party: string;
  rate: number;
  total: number;
  paid?: boolean;
}): Data {
  return {
    no,
    amount: rate * total,
    date: new Date().toLocaleDateString(),
    material,
    paid: !!paid,
    party,
    rate,
    total,
  };
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState<Data[]>([]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAdd = (data: any) => {
    setRows(rows.concat(rows, createData({ no: rows.length + 1, ...data })));
  };
  const getCell = (column: Column, value: any) => {
    if (column.label === "Paid") {
      return <Chip size="small" label={value ? 'yes' : 'no'} clickable color={value ? 'primary' : 'error'} />
    }
    return column.format && typeof value === "number"
      ? column.format(value)
      : (value as any);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ minHeight: 740 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {getCell(column, value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Dialog onSave={handleAdd} />
      </div>
    </Paper>
  );
}
