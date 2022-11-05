import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DetailsPage() {

    const movies = useSelector(store => store.activeMovie);

    return (
        <>
            <h1>Movie Details</h1>
            <img src={activeMovie.poster} />
        </>
    );
}

export default DetailsPage;