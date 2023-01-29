import React, { useRef, useState, memo } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function UpdateProfile() {
  const { currentUser, updateEmail, updatePassword } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRefConfirm = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordRefConfirm.current.value) {
      return setError("Password doesn't match");
    }
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Falied to update password");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordRefConfirm} />
            </Form.Group>
            <br></br>
            <Button className="w-100" type="submit" disabled={loading}>
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/">Cancel</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/signup">Need a new Account?</Link>
      </div>
    </>
  );
}

export default memo(UpdateProfile);
