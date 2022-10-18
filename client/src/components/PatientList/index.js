import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FaceIcon from "@mui/icons-material/Face";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function PatientList({ onItemClick }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/patients")
      .then((res) => res.json())
      .then((patients) => {
        setPatients(patients);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <List>
        {loading && (
          <Box sx={{ width: "80%", margin: "auto" }}>
            <LinearProgress />
          </Box>
        )}
        {patients.map((patient) => (
          <ListItem key={patient?.id} disablePadding>
            <ListItemButton onClick={() => onItemClick(patient)}>
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText
                primary={patient?.name}
                secondary={`id: ${patient?.id}`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
