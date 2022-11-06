import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { useHistory } from "react-router-dom";




// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);

    // get active movie for movie details page
    yield takeEvery('GET_ACTIVE_MOVIE', getActiveMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }       
}

function* getActiveMovie(action) {

    // get request for the database to get one movie to display
    try {
        const activeMovie = yield axios.get(
            `/api/movie/${action.payload.id}`
        );
        //console.log('getting selected movie', action.payload.id);

        const activeMovieWithGenres = {
            id: activeMovie.data[0].id,
            title: activeMovie.data[0].title,
            poster: activeMovie.data[0].poster,
            description: activeMovie.data[0].description,
            genres: {
            }
        }
        activeMovieWithGenres.genres = activeMovie.data.map(item => {
            return {
                genre: item.name
                }
        });

        console.log('activeMovieWithGenres', activeMovieWithGenres);
        console.log('get movie response from db', activeMovie);
        yield put({
            type: 'SET_ACTIVE_MOVIE',
            payload: activeMovieWithGenres, 
        })

        // history.push(`/details/${activeMovie.id}`)
    }
    catch (error) {
        console.error('get active movie error', error);
    }

}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Reducers go here
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const activeMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_ACTIVE_MOVIE':
            return action.payload;
        default: 
            return state;
    }
}

// end reducer section

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        activeMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
