import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CostumerPrivtePage = () => {
  const [costumerData, setCostumerData] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("auth/users/" + id)
      .then(({ data }) => {
        setCostumerData(data);
      })
      .catch((err) => {
        toast.error("Oops");
      });
  }, []);
  useEffect(() => {
    axios
      .get("/cards")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data", err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("cards/tasks/" + id)
      .then(({ data }) => {
        setTaskData(data);
      })
      .catch((err) => {
        toast.error("Oops2");
      });
  }, []);
  const columns = [
    "customer name",
    "task to do",
    "dateOpened",
    "last date to do",
    "worker to Do",
  ];
  if (!costumerData) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Card square raised>
        <CardHeader
          title={costumerData.firstName}
          subheader={costumerData.lastName}
        ></CardHeader>
        <CardContent>
          <hr />
          <Typography>{"Phone: " + costumerData.phone}</Typography>
          <Typography>{"Address: " + costumerData.address}</Typography>
          <Typography>{"Card Number: " + costumerData.cardNumber}</Typography>
          <Typography variant="body1" color="white">
            {"Email: " + costumerData.email}
          </Typography>

          <hr />
          <h2>tasks for the costumer</h2>
          <Button>
            <ArrowBackIcon />
          </Button>
          <Box>
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
                  {taskData.map((item) => (
                    <TableBody key={item._id}>
                      <TableRow>
                        <TableCell key={item.customerID + Date.now()}>
                          {customers.map((item2) =>
                            item2._id === item.customerID
                              ? item2.firstName + " " + item2.lastName
                              : null
                          )}
                        </TableCell>
                        {/* <Grid item sm={4} xs={12} md={6}> */}
                        <TableCell
                          key={item.task + Date.now()}
                          className="nowraps"
                        >
                          {item.task}
                        </TableCell>
                        {/* </Grid> */}
                        <TableCell key={"open" + item.dateOpened + Date.now()}>
                          {item.dateOpened}
                        </TableCell>
                        <TableCell
                          key={"close" + item.lastDateToDo + Date.now()}
                        >
                          {item.lastDateToDo}
                        </TableCell>
                        <TableCell key={item.workerToDo + Date.now()}>
                          {item.workerToDo}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default CostumerPrivtePage;
