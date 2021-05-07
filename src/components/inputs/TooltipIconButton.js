import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

export default function TooltipIconButton(props) {
    const { tooltip, ...ButtonProps } = props;

    return (
        <Tooltip title={tooltip}>
            <Button
                variant="contained"
                children={tooltip}
                {...ButtonProps}
            />
        </Tooltip>
    );
}