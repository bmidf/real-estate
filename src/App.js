import { BrowserRouter  as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Listing from './components/Listing';
import AddListing from './components/AddListing';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="App">
      <Router>
          <Header />
          <Switch>
            <Route path="/real-estate"><Home /></Route>
            <Route path="/real-estate/:id"><Listing /></Route>
            <Route path="/add-listing"><AddListing /></Route>
          </Switch>
      </Router>
    </Container>
  );
}

export default App;
