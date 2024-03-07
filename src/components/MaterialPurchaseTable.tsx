import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { v4 as uid } from "uuid";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { hello } from "../api";

const initialRows: GridRowsProp = [];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = {
      ...newRow,
      amount: newRow.rate * newRow.total,
      isNew: false,
    };
    setRows(
      rows.map((row) =>
        row.id === newRow.id
          ? updatedRow
          : { ...row, amount: row.rate * row.total }
      )
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "paid",
      headerName: "Paid",
      width: 80,
      type: "singleSelect",
      valueOptions: ["yes", "no"],
      disableColumnMenu: true,
      editable: true,
      renderCell: (params) => {
        return (
          <Chip
            label={params.value}
            color={params.value === "yes" ? "success" : "error"}
          />
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 100,
      editable: true,
      disableColumnMenu: true,
      valueGetter: (params) =>
        typeof params.value === "string"
          ? new Date(params.value)
          : params.value,
    },
    {
      field: "material",
      headerName: "Material",
      width: 220,
      editable: true,
      disableColumnMenu: true,
    },
    {
      field: "party",
      headerName: "Party",
      width: 220,
      editable: true,
      disableColumnMenu: true,
    },
    {
      field: "rate",
      headerName: "Rate(1kg)",
      width: 120,
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "total",
      headerName: "Total(kg)",
      width: 120,
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      type: "number",
      editable: false,
      align: "left",
      headerAlign: "left",
      disableColumnMenu: true,
    },
  ];

  React.useEffect(() => {
    hello().then((res) =>
      console.log(res.json().then((data) => console.log(data)))
    );
  }, []);

  return (
    <Box
      sx={{
        height: "95vh",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
