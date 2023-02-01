import React, { useRef, useState, memo } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const { resetPassword } = useContext(AuthContext);
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //temp mail to reset the new password
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check you inbox for future instructions");
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
          <h2 className="text-center mb-4">Forget Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
<br></br>
            <Button className="w-100" type="submit" disabled={loading}>
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Return Back</Link>
          </div>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Link to="/signup">Need a new Account?</Link>
      </div>
    </>
  );
}

export default memo(ForgetPassword);
