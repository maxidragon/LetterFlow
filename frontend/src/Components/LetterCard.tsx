import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const LetterCard = (props: any) => {
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    return (
        <Card sx={{ width: 200, mr: 5, mt: 2, cursor: 'pointer' }}>
            <CardContent sx={{mt: 2}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                   2023-01-01
                </Typography>
                <Typography variant="body2">
                    {text.substring(0, 200) + "..."}
                </Typography>

                <Typography sx={{mt: 2 }} color="text.secondary">
                    maxidragon
                </Typography>
            </CardContent>
        </Card>
    )
};

export default LetterCard;