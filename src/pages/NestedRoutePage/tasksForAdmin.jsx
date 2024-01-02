import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import useQueryParams from "../../hooks/useQueryParams";
const RP1 = () => {
  const [originaltasksArr, setOriginaltasksArr] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [tasksArr, setTasksArr] = useState(null);
  let qparams = useQueryParams();
  useEffect(() => {
    axios
      .get("/auth/users")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {});
  }, []);
  useEffect(() => {
    axios
      .get("/cards/tasks")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
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
  const filterFunc = (data) => {
    if (!originaltasksArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originaltasksArr && data) {
      setOriginaltasksArr(data);
      setTasksArr(
        data.filter(
          (card) =>
            card.task.startsWith(filter) || card.workerToDo.startsWith(filter)
        )
      );
      return;
    }
    if (originaltasksArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originaltasksArr));
      setTasksArr(
        newOriginalCardsArr.filter(
          (card) =>
            card.task.startsWith(filter) || card.workerToDo.startsWith(filter)
        )
      );
    }
  };

  if (!tasksArr) {
    return <CircularProgress />;
  }
  const columns = [
    "customer name",
    "task to do",
    "dateOpened",
    "last date to do",
    "worker to Do",
  ];
  return (
    <Box>
      <h2>tasks in the office list</h2>
      <Grid item xs={12} sm={6} md={4}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <TableCell key={item + Date.now()}>
                  <Typography>{item}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {tasksArr.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  {customers.map((item2) =>
                    item2._id === item.customerID
                      ? item2.firstName + " " + item2.lastName
                      : null
                  )}
                </TableCell>
                <TableCell>{item.task}</TableCell>
                <TableCell>{item.dateOpened}</TableCell>
                <TableCell>{item.lastDateToDo}</TableCell>
                <TableCell>
                  {employees.map((item2) =>
                    item2._id === item.workerToDo
                      ? item2.name.firstName + " " + item2.name.lastName
                      : null
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Box>
  );
};

export default RP1;
