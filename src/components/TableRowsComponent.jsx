import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
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
  isFav,
}) => {
  return (
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
  );
};

export default TableRowsComponent;
