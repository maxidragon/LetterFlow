import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getLetterById} from "../../logic/letters";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {formatDate} from "../../logic/other";

const Letter = () => {
    const {letterId} = useParams<{ letterId: string }>();
    const [letter, setLetter] = useState<any>(null);

    useEffect(() => {
        const getLetter = async () => {
            const letter = await getLetterById(letterId);
            console.log(letter);
            letter.sendAt = formatDate(new Date(letter.sendAt));
            letter.deliveredAt = formatDate(new Date(letter.deliveredAt));
            setLetter(letter);
        };
        getLetter();
    }, [letterId]);

    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Card sx={{width: 700, mr: 5, mt: 2}}>
                    {letter && (
                        <CardContent sx={{mt: 2, display: 'flex', flexDirection: 'column'}}>
                            <Typography variant="body2">
                                {letter.content ? letter.content : 'Letter has not arrvived yet'}
                            </Typography>
                            <Typography sx={{mt: 2}} color="text.secondary">
                                {letter.from.username}
                            </Typography>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Send at: {letter.sentAt}
                            </Typography>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                Delivered at: {letter.deliveredAt}
                            </Typography>
                        </CardContent>
                    )}
                </Card>
            </Box>
        </>
    )
};

export default Letter;