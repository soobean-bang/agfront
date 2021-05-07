import {
    NativeSelect,
    InputLabel,
    FormControl,
} from "@material-ui/core";

const Options = (props) => {
    const { options } = props;
    if (!options) {
        return null;
    }

    const keys = Object.keys(options);

    return keys.map((key) => {
        const value = key;
        const desc = options[key];
        return <option value={value}>{desc}</option>
    });
};

const Input = (props) => {
    const { options, onValueChange, ...NativeSelectProps } = props;

    const handleChange = (event) => {
        onValueChange(event.target.value);
    }

    return (
        <NativeSelect
            onChange={handleChange}
            {...NativeSelectProps}
        >
            <Options
                options={options}
            />
        </NativeSelect >
    );
};

const Select = (props) => {
    const { label, ...inputProps } = props;
    return (
        <FormControl fullWidth>
            <InputLabel shrink>
                {label}
            </InputLabel>
            <Input {...inputProps} />
        </FormControl>
    );
}

export default Select;