import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useContext(AuthContext);
  const navigate=useNavigate()

  //await logout when it finishes it will navigate to login page
  async function handleLogout() {
    setError("")
    try {
        await logout()
        navigate("/login")
    } catch (error) {
        setError("failed to log out")
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>{" "}
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
