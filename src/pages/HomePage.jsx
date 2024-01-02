import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TableCell,
  TableHead,
  Table,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ROUTES from "../routes/ROUTES";
import TocIcon from "@mui/icons-material/Toc";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableRowsComponent from "../components/TableRowsComponent";
const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [currentView, setCurrentView] = useState(true);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops, Error retrieving data");
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.firstName.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter((card) => card.firstName.startsWith(filter))
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
      toast.success("Succesfully deleted card");
    } catch {
      toast.error("Oops, The item was not deleted");
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    const selectedCards = cardsArr.find((card) => card._id == id);
    navigate(`/edit/${id}`, { state: { user_id: selectedCards.user_id } });
  };

  const handleMoreInformationFromInitialCardsArr = (id) => {
    navigate(`/MInfo/${id}`);
  };
  const createTask = (id) => {
    navigate(`/createTask/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }

  const delete1 = () => {};
  const handleDetailsBtnClick = (id) => {
    navigate(`/MInfo/${id}`);
  };
  const createCustomer = () => {
    navigate(ROUTES.CREATE);
  };
  const changeView = () => {
    if (currentView) {
      setCurrentView(false);
    } else {
      setCurrentView(true);
    }
  };

  return (
    <Box>
      {payload ? (
        <Box>
          <h1>Customers List</h1>
          <h3>Here you can find all of the customers in the office</h3>
          <img
            src="https://images.pexels.com/photos/14853814/pexels-photo-14853814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="office"
            width="1200vw"
            height="300vh"
          />

          <Button onClick={changeView}>
            <TocIcon />
            <DashboardIcon />
          </Button>
          {payload && payload.isAdmin ? (
            <Box>
              <Button>
                <AddCircleIcon onClick={createCustomer} />
              </Button>
            </Box>
          ) : (
            ""
          )}
          {currentView ? (
            <Grid container spacing={2}>
              {cardsArr.map((item) => (
                <Grid item sm={6} xs={12} md={4} key={item._id + Date.now()}>
                  <CardComponent
                    id={item._id}
                    phone={item.phone}
                    clubMember={item.clubMember}
                    email={item.email}
                    title={item.firstName}
                    subTitle={item.ReceptionDateAtTheOffice}
                    description={item.BusinessDescription}
                    onDelete={handleDeleteFromInitialCardsArr}
                    onDeletefav={delete1}
                    onEdit={handleEditFromInitialCardsArr}
                    onInfo={handleMoreInformationFromInitialCardsArr}
                    canEdit={payload && payload.isBusiness && payload.isAdmin}
                    onCreateTask={createTask}
                    canEditPrivate={payload && payload.isBusiness}
                    card={item}
                    user_id={item.user_id}
                    isFav={payload && item.likes.includes(payload._id)}
                    more_details={handleDetailsBtnClick}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{"Name"}</TableCell>
                    <TableCell>{"Phone"}</TableCell>
                    <TableCell>{"Email"}</TableCell>
                    <TableCell>{"club - member"}</TableCell>
                    <TableCell>{"link - to - card"}</TableCell>
                  </TableRow>
                </TableHead>
                {cardsArr.map((item) => (
                  <TableRowsComponent
                    key={item._id + Date.now()}
                    Name={item.firstName}
                    phone={item.phone}
                    email={item.email}
                    clubMember={item.clubMember}
                    linkToCard={"link to card"}
                  />
                ))}
              </Table>
            </Grid>
          )}
        </Box>
      ) : (
        <Box>
          <h1>Home page</h1>
          <h3>
            This is our homePage, to work on our system, please login <br />
            If you are not signed up, please contact the admin that will sign
            you up
          </h3>{" "}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
