import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Material UI properties for the form element
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function MovieForm() {

    // Material UI theme
    const theme = useTheme();

    // react/redux declarations
    const dispatch = useDispatch();
    const history = useHistory();

    // set variabales to use state or store
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newMoviePoster, setNewMoviePoster] = useState('');
    const [newMovieDesc, setNewMovieDesc] = useState('');
    const [genreNames, setGenreNames] = useState([]);
    const genres = useSelector(store => store.genres);

    // fetch genres on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GENRES' });
    }, []);

    // add movie
    const addMovie = (genres) => {

        const createdMovie = {
            title: newMovieTitle,
            poster: newMoviePoster,
            description: newMovieDesc,
            newMovieGenres: genreNames
        }
        console.log('created movie', createdMovie);
        dispatch({
            type: 'ADD_MOVIE',
            payload: createdMovie
        })
    }

    // set movie genre on change
    const handleGenreChange = (event) => {
        const {
        target: { value },
        } = event;
        setGenreNames(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCancel = () => {
        history.push('/');
    }

    const handleTitleChange = (event) => {
        setNewMovieTitle(event.target.value);
      };

    const handlePosterChange = (event) => {
        setNewMoviePoster(event.target.value);
    };

    const handleDescChange = (event) => {
        setNewMovieDesc(event.target.value);
    };

    function getStyles(genre, genreNames, theme) {
        return {
        fontWeight:
            genreNames.indexOf(genre) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
        };
    };



    return (
        <Box
        component="form"
        sx={{ m: 1, width: 300 }} >
            <div>
            <TextField
            fullWidth
            required
            id="movieTitleInput"
            label="Title"
            value={newMovieTitle}
            onChange={handleTitleChange}
            />
            <TextField
            fullWidth
            required
            id="moviePosterInput"
            label="Poster url"
            value={newMoviePoster}
            onChange={handlePosterChange}
            />
            <TextField
            fullWidth
            required
            multiline
            id="movieDescInput"
            label="Description"
            value={newMovieDesc}
            onChange={handleDescChange}
            />
            </div>
            <div>
            <InputLabel id="genres-label">Genres</InputLabel>
            <Select
            fullWidth
            labelId="genres-label"
            id="multiple-genres"
            multiple
            value={genreNames}
            onChange={handleGenreChange}
            input={<OutlinedInput id="select-multiple-genres" label="Genres" />}
            renderValue={(selected) => (
                <Box sx={{ width: 250, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                    <Chip key={value} label={value} />
                ))}
                </Box>
            )}
            MenuProps={MenuProps}
            >
            {genres.map((genre) => (
                <MenuItem
                key={genre.id}
                value={genre.name}
                style={getStyles(genre, genreNames, theme)}
                >
                {genre.name}
                </MenuItem>
            ))}
            </Select>
        </div>
        <Stack spacing={2} direction="row">
            <Button 
                variant="outlined"
                onClick={handleCancel}
                >Cancel
            </Button>
            <Button 
                variant="contained"
                onClick={addMovie}
                >Save
            </Button>
        </Stack>
        </Box>
    );
}

export default MovieForm;