import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export default function Navigation() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="dark">
            <Navbar.Brand>
                <NavLink className="navigation__link logo" to="/">
                    <img src="/agua-36-36.png" className="d-inline-block align-middle" alt="logo" />
                </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto navigation--custom">
                    <NavItem>
                        <NavLink exact activeClassName="active-link" className="navigation__link" to="/">Schedule page</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact activeClassName="active-link" className="navigation__link" to="/dance-move-page">Dance page</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact activeClassName="active-link" className="navigation__link" to="/group-list-page">Group page</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact activeClassName="active-link" className="navigation__link" to="/registration-page">Registration page</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact activeClassName="active-link" className="navigation__link" to="/profile-page">Profile page</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact activeClassName="active-link" className="navigation__link" to="/payment-page">Payment page</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact activeClassName="active-link" className="navigation__link" to="/members-page">Members page</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact activeClassName="active-link" className="navigation__link" to="/attendance-page">Attendance page</NavLink>
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}