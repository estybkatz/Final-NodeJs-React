import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const CostumerPrivtePage = () => {
  const [cardData, setCardData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [workersArr, setWorkersArr] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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
  useEffect(() => {
    axios
      .get("/auth/users")
      .then(({ data }) => {
        setWorkersArr(data);
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
  useEffect(() => {
    axios
      .get("cards/" + id)

      .then(({ data }) => {
        setCardData(data);
      })

      .catch((err) => {
        toast.error("Oops");
      });
  }, []);
  const columns = [
    "customer name",
    "task to do",
    "dateOpened",
    "last date to do",
    "worker to Do",
  ];

  if (!cardData) {
    return <CircularProgress />;
  }
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Box>
      <Card square raised>
        <CardHeader
          title={cardData.firstName}
          subheader={cardData.lastName}
        ></CardHeader>
        <CardContent>
          <hr />
          <Typography>{"Phone: " + cardData.phone}</Typography>
          <Typography>
            {"Address: " +
              " " +
              cardData.street +
              " " +
              cardData.houseNumber +
              " " +
              cardData.city +
              " " +
              cardData.country +
              " " +
              cardData.zip}
          </Typography>

          <Typography variant="body1" color="white">
            {"Email: " + cardData.email}
          </Typography>
          <Typography variant="body1" color="white">
            {"ReceptionDateAtTheOffice: " + cardData.ReceptionDateAtTheOffice}
          </Typography>

          <Typography variant="body1" color="white">
            {"BusinessDescription: " + cardData.BusinessDescription}
          </Typography>
          <hr />
          <h2>tasks for the costumer</h2>
          <Button onClick={goBack}>
            <ArrowBackIcon />
          </Button>
          <Box>
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
              {taskData ? (
                <TableBody key="taskBody">
                  {taskData.map((item) => (
                    <TableRow key={item._id + Date.now()}>
                      <TableCell key={item.customerID + item._id + Date.now()}>
                        {customers.map((item2) =>
                          item2._id === item.customerID
                            ? item2.firstName + " " + item2.lastName
                            : null
                        )}
                      </TableCell>
                      <TableCell key={"task" + item.task + Date.now()}>
                        {item.task}
                      </TableCell>
                      <TableCell
                        key={"date open" + item.dateOpened + Date.now()}
                      >
                        {item.dateOpened}
                      </TableCell>
                      <TableCell
                        key={"last date" + item.lastDateToDo + Date.now()}
                      >
                        {item.lastDateToDo}
                      </TableCell>
                      <TableCell key={"worker" + item.workerToDo + Date.now()}>
                        {workersArr
                          ? workersArr.map((item2) =>
                              item2._id === item.workerToDo
                                ? item2.name.firstName +
                                  " " +
                                  item2.name.lastName
                                : null
                            )
                          : ""}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                ""
              )}
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default CostumerPrivtePage;
