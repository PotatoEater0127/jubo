import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FaceIcon from "@mui/icons-material/Face";

export default function PatientList({ onItemClick }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("/patients")
      .then((res) => res.json())
      .then((patients) => setPatients(patients));
  }, []);

  return (
    <>
      <List>
        {patients.map((patient) => (
          <ListItem key={patient?.id} disablePadding>
            <ListItemButton
              onClick={() => onItemClick({ patientId: patient?.id })}
            >
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
