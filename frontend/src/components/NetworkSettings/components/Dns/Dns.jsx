import { useState } from "react";

import {
  Box,
  Divider,
  Grid,
  List,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import DataTable from "react-data-table-component";

function DNS({ dns, handleChange }) {
  const [domain, setDomain] = useState("");

  const [server, setServer] = useState("");

  const handleDnsInput = (event) => {
    setDomain(event.target.value);
  };

  const handleServerInput = (event) => {
    setServer(event.target.value);
  };

  const addDnsServer = () => {
    let data = {};
    data["domain"] = domain;
    
    data["server"] = [server];

    let newDns = [...dns];
    newDns.push(data);

    handleChange("config", "dns", "custom", data)(null);

    setDomain("");
    setServer("");
  };

  const removeDnsServer = (index) => {
    let newDns = [...dns];
    newDns.splice(index, 1);

    handleChange("config", "dns", "custom", newDns)(null);
  };

  const columns = [
    {
      id: "remove",
      width: "10px",
      cell: (_, index) => (
        <IconButton
          size="small"
          color="secondary"
          onClick={() => removeDnsServer(index)}
        >
          <DeleteOutlineIcon style={{ fontSize: 14 }} />
        </IconButton>
      ),
    },
    {
      id: "domain",
      name: "Domain",
      cell: (row) => row["domain"],
    },
    {
      id: "servers",
      name: "Servers",
      cell: (row) => (row["servers"] ? row["servers"] : "(LAN)"),
    },
  ];

  return (
    <>
      <Typography style={{ paddingBottom: "10px" }}>
        DNS Domain / Servers
      </Typography>
      <Box border={1} borderColor="grey.300">
        <Grid item style={{ margin: "10px" }}>
          <DataTable noHeader={true} columns={columns} data={[dns]} />
          <Divider />
          <Typography>Add DNS Server</Typography>
          <List
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TextField
              value={domain}
              onChange={handleDnsInput}
              placeholder={"Search Domain"}
            />
            <Divider
              orientation="vertical"
              style={{
                margin: "10px",
              }}
              flexItem
            />
            <TextField
              value={server}
              onChange={handleServerInput}
              placeholder={"Server Address"}
            />
            <IconButton size="small" color="primary" onClick={addDnsServer}>
              <AddIcon
                style={{
                  fontSize: 16,
                }}
              />
            </IconButton>
          </List>
        </Grid>
      </Box>
    </>
  );
}

export default DNS;
