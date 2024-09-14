import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import './App.css';

function App() {
  return (
    <Router>
      <Container className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/real-estate/:id" element={<Listing />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
