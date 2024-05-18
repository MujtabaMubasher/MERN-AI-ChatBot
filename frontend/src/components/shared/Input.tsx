import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};
function Input(props: Props) {
  return (
    <TextField
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 20,
          fontSize: 20,
          color: "white",
          marginBottom: "40px",
          background: "black",
        },
      }}
    />
  );
}

export default Input;
