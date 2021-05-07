import Button from '@material-ui/core/Button';

function TimingLetterButton({ char, onClick }) {
    const s = '20px';

    return (
        <Button
            style={{
                maxWidth: s,
                maxHeight: s,
                minWidth: s,
                minHeight: s,
            }}
            variant="contained"
            onClick={onClick}
        >
            {char}
        </Button>
    );
}

const TimingInput = (props) => {
    const { script, onValueChanged, closer } = props;

    const onClick = (index) => {
        onValueChanged(index);
        closer();
    }

    const buttons = script.split('').map((char, index) => {
        return (
            <TimingLetterButton char={char} onClick={() => onClick(index)} />
        )
    });

    return (
        <>
            {buttons}
        </>
    );
}

export default TimingInput;