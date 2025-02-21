import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const addPostIcon = (
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/posts/create"
        >
            <i className="far fa-plus-square"></i>Add post
        </NavLink>
    );

    const addEventIcon = (
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/event/create"
        >
            <i className="fas fa-calendar-plus"></i>Add event
        </NavLink>
    );

    const EventIcon = (
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/event/"
        >
            <i className="fas fa-calendar-alt"></i>Events
        </NavLink>
    );

    const MyEventsIcon = (
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/my-events"
        >
            <i className="fas fa-calendar-check"></i>My Events
        </NavLink>
    );

    const loggedInIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/feed"
            >
                <i className="fas fa-stream"></i>Feed
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/liked"
            >
                <i className="fas fa-heart"></i>Liked
            </NavLink>
            {EventIcon}
            {MyEventsIcon}
            <NavLink
                className={styles.NavLink}
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
            </NavLink>
        </>
    );

    const loggedOutIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signin"
            >
                <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink
                to="/signup"
                className={styles.NavLink}
                activeClassName={styles.Active}
            >
                <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
        </>
    );

    return (
        <>
            <Navbar
                expanded={expanded}
                className={styles.NavBar}
                expand="md"
                fixed="top"
            >
                <Container>
                    <NavLink to="/">
                        <Navbar.Brand>
                            <img src={logo} alt="logo" height="45" />
                        </Navbar.Brand>
                    </NavLink>
                    {currentUser && addPostIcon}
                    {currentUser && addEventIcon}
                    <Navbar.Toggle
                        ref={ref}
                        onClick={() => setExpanded(!expanded)}
                        aria-controls="basic-navbar-nav"
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto text-left">
                            <NavLink
                                exact
                                className={styles.NavLink}
                                activeClassName={styles.Active}
                                to="/"
                            >
                                <i className="fas fa-home"></i>Home
                            </NavLink>
                            {currentUser ? loggedInIcons : loggedOutIcons}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
