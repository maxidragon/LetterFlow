import PublicIcon from '@mui/icons-material/Public';
import Flag from 'react-world-flags'

const FlagIcon = (props: {code: string}) => {
    if (props.code) {
        return <Flag code={props.code.toLowerCase()} style={{width: 16, height: 16}}/>;
    } else {
        return <PublicIcon />;
    }
}

export default FlagIcon;