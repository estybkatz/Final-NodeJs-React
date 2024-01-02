import { Alert, Grid, TextField } from "@mui/material";
const TaskComponent = ({
  item,
  label,
  onChange,
  inputsErrorState,
  inputState,
  onClick,
  id,
}) => {
  if (item === "done") return;

  return (
    <Grid item xs={12} sm={6}>
      <TextField
        name={item}
        type="text"
        id={id}
        label={label}
        onChange={onChange}
        onClick={onClick}
        autoComplete="family-name"
        value={inputState[item] ? inputState[item] : ""}
      />
      {inputsErrorState && inputsErrorState[item] && (
        <Alert severity="warning">
          {inputsErrorState[item].map((error) => (
            <div key={"errors" + error + item}>{error}</div>
          ))}
        </Alert>
      )}
    </Grid>
  );
};

export default TaskComponent;
