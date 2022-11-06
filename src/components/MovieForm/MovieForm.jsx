import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

// import material UI for styling form
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function MovieForm() {

    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GENRES' });
    }, []);

    return (
        <>
            <h2>Add Movie</h2>
            <form>
            {/* 
            input
            input
            textarea
            dropdown
            */}
            <TextField id="movieTitleInput" 
                        label="movie title" 
                        variant="outlined" />
            <TextField id="moviePosterInput" 
                       label="movie poster url" 
                        variant="outlined" />
            <TextField id="movieDescInput" 
                        label="movie description" 
                        variant="outlined" />
            
            </form>
        </>
    )
}

export default MovieForm;