import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

import Button from '@mui/material/Button';

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
            <h1>{activeMovie && activeMovie.title}</h1>
            <img src={activeMovie && activeMovie.poster} />
            <ul>
                {activeMovie.genres && activeMovie.genres.map(x => 
                  <li key={x.genre}>{x.genre}</li>
                )}
            </ul> 
            <p>{activeMovie && activeMovie.description}</p>
            <Button variant="outlined" onClick={handleBack}>
                Back to Movies List
            </Button>
        </>
    );
}

export default DetailsPage;