import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Listing from './components/Listing';
import AddListing from './components/AddListing';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Container className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/real-estate/:id" element={<Listing />} />
          <Route path="/add-listing" element={<AddListing />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
