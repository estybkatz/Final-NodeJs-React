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
import { Avatar, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Password } from "@mui/icons-material";

// const ProfilePage = () => {
//   const [inputState, setInputState] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     phone: "",
//     email: "",
//     //imageUrl: "",
//     //imageAlt: "",
//     state: "",
//     country: "",
//     city: "",
//     street: "",
//     houseNumber: "",
//     zipCode: "",
//     biz: false,
//   });
//   const nameFixes = ["firstName", "middleName", "lastName"];
//   const addressFixes = [
//     "state",
//     "country",
//     "city",
//     "street",
//     "houseNumber",
//     "zip",
//   ];
//   const [proFileData, setProFileData] = useState([]);
//   let joiResponse = validateProfileSchema(inputState);
//   const [inputsErrorState, setinputsErrorState] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const payload = useSelector((bigPie) => bigPie.authSlice.payload);
//   const { id } = useParams();
//   useEffect(() => {
//     (async () => {
//       console.log("Payload:", payload);
//       try {
//         const { data } = await axios.get("/auth/users/userInfo/" + payload._id);
//         console.log(data);
//         let newInputState = {
//           ...data,
//         };

//         // let check = {
//         //   firstName: data.name.firstName,
//         //   middleName: data.name.middleName,
//         //   lastName: data.name.lastName,
//         //   phone: data.phone,
//         //   email: data.email,
//         //   //    imageUrl: data.image.imageUrl,
//         //   //  imageAlt: data.image.imageAlt,
//         //   state: data.address.state,
//         //   country: data.address.country,
//         //   city: data.address.city,
//         //   street: data.address.street,
//         //   houseNumber: data.address.houseNumber,
//         //   zipCode: data.address.zip,
//         // };
//         // setProFileData(check);
//         // // if (data.zip == null) {
//         //   newInputState.zip = "";
//         // }
//         // delete newInputState._id;
//         // delete newInputState.isAdmin;
//         // delete newInputState.password;
//         // delete newInputState.biz;
//         setInputState(newInputState);
//         delete newInputState.name._id;
//         delete newInputState.address._id;
//         joiResponse = validateProfileSchema(newInputState);
//         console.log(joiResponse);

//         let delKeys = Object.keys(joiResponse);
//         delKeys.forEach((err) => delete newInputState[err]);

//         //  setinputsErrorState(joiResponse);
//         //console.log(joiResponse);
//         console.log(newInputState);
//         joiResponse = validateProfileSchema(newInputState);
//         console.log("second check", joiResponse);
//         if (joiResponse) {
//           return;
//         }
//       } catch {
//         toast.error("opps");
//       }
//     })();
//   }, [payload]);
//   console.log("proFileData", inputsErrorState);
//   const handeleBtnClick = async (ev) => {
//     try {
//       joiResponse = validateProfileSchema(inputState);
//       if (joiResponse) {
//         return;
//       }
//       if (inputState.zipCode == "") {
//         inputState.zipCode = null;
//       }
//       await axios.put("/users/userInfo" + id, {
//         name: {
//           firstName: inputState.firstName,
//           middleName: inputState.middleName,
//           lastName: inputState.lastName,
//         },
//         phone: inputState.phone,
//         email: inputState.email,
//         // image: { imageUrl: inputState.imageUrl, imageAlt: inputState.imageAlt },
//         address: {
//           state: inputState.state,
//           country: inputState.country,
//           city: inputState.city,
//           street: inputState.street,
//           houseNumber: inputState.houseNumber,
//           zip: inputState.zipCode,
//         },
//       });
//       toast.success("The update was successful");

//       navigate(-1);
//     } catch {
//       toast.error("registered user");
//     }
//   };
//   const handleInputChange = (ev) => {
//     const { id, value } = ev.target;
//     let newInputState = { ...inputState }; // Shallow copy

//     console.log("place", id);
//     console.log("value", value);

