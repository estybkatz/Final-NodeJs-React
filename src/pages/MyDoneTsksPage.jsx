import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Card, Typography, Box } from "@mui/material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ROUTES from "../routes/ROUTES";
const MyDoneTasksPage = () => {
  const [taskData, setTaskData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

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
      .get("cards/tasks/getmydonetasks/" + payload._id)

      .then(({ data }) => {
        setTaskData(data);
      })

      .catch((err) => {
        toast.error("Oops2");
      });
  }, []);

  const columns = [
    "customer name",
    "task",
    "dateOpened",
    "last date to do",
    "status",
  ];

  if (!taskData) {
    return <CircularProgress />;
  }
  const handleSendData = async (id, item) => {
    try {
      await axios.put("cards/tasks/toupdate/" + id, item);

      toast.success("The update task writed");
    } catch {
      toast.error("update task was not done");
    }
  };
  const handleDoneChange = (id) => {
    const taskIndex = taskData.findIndex((task) => task._id === id);
    if (taskIndex !== -1) {
      setTaskData((prevTaskData) => {
        const updatedTaskArray = [...prevTaskData];
        const updatedTask = { ...updatedTaskArray[taskIndex] };
        updatedTask.done = !updatedTask.done;
        updatedTaskArray[taskIndex] = updatedTask;
        setTaskData(updatedTaskArray);
        return updatedTaskArray;
      });
    }
  };
  const getDoneList = () => {
    navigate(ROUTES.MYTASKS);
  };
  return (
    <Box>
      <Card square raised>
        <h2>My Finished Tasks</h2>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Button onClick={getDoneList}>Unfinished Task List</Button>
        <Box>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="headRow">
                {columns.map((item) => (
                  <TableCell key={item + Date.now()}>
                    <Typography className="tableCell">{item}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {taskData.map((item) => (
                <TableRow key={item._id + Date.now()}>
                  <TableCell key={item.customerID + Date.now()}>
                    {customers.map((item2) =>
                      item2._id === item.customerID
                        ? item2.firstName + " " + item2.lastName
                        : null
                    )}
                  </TableCell>
                  <TableCell key={"task" + item.task + Date.now()}>
                    {item.task}
                  </TableCell>
                  <TableCell key={"date open" + item.dateOpened + Date.now()}>
                    <Typography className="tableCell">
                      {item.dateOpened}
                    </Typography>
                  </TableCell>
                  <TableCell
                    key={"date close" + item.lastDateToDo + Date.now()}
                  >
                    <Typography className="tableCell">
                      {item.lastDateToDo}
                    </Typography>
                  </TableCell>
                  <TableCell key={"done" + item.done + Date.now()}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          key={Date.now}
                          id="done"
                          value={item.done}
                          checked={item.done}
                          color="primary"
                          onClick={() => handleDoneChange(item._id)}
                        />
                      }
                      label="done"
                    />
                  </TableCell>
                  <TableCell key={"id" + item._id + Date.now()}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 1, mb: 1 }}
                      color="primary"
                      onClick={() => handleSendData(item._id, item)}
                    >
                      Updating
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
};
export default MyDoneTasksPage;
