import {
    Input,
    InputLabel,
    FormControl,
} from "@material-ui/core";

const Number = (props) => {
    const { label, options, onValueChange, ...InputProps } = props;

    const inputProps = {
        min: options ? options[0] : undefined,
        max: options ? options[1] : undefined,
        step: 0.1,
    };

    const handleChange = (event) => {
        if (event.target.validity.valid === false) {
            return;
        }

        onValueChange(event.target.value);
    }

    return (
        <FormControl fullWidth>
            <InputLabel shrink>
                {label}
            </InputLabel>
            <Input
                type="number"
                inputProps={inputProps}
                onChange={handleChange}
                {...InputProps}
            >
            </Input>
        </FormControl>
    );
};

export default Number;