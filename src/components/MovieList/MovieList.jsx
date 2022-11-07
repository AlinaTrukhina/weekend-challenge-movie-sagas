import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const goToDetails = (evt, movie) => {
        evt.preventDefault(evt);

        history.push(`/details/${movie.id}`)
    }

    const handleCreateMovie = () => {
      history.push('/addmovie');
    }

    return (
        <>
        <main>
        <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
              marginTop="10px"
            >
              Movies List
            </Typography>
          <Button onClick={handleCreateMovie}>
            Add Movie
          </Button>
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item key={movie.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', 
                  flexDirection: 'column',
                  backgroundColor: "#bef7e1" }}
                >
                  <CardMedia
                    component="img"
                    image={movie.poster}
                    alt={movie.title}
                    onClick={(evt)=>goToDetails(evt, movie)} 
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography  variant="h5" component="h3">
                      {movie.title}
                    </Typography>
                    {/* <Typography>
                    </Typography> */}
                  </CardContent>
                  <CardActions 
                  sx={{justifyContent:'center'}}>
                    <Button 
                    onClick={(evt)=>goToDetails(evt, movie)}>
                      Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </main>
        </>
        
    );
}

export default MovieList;