import { useState, useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import modeEnum from "./modeEnum";

const { VIEW, EDIT, ADD } = modeEnum;

export default function OrderListDialog(props) {
  const { onClose, onSubmit, isOpen, orders } = props;
  const [orderId, setOrderId] = useState(null);
  const [mode, setMode] = useState(VIEW);
  const [isTouched, setIsTouched] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const isValidationError = useMemo(
    () => orderMessage.length === 0,
    [orderMessage]
  );

  const buttonStyle = {
    position: "absolute",
    right: 12,
    top: 12,
  };

  const resetDialog = () => {
    setOrderMessage("");
    setMode(VIEW);
    setIsTouched(false);
  };

  // 取消新增
  const handleCancel = () => resetDialog();
  // 確定新增
  const handleSubmit = () => {
    onSubmit({ mode, orderId, message: orderMessage }).then(() =>
      resetDialog()
    );
  };
  const handleBlur = () => {
    if (!isTouched) {
      setIsTouched(true);
    }
  };

  const inputField = (
    <TextField
      autoFocus
      margin="dense"
      id="message"
      label="請輸入醫囑"
      fullWidth
      variant="standard"
      value={orderMessage}
      onChange={(e) => setOrderMessage(e?.target?.value)}
      onBlur={handleBlur}
      error={isTouched && isValidationError}
      helperText={isTouched && isValidationError && "不能為空白"}
    />
  );

  return (
    <Dialog onClose={onClose} open={isOpen} fullWidth={true}>
      <DialogTitle>
        醫囑列表
        {mode === VIEW && (
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            sx={buttonStyle}
            onClick={() => setMode(ADD)}
          >
            新增
          </Button>
        )}
      </DialogTitle>
      <DialogContent>
        <List sx={{ pt: 0 }}>
          {orders.map((order) => (
            <ListItem
              button
              key={order.id}
              secondaryAction={
                mode === VIEW && (
                  <IconButton
                    onClick={() => {
                      setMode(EDIT);
                      setOrderId(order.id);
                      setOrderMessage(order.message);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )
              }
            >
              {mode === EDIT && orderId === order.id ? (
                inputField
              ) : (
                <ListItemText primary={order.message} />
              )}
            </ListItem>
          ))}
          {mode === ADD && <ListItem>{inputField}</ListItem>}
        </List>
      </DialogContent>
      {mode !== VIEW && (
        <DialogActions>
          <Button onClick={handleCancel}>取消</Button>
          <Button onClick={handleSubmit} disabled={isValidationError}>
            確定
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
