import { Fragment, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import RegisterComponent from "../components/RegisterComponent";
import validateProfileSchema from "../validation/profileValidation";
import { Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
const ProfilePage = () => {
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    biz: false,
  });
  let joiResponse = validateProfileSchema(inputState);
  const [inputsErrorState, setinputsErrorState] = useState(null);
  const navigate = useNavigate();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/auth/users/userInfo/" + payload._id);
        let newInputState = {
          firstName: data.name.firstName,
          middleName: data.name.middleName,
          lastName: data.name.lastName,
          phone: data.phone,
          email: data.email,
          state: data.address.state,
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          zip: data.address.zip,
        };
        setInputState(newInputState);
        joiResponse = validateProfileSchema(newInputState);
        setinputsErrorState(joiResponse);
        joiResponse = validateProfileSchema(newInputState);
        if (joiResponse) {
          return;
        }
      } catch {
        toast.error("opps");
      }
    })();
  }, []);
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    joiResponse = validateProfileSchema(newInputState);
    setinputsErrorState(joiResponse);
  };

  const handeleBtnClick = async (ev) => {
    try {
      joiResponse = validateProfileSchema(inputState);
      if (joiResponse) {
        return;
      }
      if (inputState.zip == "") {
        inputState.zip = 0;
      }
      await axios.put("auth/users/" + payload._id, {
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
      });
      toast.success("The update was successful");

      navigate(-1);
    } catch {
      toast.error("registered user");
    }
  };
  return (
    <Fragment>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>{" "}
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {Object.entries(inputState).map(([category, categoryValue]) => (
                <RegisterComponent
                  item={category}
                  label={category}
                  inputState={inputState}
                  onChange={handleInputChange}
                  inputsErrorState={inputsErrorState}
                  key={category}
                />
              ))}
              <Grid item xs={12} sm={12}></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1, mb: 1 }}
                  color="primary"
                >
                  CANCEL
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
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
    </Fragment>
  );
};

export default ProfilePage;
