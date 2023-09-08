import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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

const initialRows: GridRowsProp = [
  {
    id: 1,
    no: 1,
    paid: "yes",
    date: new Date(),
    material: "Test",
    party: "Testparty",
    rate: 10,
    total: 100,
    amount: 1000,
  },
  {
    id: 2,
    no: 2,
    paid: "no",
    date: new Date(),
    material: "Test2",
    party: "Testparty2",
    rate: 102,
    total: 1002,
    amount: 10002,
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    setRows((oldRows) => {
      const id = oldRows.length + 1;
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "paid" },
      }));
      return [
        {
          id,
          no: id,
          paid: "no",
          date: new Date(),
          material: "",
          party: "",
          rate: 0,
          total: 0,
          amount: 0,
        },
      ...oldRows,
    ]});
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
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
      field: "no",
      headerName: "No",
      width: 100,
      type: "number",
      editable: false,
      align: "left",
      headerAlign: 'left',
      disableColumnMenu: true,
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
        return <Chip label={params.value} color={params.value === "yes" ? "success" : "error"}/>;
      },
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 100,
      editable: true,
      disableColumnMenu: true,
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
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
    },
    {
      field: "total",
      headerName: "Total(kg)",
      width: 120,
      type: "number",
      editable: true,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      type: "number",
      editable: false,
      align: 'left',
      headerAlign: 'left',
      disableColumnMenu: true,
    },
  ];

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
