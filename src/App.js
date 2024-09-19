import './App.css';
import {Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Listing from './pages/Listing';
import AddListing from './pages/AddListing';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="App" style={{ maxWidth: '1620px', margin: '0 auto'}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/real-estate/:id" element={<Listing />} />
          <Route path="/add-listing" element={<AddListing />} />
        </Routes>
    </Container>
  );
}

export default App;