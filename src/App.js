import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Listing from './pages/Listing';
import AddListing from './pages/AddListing';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/real-estate/:id" element={<Listing />} />
          <Route path="/add-listing" element={<AddListing />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
