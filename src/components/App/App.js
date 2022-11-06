import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieForm from '../MovieForm/MovieForm';
import DetailsPage from '../DetailsPage/DetailsPage';



function App() {
  return (
    <div className="App">
      {/* <h1>The Movies Saga!</h1> */}
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        <Route path='/details/:id' >
          <DetailsPage />
        </Route> 

        {/* <Route path='/addmovie'>
          <MovieForm />
        </Route> */}
      </Router>
    </div>
  );
}


export default App;
