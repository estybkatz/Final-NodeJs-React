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
import TableRowComponent from "../../components/TableRowComponent";
import TableRowsComponent from "../../components/TableRowsComponent";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import "./table.css";

const useStyles = styled((theme) => ({
  tableContainer: {
    maxWidth: "100%",
    overflowX: "auto",
  },
  tableCell: {
    fontSize: "0.8rem",
    whiteSpace: "nowrap", // נוסיף כאן
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem",
    },
  },
}));
const NestedPage1 = () => {
  const [originalWorkersArr, setOriginalWorkersArr] = useState(null);
  const navigate = useNavigate();
  const [workersArr, setWorkersArr] = useState(null);
  let qparams = useQueryParams();
  const classes = useStyles();
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/auth/users")
      .then(({ data }) => {
        console.log("data", data);
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
    console.log(filter);
    if (!originalWorkersArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalWorkersArr(data);
      setWorkersArr(
        data.filter((card) => card.name.firstName.startsWith(filter))
      );
      return;
    }
    if (originalWorkersArr) {
      /*
        when all loaded and states loaded
      */
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
  const columnsNotNone = [
    "Name",
    "last Name",
    "phone",
    "is Admin",
    "link to tasks",
  ];
  return (
    <Box>
      <h2>workers list</h2>
      {/* <Grid item xs={0.5} sm={4} md={12}> */}
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
              <TableBody>
                <TableRow
                  key={item._id + Date.now()}
                  className="tableCellNotNone"
                >
                  <TableCell
                    key={item.name.firstName + Date.now()}
                    // className="tableCell"
                  >
                    <Typography className="tableCellNotNone">
                      {item.name.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell
                    key={item.name.lastName + Date.now()}
                    // className="tableCell"
                  >
                    <Typography className="tableCellNotNone">
                      {item.name.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell
                    key={item.phone + Date.now()}
                    // className="tableCell"
                  >
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
                  <TableCell
                    key={item.isAdmin + Date.now()}
                    // className="tableCell"
                  >
                    <Typography className="tableCell">
                      {item.isAdmin ? "yes" : "no"}
                    </Typography>
                  </TableCell>
                  <TableCell key={item._id + Date.now()}>
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
          {/* </TableContainer> */}
        </Grid>
      </Grid>
    </Box>
  );
};
export default NestedPage1;
