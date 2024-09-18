import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar className="bg-white FiraGo" style={{ height: '100px', backgroundColor: 'white' }}>
      <Container>
        <Navbar.Brand href="/real-estate" style={{color: 'red', fontWeight: 'bold'}}>REDBERRY</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