//     if (nameFixes.includes(id)) {
//       newInputState = {
//         ...newInputState,
//         name: { ...newInputState.name, [id]: value },
//       };
//     } else if (addressFixes.includes(id)) {
//       newInputState = {
//         ...newInputState,
//         address: { ...newInputState.address, [id]: value },
//       };
//     } else {
//       newInputState[id] = value;
//     }

//     setInputState(newInputState);

//     const joiResponse = validateProfileSchema(newInputState);
//     console.log("joiResponse change", joiResponse, newInputState);
//     setinputsErrorState(joiResponse);
//   };

//   const handleCancelBtnClick = (ev) => {
//     navigate(-1);
//   };

//   const keys = Object.keys(inputState);
//   // console.log(keys);
//   // console.log(inputState);
//   // console.log(inputState[keys[0]]);
const singleCategories = ["email", "phone"];
//   const myKeys = [
//     "name.firstName",

//     "middleName",

//     "lastName",
//     "phone",

//     "email",

//     "state",

//     "country",

//     "city",

//     "street",

//     "houseNumber",

//     "zip",
//   ];
//   // Object.keys(inputState).map((category) =>
//   //   Object.entries(inputState[category]).map(([property, value]) =>
//   //     console.log(category, property, value)
//   //   )
//   // );
//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//           <EditIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Profile
//         </Typography>{" "}
//         {/* <Box
//           component="img"
//           sx={{
//             height: 180,
//             width: 250,
//             maxHeight: { xs: 180, md: 167 },
//             maxWidth: { xs: 250, md: 250 },
//           }}
//           alt={inputState.imageAlt ? inputState.imageAlt : ""}
//           src={inputState.imageUrl ? inputState.imageUrl : ""}
//         /> */}
//         <Box component="div" noValidate sx={{ mt: 3 }}>
//           <Grid container spacing={2}>
//             {/* {keys.map((key) =>
//               typeof inputState[key] === "object" ? (
//                 inputState[key].map((item) => {
//                   <RegisterComponent
//                     item={item}
//                     label={item}
//                     inputState={inputState}
//                     onChange={handleInputChange}
//                     onClick={handleInputChange}
//                     inputsErrorState={inputsErrorState}
//                     key={item}
//                   />;
//                 })
//               ) : (
//                 <RegisterComponent
//                   item={key}
//                   label={key}
//                   inputState={inputState}
//                   onChange={handleInputChange}
//                   onClick={handleInputChange}
//                   inputsErrorState={inputsErrorState}
//                   key={key}
//                 />
//               )
//             )} */}
//             {Object.keys(inputState).map((category) =>
//               singleCategories.includes(category) ? (
//                 <RegisterComponent
//                   item={category}
//                   label={category}
//                   inputState={inputState}
//                   onChange={handleInputChange}
//                   // onClick={handleInputChange}
//                   inputsErrorState={inputsErrorState}
//                   key={category}
//                 />
//               ) : (
//                 Object.entries(inputState[category]).map(
//                   ([property, value]) => (
//                     <RegisterComponent
//                       item={property}
//                       label={property}
//                       inputState={inputState}
//                       onChange={handleInputChange}
//                       //onClick={handleInputChange}
//                       inputsErrorState={inputsErrorState}
//                       key={property + Date.now()}
//                     />
//                   )
//                 )
//               )
//             )}
//             <Grid item xs={12} sm={12}></Grid>
//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{ mt: 1, mb: 1 }}
//                 color="primary"
//                 onClick={handleCancelBtnClick}
//               >
//                 CANCEL
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 1, mb: 1 }}
//                 {...(!joiResponse ? { disabled: false } : { disabled: true })}
//                 onClick={handeleBtnClick}
//               >
//                 SUBMIT
//               </Button>
//             </Grid>
//           </Grid>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link to={ROUTES.LOGIN}>
//                 <Typography variant="body2">
//                   Already have an account? Sign in
//                 </Typography>
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };
// export default ProfilePage;

