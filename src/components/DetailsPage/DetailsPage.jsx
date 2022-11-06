import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function DetailsPage() {

    const activeMovie = useSelector(store => store.activeMovie);
    const history = useHistory();

    const handleBack = () => {
        history.push('/');
    }

    return (
        <>
            <h1>{activeMovie.title}</h1>
            <img src={activeMovie && activeMovie.poster} />
            <ul>
                {activeMovie && activeMovie.genres.map(x => 
                  <li key={x.genre}>{x.genre}</li>
                )}
            </ul>
            <p>{activeMovie.description}</p>
            <button onClick={handleBack}>Back to Movies List</button>
        </>
    );
}

export default DetailsPage;