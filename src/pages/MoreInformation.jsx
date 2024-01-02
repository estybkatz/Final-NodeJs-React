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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import InformationComponent from "../components/MoreinformationComponent";
import { toast } from "react-toastify";
const MoreInformationPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const [taskState, setTasksState] = useState([]);
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
        setTasksState(response.data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
      });
  }, []);
  useEffect(() => {
    axios
      .get("/auth/users")
      .then((response) => {
        setWorkers(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching employees:", error);
      });
  }, []);
  const columns = [
    "task to do",
    "dateOpened",
    "last date to do",
    "worker to Do",
  ];

  const handleCancelBtnClick = (ev) => {
    navigate(-1);
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
                      <TableRow key={item._id + Date.now()}>
                        <TableCell key={item.task + Date.now()}>
                          {item.task}
                        </TableCell>
                        <TableCell key={"open" + item.dateOpened + Date.now()}>
                          {item.dateOpened}
                        </TableCell>
                        <TableCell
                          key={"close" + item.lastDateToDo + Date.now()}
                        >
                          {item.lastDateToDo}
                        </TableCell>
                        <TableCell key={item.workerToDo + Date.now()}>
                          {workers.map((item2) =>
                            item2._id === item.workerToDo
                              ? item2.name.firstName + " " + item2.name.lastName
                              : null
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
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
