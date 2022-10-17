import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PatientList from "./components/PatientList";
import OrderListDialog from "./components/OrderListDialog";
import modeEnum from "../src/components/OrderListDialog/modeEnum";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import "./App.css";

function App() {
  const openId = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!isOpen) {
      // Increment id each time modal closes, forcing OrderListDialog remount and clean states
      openId.current = openId.current + 1;
    }
  }, [isOpen]);

  // 點擊patient item
  const handleListItemClick = (item) => {
    setIsOpen(true);
    setPatientId(item.patientId);
    axios
      .get(`/patients/${item.patientId}/orders`)
      .then((res) => res.data)
      .then((orders) => setOrders(orders));
  };

  const handleSubmit = async ({ mode, message, orderId }) => {
    let request = Promise.resolve();
    if (mode === modeEnum.ADD) {
      // 新增醫囑
      request = axios.post("/orders", { message, patientId });
    } else if (mode === modeEnum.EDIT) {
      // 修改醫囑
      request = axios.patch(`/orders/${orderId}`, { message });
    }

    // 取得最新的醫囑資料
    request.finally(() =>
      axios
        .get(`/patients/${patientId}/orders`)
        .then((res) => res.data)
        .then((orders) => setOrders(orders))
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      minHeight={"100vh"}
      style={{ background: "linear-gradient(135deg, #7EE8FA, #EEC0C6)" }}
    >
      <Container maxWidth={"sm"}>
        <Typography
          variant="h1"
          align="center"
          sx={{ fontSize: "2rem", mb: "16px" }}
        >
          患者名單
        </Typography>
        <Paper elevation={1}>
          <PatientList onItemClick={handleListItemClick} />
          <OrderListDialog
            key={openId.current}
            orders={orders}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={handleSubmit}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
