import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';


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

    const dispatch = useDispatch();

    // set variabales to use state or store
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const [newMoviePoster, setNewMoviePoster] = useState('');
    const [newMovieDesc, setNewMovieDesc] = useState('');
    const [genreName, setGenreName] = useState([]);
    const genres = useSelector(store => store.genres);

    // fetch genres on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GENRES' });
    }, []);

    // set movie genre on change
    const handleGenreChange = (event) => {
        const {
        target: { value },
        } = event;
        setGenreName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleTitleChange = (event) => {
        setNewMovieTitle(event.target.value);
      };

    const handlePosterChange = (event) => {
        setNewMoviePoster(event.target.value);
    };

    const handleDescChange = (event) => {
        setNewMovieDesc(event.target.value);
    };

    function getStyles(genre, genreName, theme) {
        return {
        fontWeight:
            genreName.indexOf(genre) === -1
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
            value={genreName}
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
                style={getStyles(genre, genreName, theme)}
                >
                {genre.name}
                </MenuItem>
            ))}
            </Select>
        </div>
        </Box>
    );
}

export default MovieForm;