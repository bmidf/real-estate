import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar className="bg-white"  style={{ height: '100px', backgroundColor: 'white' }} >
        <Navbar.Brand href="/real-estate" style={{color: 'red', fontWeight: 'bold'}}>REDBERRY</Navbar.Brand>
    </Navbar>
  );
};

export default Header;
