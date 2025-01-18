import React, { useState } from "react";
import axios from "axios";
import { Form, Alert, Button, Col, Row, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";
import Image from "react-bootstrap/Image";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      setSuccessMessage("Sign in successful! Redirecting...");
      setTimeout(() => {
        history.goBack();
      }, 2000);
    } catch (err) {
      setErrors(err.response?.data);
      setSuccessMessage("");
    }
  };

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container className={styles.Row}>
      <Row className="align-items-center">
        <Col md={6} className="p-4">
          <Container className={`${appStyles.Content} p-4`}>
            <h1 className={styles.Header}>Sign In</h1>
            <div className={styles.formWrapper}>
              {successMessage && (
                <Alert variant="success" className="mb-3">
                  {successMessage}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label className="d-none">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    className={styles.Input}
                    value={username}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

                <Form.Group controlId="password">
                  <Form.Label className="d-none">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    className={styles.Input}
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.password?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}
                <Button
                  className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                  type="submit"
                >
                  Sign In
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                  </Alert>
                ))}
              </Form>
            </div>
          </Container>
          <Container className={`mt-3 ${appStyles.Content}`}>
            <Link className={styles.Link} to="/signup">
              Don't have an account? <span>Sign up now!</span>
            </Link>
          </Container>
        </Col>
        <Col md={6} className="text-center">
          <Image
            className={`${appStyles.FillerImage} ${styles.SmallImage}`}
            src={
              "https://res.cloudinary.com/ddbihgvkh/image/upload/v1736271630/signin_signup_nyg44v.webp"
            }
            alt="Sign In Illustration"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SignInForm;
