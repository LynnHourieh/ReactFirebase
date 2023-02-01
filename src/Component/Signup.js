import React, { useRef, useState, memo } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(8, "Password must have at least 8 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null],"Password doesn't match").required(),
});

function Signup() {
  const { register, handleSubmit,  formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { currentUser, signup } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(currentUser);

  async function onSubmit(data,e) {
    e.preventDefault();

    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("password doesn't match");
    // }
    try {
      setError("");
      setLoading(true);
      await signup(data.email, data.password);
    } catch (error) {
      console.log(error.message);
      setError("failed to create an account");
    }
    setLoading(false);
  }
// const onSubmit=(data)=>{console.log(data.email)}
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {/* {currentUser && currentUser.email} */}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register('email')} inputref={emailRef} className={errors.email ? 'error' : ''} />
              
              <p className={errors.email ? 'error-message' : ''}>{errors.email?.message}</p>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                {...register('password')}
                inputref={passwordRef}
                className={errors.email ? 'error' : ''}
              />
                  <p className={errors.email ? 'error-message' : ''}>{errors.password?.message}</p>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                name="PasswordConfirm"
                type="password"
                {...register("confirmPassword")}
                inputref={passwordConfirmRef}
                className={errors.email ? 'error' : ''}
              />
                     <p className={errors.email ? 'error-message' : ''}>{errors.confirmPassword?.message}</p>
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
