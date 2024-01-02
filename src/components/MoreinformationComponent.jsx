import { Box, Typography } from "@mui/material";

const InformationComponent = ({ item, inputState }) => {
  let innerItem = item + " :";
  return (
    <Box sx={{ justifyContent: "center" }}>
      <Typography variant="h6">{innerItem}</Typography>
      <Typography variant="body1" style={{ wordBreak: "break-all" }}>
        {inputState[item] ? inputState[item] : ""}
        <br />
        <br />
      </Typography>
    </Box>
  );
};

export default InformationComponent;
