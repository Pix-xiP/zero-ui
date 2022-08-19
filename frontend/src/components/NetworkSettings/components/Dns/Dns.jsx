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

  const [servers, setServer] = useState("");

  const handleDnsInput = (event) => {
    setDomain(event.target.value);
  };

  const handleServerInput = (event) => {
    setServer(event.target.value);
  };

  const addDnsServer = () => {
    let data = {};

    data["domain"] = domain;
    let trimmed = servers.trim();
    let splits = trimmed.split(",");
    data["servers"] = splits;

    handleChange("config", "dns", "custom", data)(null);

    setDomain("");
    setServer("");
  };

  const removeDnsServer = (index) => {
    let data = {};
    data["domain"] = "";
    data["servers"] = [];

    handleChange("config", "dns", "custom", data)(null);
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
      cell: (row) => (
          <div>
            {row["servers"]?.map((server, i) => (
              <div key={i}>{server}</div>
              ))}
          </div>
        )
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
          <Typography>Add DNS</Typography>
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
              value={servers}
              onChange={handleServerInput}
              placeholder={"1.1.1.1,8.8.8.8"}
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
