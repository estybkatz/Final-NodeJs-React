import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ROUTES from "../routes/ROUTES";

import { CircularProgress } from "@mui/material";

import InformationComponent from "../components/MoreinformationComponent";
import { toast } from "react-toastify";

const MoreInformationPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const [taskState, setTasksState] = useState([]);
  const [taskData, setTaskData] = useState(null);
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/cards/" + id);
        let newInputState = {
          ...data,
        };

        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;

        delete newInputState.__v;

        let dataArr = Object.keys(data);
        dataArr.forEach((item) => {
          if (dataArr[item] === "") {
            delete inputState[item];
          }
        });

        setInputState(newInputState);
      } catch {
        toast.error(
          "There was a problem retrieving the data, please try again later"
        );
      }
    })();
  }, [id]);
  useEffect(() => {
    axios
      .get("/cards/tasks/" + id)
      .then((response) => {
        console.log("data", response.data);
        //filterFunc(data);
        setTasksState(response.data);
        console.log("taskState", taskState);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
      });
  }, []);
  console.log("taskState", taskState);
  useEffect(() => {
    // בטעינת הדף, נבצע בקשת HTTP לשרת
    axios
      .get("/auth/users")
      .then((response) => {
        // קבלנו את רשימת העובדים מהשרת
        setWorkers(response.data);
        console.log("responseworkers", response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);
  const columns = [
    "task to do",
    "dateOpened",
    "last date to do",
    "worker to Do",
  ];

  const handleDoneChange = (id) => {
    const taskIndex = taskState.findIndex((task) => task._id === id);
    // If the task is found, update it
    if (taskIndex !== -1) {
      setTaskData((prevTaskData) => {
        // Create a shallow copy of the array
        const updatedTaskArray = [...prevTaskData];

        // Create a shallow copy of the task object
        const updatedTask = { ...updatedTaskArray[taskIndex] };

        // Update the 'done' property
        updatedTask.done = !updatedTask.done;

        // Update the task in the array
        updatedTaskArray[taskIndex] = updatedTask;

        console.log(updatedTaskArray);

        // Return the new array
        setTaskData(updatedTaskArray);
        return updatedTaskArray;
      });
    }
  };
  const handleCancelBtnClick = (ev) => {
    navigate(-1);
  };
  const handleSendData = async (id, item) => {
    try {
      console.log("taskData111", taskState);
      await axios.put("cards/tasks/toupdate/" + id, item);

      toast.success("The update task writed");
      // navigate(ROUTES.HOME);
    } catch {
      toast.error("update task was not done");
    }
  };
  if (!inputState) {
    return <CircularProgress />;
  }
  let keys = Object.keys(inputState);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ContactEmergencyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          More Information
        </Typography>
        {/* <Box
          component="img"
          sx={{
            height: 180,
            width: 250,
            maxHeight: { xs: 180, md: 167 },
            maxWidth: { xs: 250, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={
            inputState.url
              ? inputState.url
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
        /> */}
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {keys.map(
                (item) =>
                  inputState[item] && (
                    <InformationComponent
                      item={item}
                      inputState={inputState}
                      key={item + Date.now()}
                    />
                  )
              )}
            </Grid>
            {taskState.length !== 0 ? (
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
                  {taskState.map((item) => (
                    <TableBody key={item._id + "Body" + Date.now()}>
                      <TableRow>
                        {/* <TableCell key={item.customerID + Date.now()}>
                        {item.customerID}
                      </TableCell> */}
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
                          {workers.map((item2) =>
                            item2._id === item.workerToDo
                              ? item2.name.firstName + " " + item2.name.lastName
                              : null
                          )}
                        </TableCell>

                        {/* <TableCell key={item.done + Date.now()}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              key={item._id + Date.now}
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
                      <TableCell key={item._id + Date.now()}>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 1, mb: 1 }}
                          color="primary"
                          onClick={() => handleSendData(item._id, item)}
                          // href={ROUTES.HOME}
                        >
                          Updating
                        </Button>
                      </TableCell> */}
                      </TableRow>
                    </TableBody>
                    // </Grid>
                  ))}
                </Table>
              </Box>
            ) : (
              "Its no tasks to do"
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancelBtnClick}
              >
                Return Back
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default MoreInformationPage;
