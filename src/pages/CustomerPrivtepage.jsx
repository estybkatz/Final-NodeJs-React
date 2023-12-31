import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
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
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [workersArr, setWorkersArr] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */

    axios
      .get("cards/tasks/" + id)

      .then(({ data }) => {
        console.log(data);
        //   filterFunc(data);
        setTaskData(data);
      })

      .catch((err) => {
        toast.error("Oops2");
      });
  }, []);
  console.log(taskData);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/auth/users")
      .then(({ data }) => {
        console.log("data", data);
        setWorkersArr(data);
        //filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
      });
  }, []);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */
    axios
      .get("/cards")
      .then((response) => {
        // קבלנו את רשימת העובדים מהשרת
        console.log("response.data!!!", response.data);
        setCustomers(response.data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data", err);
      });
  }, []);
  useEffect(() => {
    /*
      useEffect cant handle async ()=>{}
      this is why we use the old promise way
    */

    axios
      .get("cards/" + id)

      .then(({ data }) => {
        console.log(data);
        //   filterFunc(data);
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
          //   onClick={handleInfoBtnClick}
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
              {taskData.map((item) => (
                // <Grid item sm={6} xs={12} md={4} key={item._id + Date.now()}>
                <TableBody>
                  <TableRow key={item + Date.now()}>
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
                    <TableCell key={item.dateOpened + Date.now()}>
                      {item.dateOpened}
                    </TableCell>
                    <TableCell key={item.lastDateToDo + Date.now()}>
                      {item.lastDateToDo}
                    </TableCell>
                    <TableCell key={item.workerToDo + Date.now()}>
                      {workersArr.map((item2) =>
                        item2._id === item.workerToDo
                          ? item2.name.firstName + " " + item2.name.lastName
                          : null
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
                // </Grid>
              ))}
            </Table>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default CostumerPrivtePage;
