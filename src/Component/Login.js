import React, { useRef, useState, memo } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";


function Login() {
  const { login } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
const navigate=useNavigate()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/")
    } catch (error) {
      console.log(error.message);
      setError("failed to Login");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in</h2>
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
<br></br>
            <Button className="w-100" type="submit" disabled={loading}>
              Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forget-password">Forget Password?</Link></div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2"><Link to="/signup">Need a new Account?</Link></div>
    </>
  );
}

export default memo(Login);
