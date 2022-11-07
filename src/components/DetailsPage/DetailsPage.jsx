import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { width } from '@mui/system';

function DetailsPage() {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();

    // on load, get active movie from the database
    useEffect(() => {
        console.log(params.id);
        dispatch({
            type: 'GET_ACTIVE_MOVIE',
            payload: params.id
        });
    }, [params.id])

    const activeMovie = useSelector(store => store.activeMovie);

    const handleBack = () => {
        history.push('/');
    }

    return (
        <>
        <Card sx={{ m: 1, maxwidth: 500, backgroundColor: "#bef7e1" }} >
            <CardHeader
            title={activeMovie && activeMovie.title}
            />
            <CardMedia
                sx={{height: '50%', width: '50%', margin: 'auto' }}
                component="img"               
                image={activeMovie && activeMovie.poster}
                alt={activeMovie && activeMovie.title}
            />
            <CardContent>
                <List
                sx={{display:'flex'}}>
                    {activeMovie.genres && activeMovie.genres.map(x => 
                    <ListItem 
                    sx={{justifyContent:'space-around'}}
                    key={x.genre}>{x.genre}</ListItem>
                    )}
                </List> 
                <Typography variant="body2" color="text.secondary">
                {activeMovie && activeMovie.description}
                </Typography>
            </CardContent>
        </Card>
        <Button variant="outlined" onClick={handleBack} 
            sx={{marginBottom:5}}>
            Back to Movies List
        </Button>
        </>
    );
}

export default DetailsPage;