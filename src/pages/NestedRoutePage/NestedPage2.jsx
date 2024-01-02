import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";
import {
  Box,
  Grid,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./table.css";
const NestedPage2 = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data", err);
      });
  }, []);
  const columns = [
    "First Name",
    "Last Name",
    "Phone",
    "Email",
    "Address",
    "club - member",
    "link - to - card",
  ];
  const navigateToMoreInfoCostumer = (id) => {
    navigate(`/costumer/${id}`);
  };
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      setOriginalCardsArr(data);
      setCardsArr(
        data.filter(
          (card) =>
            card.firstName.startsWith(filter) || card.email.startsWith(filter)
        )
      );
      return;
    }
    if (originalCardsArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter(
          (card) =>
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
        )
      );
    }
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <h2>costumers list</h2>
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
            <TableBody>
              {cardsArr.map((item) => (
                <TableRow
                  key={item._id + Date.now()}
                  className="tableCellNotNone"
                >
                  <TableCell key={item.firstName + Date.now()}>
                    <Typography className="tableCellNotNone">
                      {item.firstName}
                    </Typography>
                  </TableCell>

                  <TableCell key={item.lastName + Date.now()}>
                    <Typography className="tableCellNotNone">
                      {item.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell key={item.phone + Date.now()}>
                    {item.phone}
                  </TableCell>
                  <TableCell key={item.email + Date.now()}>
                    <Typography className="tableCell"> {item.email}</Typography>
                  </TableCell>
                  <TableCell
                    key={
                      item.street + item.houseNumber + item.city + Date.now()
                    }
                    className="tableCell"
                  >
                    <Typography className="tableCell">
                      {item.street + "" + item.houseNumber + "" + item.city}
                    </Typography>
                  </TableCell>
                  <TableCell
                    key={item.isAdmin + Date.now()}
                    className="tableCell"
                  >
                    <Typography className="tableCell">
                      {item.isAdmin ? "yes" : "no"}
                    </Typography>
                  </TableCell>
                  <TableCell key={item._id + Date.now()}>
                    <Button
                      onClick={() => navigateToMoreInfoCostumer(item._id)}
                    >
                      link
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};
export default NestedPage2;
