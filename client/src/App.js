import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PatientList from "./components/PatientList";
import OrderListDialog from "./components/OrderListDialog";
import modeEnum from "../src/components/OrderListDialog/modeEnum";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function App() {
  const openId = useRef(0);
  const [isOpen, setIsOpen] = useState(false);
  const [patient, setPatient] = useState(null);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (!isOpen) {
      // Increment id each time modal closes, forcing OrderListDialog remount and clean states:
      // https://github.com/mui/material-ui/issues/16325#issuecomment-905876236
      openId.current = openId.current + 1;
    }
  }, [isOpen]);

  // 點擊patient item
  const handleListItemClick = (patient) => {
    setIsOpen(true);
    setPatient(patient);
    axios
      .get(`/patients/${patient.id}/orders`)
      .then((res) => res.data)
      .then((orders) => setOrders(orders));
  };

  const handleSubmit = async ({ mode, message, orderId }) => {
    let request = Promise.resolve();
    if (mode === modeEnum.ADD) {
      // 新增醫囑
      request = axios.post("/orders", { message, patientId: patient?.id });
    } else if (mode === modeEnum.EDIT) {
      // 修改醫囑
      request = axios.patch(`/orders/${orderId}`, { message });
    }

    // 取得最新的醫囑資料
    request.finally(() =>
      axios
        .get(`/patients/${patient?.id}/orders`)
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
        <Paper elevation={1} sx={{ pt: "16px" }}>
          <Typography
            variant="h1"
            align="center"
            sx={{ fontSize: "2rem", mb: "8px" }}
          >
            病患名單
          </Typography>
          <Divider variant="middle" />
          <PatientList onItemClick={handleListItemClick} />
          <OrderListDialog
            key={openId.current}
            orders={orders}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={handleSubmit}
            title={`醫囑列表 - ${patient?.name}`}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
