import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {formatDate} from "../../logic/other";
import {useNavigate} from "react-router-dom";
import { Letter } from '../../logic/interfaces';

const LetterCard = (props: {
    letter: Letter;
}) => {
    console.log(props.letter);
    const navigate = useNavigate();
    const sendAt = formatDate(new Date(props.letter.sendAt));
    const deliveredAt = formatDate(new Date(props.letter.deliveredAt));
    return (
        <Card sx={{ width: 300, mr: 5, mt: 2, cursor: props.letter.content ? 'pointer' : 'normal'}} onClick={() => {
            if (props.letter.content) {
                navigate(`/letter/${props.letter.id}`);
            }
        }}>
            <CardContent sx={{mt: 2, display: 'flex', flexDirection: 'column'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                   Send at: {sendAt}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                   Delivered at: {deliveredAt}
                </Typography>
                <Typography variant="body2">
                    {props.letter.content ? props.letter.content.substring(0, 200) + "..." : 'Letter has not arrvived yet'}
                </Typography>

                <Typography sx={{mt: 2 }} color="text.secondary">
                    {props.letter.from.username}
                </Typography>
            </CardContent>
        </Card>
    )
};

export default LetterCard;