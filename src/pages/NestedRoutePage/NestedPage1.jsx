import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import "./table.css";
const NestedPage1 = () => {
  const [originalWorkersArr, setOriginalWorkersArr] = useState(null);
  const navigate = useNavigate();
  const [workersArr, setWorkersArr] = useState(null);
  let qparams = useQueryParams();
  useEffect(() => {
    axios
      .get("/auth/users")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalWorkersArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalWorkersArr && data) {
      setOriginalWorkersArr(data);
      setWorkersArr(
        data.filter((card) => card.name.firstName.startsWith(filter))
      );
      return;
    }
    if (originalWorkersArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalWorkersArr));
      workersArr(
        newOriginalCardsArr.filter((card) =>
          card.name.firstName.startsWith(filter)
        )
      );
    }
  };
  if (!workersArr) {
    return <CircularProgress />;
  }
  const navigateToMoreInfoWorker = (id) => {
    navigate(`/worker/${id}`);
  };
  const columns = [
    "Name",
    "last Name",
    "phone",
    "email",
    "address",
    "is Admin",
    "link to tasks",
  ];
  return (
    <Box>
      <h2>workers list</h2>
      <Grid container className="tableContainer" spacing={2}>
        <Grid item xs={12}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((item) => (
                  <TableCell key={item + Date.now()}>
                    <Typography className="tableCell">{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {workersArr.map((item) => (
              <TableBody key={item._id}>
                <TableRow
                  key={item._id + Date.now()}
                  className="tableCellNotNone"
                >
                  <TableCell key={item.name.firstName + Date.now()}>
                    <Typography className="tableCellNotNone">
                      {item.name.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell key={item.name.lastName + Date.now()}>
                    <Typography className="tableCellNotNone">
                      {item.name.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell key={item.phone + Date.now()}>
                    <Typography className="tableCellNotNone">
                      {item.phone}
                    </Typography>
                  </TableCell>

                  <TableCell
                    key={item.email + Date.now()}
                    className="tableCell"
                  >
                    <Typography className="tableCell">{item.email}</Typography>
                  </TableCell>

                  <TableCell
                    key={
                      item.address.street +
                      item.address.houseNumber +
                      item.address.city +
                      Date.now()
                    }
                    className="tableCell"
                  >
                    <Typography className="tableCell">
                      {item.address.street +
                        "" +
                        item.address.houseNumber +
                        "" +
                        item.address.city}
                    </Typography>
                  </TableCell>
                  <TableCell key={item.isAdmin + Date.now()}>
                    <Typography className="tableCell">
                      {item.isAdmin ? "yes" : "no"}
                    </Typography>
                  </TableCell>
                  <TableCell key={"button" + item._id + Date.now()}>
                    <Button
                      onClick={() => navigateToMoreInfoWorker(item._id)}
                      className="tableCellNotNone"
                    >
                      link
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};
export default NestedPage1;
