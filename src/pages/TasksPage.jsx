import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validateTaskSchema from "../validation/taskValidation";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import TaskComponent from "../components/TaskComponennt";

import { FormControl, MenuItem, Select } from "@mui/material";
const TasksPage = () => {
  const { id } = useParams();

  const labels = ["task", "dateOpened", "lastDateToDo"];
  const [inputState, setInputState] = useState({
    task: "",
    workerToDo: "",
    dateOpened: "",
    lastDateToDo: "",
    done: false,
  });
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  useEffect(() => {
    axios
      .get("/auth/users")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {});
  }, []);
  const handleEmployeeChange = (ev) => {
    setSelectedEmployeeId(ev.target.value);

    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState["workerToDo"] = ev.target.value;
    setInputState(newInputState);
    joiResponse = validateTaskSchema(newInputState);
    setinputsErrorState(joiResponse);
  };
  let joiResponse = validateTaskSchema(inputState);
  const [inputsErrorState, setinputsErrorState] = useState(null);
  const navigate = useNavigate();
  const handeleBtnClick = async () => {
    try {
      joiResponse = validateTaskSchema(inputState);
      if (joiResponse) {
        return;
      }
      await axios.post("cards/tasks/" + id, {
        task: inputState.task,
        workerToDo: selectedEmployeeId,
        dateOpened: inputState.dateOpened,
        lastDateToDo: inputState.lastDateToDo,
        done: inputState.done,
      });
      toast.success("The task writed");
      navigate(ROUTES.HOME);
    } catch {
      toast.error("registered task was not done");
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    joiResponse = validateTaskSchema(newInputState);
    setinputsErrorState(joiResponse);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create new Task
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {labels.map((item) => (
              <TaskComponent
                id={item}
                item={item}
                label={item}
                inputState={inputState}
                onChange={handleInputChange}
                inputsErrorState={inputsErrorState}
                key={item}
              />
            ))}

            <Grid item xs={6}>
              <FormControl>
                <Select
                  labelId="employee-label"
                  label="workerToDo"
                  id="workerToDo"
                  value={selectedEmployeeId}
                  onChange={handleEmployeeChange}
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee._id} value={employee._id}>
                      {employee.name["firstName"] +
                        " " +
                        employee.name["lastName"]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1, mb: 1 }}
                color="primary"
                href={ROUTES.HOME}
              >
                CANCEL
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                {...(!joiResponse ? { disabled: false } : { disabled: true })}
                onClick={handeleBtnClick}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item></Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default TasksPage;
