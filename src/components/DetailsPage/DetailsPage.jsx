import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function DetailsPage() {

    const movies = useSelector(store => store.activeMovie);
    const history = useHistory();

    const handleBack = () => {
        history.push('/');
    }


    return (
        <>
            <h1>Movie Details</h1>
            {/* <img src={activeMovie.poster} /> */}
            <button onClick={handleBack}>Back to Movies List</button>
        </>
    );
}

export default DetailsPage;