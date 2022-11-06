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
    const [genreName, setGenreName] = React.useState([]);
    const genres = useSelector(store => store.genres);

    // fetch genres on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GENRES' });
    }, []);

    // set movie genre on change
    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setGenreName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    function getStyles(genre, genreName, theme) {
        return {
        fontWeight:
            genreName.indexOf(genre) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
        };
    }

    return (
        <div>
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="genres-label">Genres</InputLabel>
            <Select
            labelId="genres-label"
            id="multiple-genres"
            multiple
            value={genreName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-genres" label="Genres" />}
            renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
        </FormControl>
        </div>
    );
}

export default MovieForm;