import React, { useState, useEffect } from 'react'
import { Navbar, Nav } from "react-bootstrap";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const NavBar = (props) => {
    const [getClassColor, setClassColor] = useState('light')

    useEffect(() => {
        localStorage.getItem('color') !== null && setClassColor('dark')
    }, [])

    const HandleSelect = (selected) => {
        if (selected === 'Color') {
            getClassColor === 'dark' ? localStorage.removeItem('color') : localStorage.setItem('color', 'dark')
            setClassColor(getClassColor === 'dark' ? 'light' : 'dark');
        }
        else if (selected !== 'Home') props.history.push({ pathname: `/${selected}` })
        else props.history.goBack();
    }
    return (
        <Navbar collapseOnSelect expand="md" bg={getClassColor} variant={getClassColor}> {/* light / dark */}
            <Navbar.Brand className="">Herolo Weather Task</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="responsive-navbar-nav">
                <Nav onSelect={HandleSelect} className="mr-auto" style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Nav.Link eventKey="Color">Color</Nav.Link>
                    <Nav.Link eventKey="Home">Home</Nav.Link>
                    <Nav.Link eventKey="Favorites">Favorites</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;