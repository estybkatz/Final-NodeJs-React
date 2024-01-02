import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const FavCardsPage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("cards/fav-cards")

      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops");
      });
  }, []);

  const delete1 = (id) => {
    setCardsArr(cardsArr.filter((card) => card._id !== id));
  };

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
    } catch (err) {
      toast.error("Error when deleting");
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    const selectedCards = cardsArr.find((card) => card._id == id);
    navigate(`/edit/${id}`, { state: { user_id: selectedCards.user_id } });
  };
  const handleMoreInformationFromInitialCardsArr = (id) => {
    navigate(`/MInfo/${id}`);
  };
  const createtask = (id) => {
    navigate(`/createTask/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }
  const handleDetailsBtnClick = (id) => {
    navigate(`/MInfo/${id}`);
  };

  return (
    <Box>
      {originalCardsArr.length === 0 ? (
        <Typography>You don't have favorites cards</Typography>
      ) : (
        <Box>
          <h1>Favorites Cards page</h1>
          <h3>Here you view your favorites cards</h3>
          <Grid container spacing={2}>
            {cardsArr.map((item) => (
              <Grid item sm={6} xs={12} md={4} key={item._id + Date.now()}>
                <CardComponent
                  id={item._id}
                  phone={item.phone}
                  address={
                    item.street + " " + item.houseNumber + ", " + item.city
                  }
                  onCreateTask={createtask}
                  cardNumber={item.bizNumber}
                  title={item.firstName}
                  subTitle={item.ReceptionDateAtTheOffice}
                  description={item.BusinessDescription}
                  onInfo={handleMoreInformationFromInitialCardsArr}
                  onDeletefav={delete1}
                  onDelete={handleDeleteFromInitialCardsArr}
                  onEdit={handleEditFromInitialCardsArr}
                  canEdit={payload && (payload.isBusiness || payload.isAdmin)}
                  canEditPrivate={payload && payload.isBusiness}
                  isFav={true}
                  more_details={handleDetailsBtnClick}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default FavCardsPage;
