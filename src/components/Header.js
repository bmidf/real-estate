import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import LOGO from '../assets/icons/LOGO-02 3.svg';

const Header = () => {
  return (
    <Navbar className="bg-white"  style={{ height: '100px', backgroundColor: 'white' }} >
        <Navbar.Brand href="/real-estate" style={{marginLeft: '10px'}}><img src={LOGO} alt='logo'/></Navbar.Brand>
    </Navbar>
  );
};

export default Header;
