import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import DetailsPage from '../DetailsPage/DetailsPage';
import { useHistory } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        <Route to='/details/${movie.id}' exact>
          <DetailsPage />
        </Route> 
        {/* Add Movie page */}

      </Router>
    </div>
  );
}


export default App;
