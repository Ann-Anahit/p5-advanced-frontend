import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import { useHistory } from "react-router-dom";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const history = useHistory();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();
    const [showModal, setShowModal] = useState(false);

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            removeTokenTimestamp();
            setShowModal(false);
            history.push("/");
        } catch (err) {
            console.error("Error during sign out:", err);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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
            <NavLink
                className={styles.NavLink}
                to="#"
                onClick={handleShowModal}
            >
                <i className="fas fa-sign-out-alt"></i>Sign out
            </NavLink>

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

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Sign Out</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to sign out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NavBar;
