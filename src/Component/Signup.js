import React, { useRef, useState, memo } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link } from "react-router-dom";

function Signup() {
  const { currentUser, signup } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(currentUser);
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("password doesn't match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(error.message);
      setError("failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* {currentUser && currentUser.email} */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>{" "}
            <br></br>
            <Button className="w-100" type="submit" disabled={loading}>
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Already have an account?<Link to="/login">Login</Link>
      </div>
    </>
  );
}

export default memo(Signup);
