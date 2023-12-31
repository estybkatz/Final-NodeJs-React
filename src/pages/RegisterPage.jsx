import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validateRegisterSchema from "../validation/registerValidation";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import CachedIcon from "@mui/icons-material/Cached";
import RegisterComponent from "../components/RegisterComponent";
const RegisterPage = () => {
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    isAdmin: false,
  });
  const navigate = useNavigate();
  let joiResponse = validateRegisterSchema(inputState);
  const [inputsErrorState, setinputsErrorState] = useState(null);
  const handeleBtnClick = async (ev) => {
    try {
      joiResponse = validateRegisterSchema(inputState);
      if (joiResponse) {
        return;
      }
      await axios.post("auth/users/register", {
        name: {
          firstName: inputState.firstName,
          middleName: inputState.middleName,
          lastName: inputState.lastName,
        },
        phone: inputState.phone,
        email: inputState.email,
        password: inputState.password,

        address: {
          state: inputState.state,
          country: inputState.country,
          city: inputState.city,
          street: inputState.street,
          houseNumber: inputState.houseNumber,
          zip: inputState.zip,
        },
        isAdmin: inputState.isAdmin,
      });
      toast.success("Employee registration was successfully completed");
      navigate(ROUTES.LOGIN);
    } catch {
      toast.error("registered was not done");
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    joiResponse = validateRegisterSchema(newInputState);
    setinputsErrorState(joiResponse);
  };
  const handleAdminChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState["isAdmin"] = ev.target.checked;
    setInputState(newInputState);
  };
  const resetForm = () => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState = {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      isAdmin: false,
    };
    setInputState(newInputState);
    joiResponse = validateRegisterSchema(newInputState);
    if (!joiResponse) {
      return;
    }
    let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
    Object.keys(newjoiResponse).forEach((index) => {
      newjoiResponse[index] = "";
    });
    setinputsErrorState(newjoiResponse);
  };
  const keys = Object.keys(inputState);
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
          Sign up
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {keys.map((key) => (
              <RegisterComponent
                item={key}
                label={key}
                inputState={inputState}
                onChange={handleInputChange}
                inputsErrorState={inputsErrorState}
                key={key}
              />
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="isAdmin"
                    value={inputState.isAdmin}
                    color="primary"
                    onClick={handleAdminChange}
                  />
                }
                label="Signup as Admin"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={resetForm}
                endIcon={<CachedIcon />}
              ></Button>
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
            <Grid item>
              <Link to={ROUTES.LOGIN}>
                <Typography variant="body2">
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
