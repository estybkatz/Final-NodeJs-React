import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const WorkerPrivtePage = () => {
  const [workerData, setWorkerData] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("auth/users/" + id)

      .then(({ data }) => {
        setWorkerData(data);
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
      .get("auth/users/usercard/" + id)

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
    "status",
  ];
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
  const handleSendData = async (id, item) => {
    try {
      await axios.put("cards/tasks/toupdate/" + id, item);

      toast.success("The update task writed");
    } catch {
      toast.error("update task was not done");
    }
  };
  if (!workerData) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Card square raised>
        <CardHeader
          title={workerData.firstName}
          subheader={workerData.lastName}
        ></CardHeader>
        <CardContent>
          <hr />
          <Typography>{"Phone: " + workerData.phone}</Typography>
          <Typography>
            {"Address: " +
              workerData.address.street +
              " " +
              workerData.address.houseNumber +
              " " +
              workerData.address.city}
          </Typography>
          <Typography variant="body1" color="white">
            {"Email: " + workerData.email}
          </Typography>
          <hr />
          <h2>Tasks for the worker</h2>
          <Button onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </Button>
          <Box>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((item) => (
                    <TableCell key={item + "Row" + Date.now()}>
                      <Typography>{item}</Typography>
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
                    <TableCell key={item.task + Date.now()}>
                      {item.task}
                    </TableCell>
                    <TableCell key={"open" + item.dateOpened + Date.now()}>
                      {item.dateOpened}
                    </TableCell>
                    <TableCell key={"close" + item.lastDateToDo + Date.now()}>
                      {item.lastDateToDo}
                    </TableCell>
                    <TableCell key={item.done + Date.now()}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            key={"check" + Date.now}
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
                    <TableCell key={"update" + item._id + Date.now()}>
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
                </TableBody>
              ))}
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default WorkerPrivtePage;
