import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const TableRowsComponent = ({
  img,
  title,
  subTitle,
  phone,
  address,
  cardNumber,
  Name,
  email,
  clubMember,
  linkToCard,
  id,
  onDelete,
  onDeletefav,
  onEdit,
  onInfo,
  canEdit,
  canEditPrivate,
  user_id,
  isFav,
}) => {
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const [favState, setfavState] = React.useState(isFav);

  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleInfoBtnClick = () => {
    onInfo(id);
  };
  const handleFavBtnClick = async () => {
    try {
      if (!payload) {
        return;
      }
      await axios.patch("/cards/" + id);
      onDeletefav(id);
      setfavState(!favState);
      toast.success("The change was made successfully");
    } catch {
      toast.error("error when change favorites cards, try later again");
    }
  };
  return (
    // <Paper sx={{ width: "100%", overflow: "hidden" }}>
    //<TableContainer sx={{ maxHeight: 440 }}>
    // <Table>
    //   <TableHead>
    //     <TableRow>
    //       <TableCell>{"Name"}</TableCell>
    //       <TableCell>{"Phone"}</TableCell>
    //       <TableCell>{"Email"}</TableCell>
    //       <TableCell>{"club - member"}</TableCell>
    //       <TableCell>{"link - to - card"}</TableCell>
    //       {/* {columns.map((item) => (
    //         <TableCell key={item + Date.now()}>
    //           <Typography>{item}</Typography>
    //         </TableCell>
    //       ))} */}
    //     </TableRow>
    //   </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>{Name}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>
          {clubMember ? <CheckCircleIcon /> : <UnpublishedIcon />}
        </TableCell>

        <TableCell>
          <Button>{linkToCard} </Button>
        </TableCell>
      </TableRow>
    </TableBody>
    // </Table>
    //</TableContainer>
    // </Paper>
  );
};

export default TableRowsComponent;