const ProfilePage = () => {
  // const nameFixes = ["firstName", "middleName", "lastName"];
  // const addressFixes = [
  //   "state",
  //   "country",
  //   "city",
  //   "street",
  //   "houseNumber",
  //   "zip",
  // ];
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
  const [proFileData, setProFileData] = useState([]);
  let joiResponse = validateProfileSchema(inputState);
  const [inputsErrorState, setinputsErrorState] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      //console.log("Payload:", payload);
      try {
        const { data } = await axios.get("/auth/users/userInfo/" + payload._id);
        console.log(data);
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
          //password: data.password,
        };
        setInputState(newInputState);
        // delete newInputState.name._id;
        // delete newInputState.address._id;
        joiResponse = validateProfileSchema(newInputState);
        console.log(newInputState);
        console.log(joiResponse);

        // let delKeys = Object.keys(joiResponse);
        // delKeys.forEach((err) => delete newInputState[err]);

        setinputsErrorState(joiResponse);
        //console.log(joiResponse);
        console.log(newInputState);
        joiResponse = validateProfileSchema(newInputState);
        console.log("second check", joiResponse);
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
  // const handleInputChange = (ev) => {
  //   const { id, value } = ev.target;
  //   let newInputState = { ...inputState }; // Shallow copy

  //   console.log("place", id);
  //   console.log("value", value);

  //   if (nameFixes.includes(id)) {
  //     newInputState = {
  //       ...newInputState,
  //       name: { ...newInputState.name, [id]: value },
  //     };
  //   } else if (addressFixes.includes(id)) {
  //     newInputState = {
  //       ...newInputState,
  //       address: { ...newInputState.address, [id]: value },
  //     };
  //   } else {
  //     newInputState[id] = value;
  //   }

  //   setInputState(newInputState);

  //   const joiResponse = validateProfileSchema(newInputState);
  //   console.log("joiResponse change", joiResponse, newInputState);
  //   setinputsErrorState(joiResponse);
  // };
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
        // image: { imageUrl: inputState.imageUrl, imageAlt: inputState.imageAlt },
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
          {/* <Box
              component="img"
              sx={{
                height: 180,
                width: 250,
                maxHeight: { xs: 180, md: 167 },
                maxWidth: { xs: 250, md: 250 },
              }}
              alt={inputState.imageAlt ? inputState.imageAlt : ""}
              src={inputState.imageUrl ? inputState.imageUrl : ""}
            /> */}
          <Box component="div" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* {keys.map((key) =>
                  typeof inputState[key] === "object" ? (
                    inputState[key].map((item) => {
                      <RegisterComponent
                        item={item}
                        label={item}
                        inputState={inputState}
                        onChange={handleInputChange}
                        onClick={handleInputChange}
                        inputsErrorState={inputsErrorState}
                        key={item}
                      />;
                    })
                  ) : (
                    <RegisterComponent
                      item={key}
                      label={key}
                      inputState={inputState}
                      onChange={handleInputChange}
                      onClick={handleInputChange}
                      inputsErrorState={inputsErrorState}
                      key={key}
                    />
                  )
                )} */}
              {Object.entries(inputState).map(
                ([category, categoryValue]) => (
                  // singleCategories.includes(category) ? (
                  <RegisterComponent
                    item={category}
                    label={category}
                    inputState={inputState}
                    onChange={handleInputChange}
                    inputsErrorState={inputsErrorState}
                    key={category}
                  />
                )
                // ) : (
                //   Object.entries(categoryValue).map(([property, value]) => (
                //     <RegisterComponent
                //       item={property}
                //       label={property}
                //       inputState={inputState}
                //       onChange={handleInputChange}
                //       //onClick={handleInputChange}
                //       inputsErrorState={inputsErrorState}
                //       key={property + Date.now()}
                //     />
                //   ))
                // )
              )}
              <Grid item xs={12} sm={12}></Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1, mb: 1 }}
                  color="primary"
                  //   onClick={handleCancelBtnClick}
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
