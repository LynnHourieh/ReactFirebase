import { Container } from "react-bootstrap";
import Signup from "./Component/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import PrivateRoute from "./Component/PrivateRoute";
import ForgetPassword from "./Component/ForgetPassword";
import UpdateProfile from "./Component/UpdateProfile";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Routes>
                <Route exact path="/" element={<PrivateRoute/>} >
                  <Route exact path="/" element={<Dashboard/>} />
                </Route>
                <Route exact path="/update-profile" element={<PrivateRoute/>} >
                  <Route exact path="/update-profile" element={<UpdateProfile/>} />
                </Route>
           
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/forget-password" element={<ForgetPassword/>} />
               
              </Routes>
              
            </div>
          </Container>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
