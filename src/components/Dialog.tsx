import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ onSave }: { onSave: (data:any) => void }) {
  const [open, setOpen] = React.useState(false);
  const [party, setParty] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [rate, setRate] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [paid, setPaid] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Item
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Item
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                onSave({
                    party,
                    material,
                    rate,
                    total,
                    paid
                });
                handleClose();
              }}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <TextField label="Party" margin="normal" variant="filled" fullWidth value={party} onChange={(e) => setParty(e.target.value)}/>
          <TextField
            label="Material"
            margin="normal"
            variant="filled"
            fullWidth
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          />
          <TextField
            label="Rate(1kg)"
            margin="normal"
            variant="filled"
            fullWidth
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
          />
          <TextField
            label="Total(1kg)"
            margin="normal"
            variant="filled"
            fullWidth
            value={total}
            onChange={(e) => setTotal(+e.target.value)}
          />
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Paid" value={paid} onChange={(_e, checked) => setPaid(checked)}/>
          </FormGroup>
        </Container>
      </Dialog>
    </div>
  );
}
