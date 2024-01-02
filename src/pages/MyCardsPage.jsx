import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import ROUTES from "../routes/ROUTES";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const MyCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch(() => {
        toast.error("Oops,Error retrieving data, please try again later");
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
      setCardsArr(
        data.filter(
          (card) =>
            card.firstName.startsWith(filter) || card.email.startsWith(filter)
        )
      );
      return;
    }
    if (originalCardsArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter(
          (card) =>
            card.firstName.startsWith(filter) || card.email.startsWith(filter)
        )
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
      toast.success("The card has been successfully deleted");
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

  const createCard = () => {
    navigate(ROUTES.CREATE);
  };

  const delete1 = () => {};

  if (!cardsArr) {
    return <CircularProgress />;
  }

  const createTask = (id) => {
    navigate(`/createTask/${id}`);
  };
  return (
    <Box>
      {originalCardsArr.length === 0 ? (
        <Box>
          <Typography>You didn't create cards</Typography>

          <Button onClick={createCard}>
            <AddCircleIcon />
          </Button>
        </Box>
      ) : (
        <Box>
          <h1>My Customers Page</h1>
          <h3> All the customers I added</h3>
          <Button onClick={createCard}>
            <AddCircleIcon />
          </Button>
          <Grid container spacing={2}>
            {cardsArr.map((item) => (
              <Grid item sm={6} xs={12} md={4} key={item._id + Date.now()}>
                <CardComponent
                  id={item._id}
                  phone={item.phone}
                  address={
                    item.street + " " + item.houseNumber + ", " + item.city
                  }
                  cardNumber={item.bizNumber}
                  title={item.firstName}
                  subTitle={item.ReceptionDateAtTheOffice}
                  description={item.BusinessDescription}
                  onDelete={handleDeleteFromInitialCardsArr}
                  onCreateTask={createTask}
                  onDeletefav={delete1}
                  onEdit={handleEditFromInitialCardsArr}
                  onInfo={handleMoreInformationFromInitialCardsArr}
                  more_details={handleMoreInformationFromInitialCardsArr}
                  canEdit={payload && payload.isBusiness && payload.isAdmin}
                  canEditPrivate={payload && payload.isBusiness}
                  card={item}
                  user_id={item.user_id}
                  isFav={payload && item.likes.includes(payload._id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
export default MyCardsPage;
