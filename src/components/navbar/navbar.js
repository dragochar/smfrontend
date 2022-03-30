import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { SolMints } from '../../assets/twitter-logo.svg';
import './navbar.css'


const MintNavbar = () => {


return (

<Navbar className="navbar" bg="dark" variant="dark" sticky="top">
  <Container fluid>
    <Nav className="me-auto sol-mints-logo">
    <Navbar.Brand href="#home">
      SolMints
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    </Nav>
    
    <div>
        <button className="cta-button submit-mint-button" 
            onClick={(e) => {
                e.preventDefault();
                window.open("https://forms.gle/m6WNKYHqitcUnNm16", "_blank")
                }}>
            Submit A Project
        </button>
    </div>
    </Container>
    </Navbar>



    );


}

export default MintNavbar;