import Header from '../src/components/Header';
import './App.css';
import React from 'react';
import Home from './pages/Home';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container className="App">
      <Header/> 
      <Home/>
    </Container>
  );
}

export default App;
