import TextField from "@material-ui/core/TextField";

const Text = (props) => {
    const { onValueChange, ...TextFieldProps } = props;

    const handleChange = (event) => {
        onValueChange(event.target.value);
    }

    return (
        <TextField
            multiline
            onChange={handleChange}
            {...TextFieldProps}
        >
        </TextField>
    );
};

export default Text;