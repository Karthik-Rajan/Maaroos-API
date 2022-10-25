import React, { useState, useEffect } from "react";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import FontAwesome from "./common/FontAwesome";
import awsConfig from "../awsConfig";

function Login() {
  Amplify.configure(awsConfig);
  const NOTSIGNIN = "You are NOT logged in";
  const SIGNEDIN = "You have logged in successfully";
  const SIGNEDOUT = "You have logged out successfully";
  const WAITINGFOROTP = "Enter OTP number";
  const VERIFYNUMBER = "Verifying number (Country code +XX needed)";

  const [message, setMessage] = useState("Welcome to Demo");
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const password = Math.random().toString(10) + "Abc#";
  useEffect(() => {
    verifyAuth();
  }, []);
  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        setMessage(SIGNEDIN);
        setSession(null);
      })
      .catch((err) => {
        console.error(err);
        setMessage(NOTSIGNIN);
      });
  };
  const signOut = () => {
    if (user) {
      Auth.signOut();
      setUser(null);
      setOtp("");
      setMessage(SIGNEDOUT);
    } else {
      setMessage(NOTSIGNIN);
    }
  };
  const signIn = () => {
    setMessage(VERIFYNUMBER);
    Auth.signIn(number)
      .then((result) => {
        setSession(result);
        setMessage(WAITINGFOROTP);
      })
      .catch((e) => {
        if (e.code === "UserNotFoundException") {
          signUp();
        } else if (e.code === "UsernameExistsException") {
          setMessage(WAITINGFOROTP);
          signIn();
        } else {
          console.log(e.code);
          console.error(e);
        }
      });
  };
  const signUp = async () => {
    const result = await Auth.signUp({
      username: number,
      password,
      attributes: {
        phone_number: number,
      },
    }).then(() => signIn());
    return result;
  };
  const verifyOtp = () => {
    Auth.sendCustomChallengeAnswer(session, otp)
      .then((user) => {
        setUser(user);
        setMessage(SIGNEDIN);
        setSession(null);
      })
      .catch((err) => {
        setMessage(err.message);
        setOtp("");
        console.log(err);
      });
  };
  return (
    <Container fluid className="bg-white">
      <Row>
        <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
        <Col md={8} lg={6}>
          <div className="login d-flex align-items-center py-5">
            <Container>
              <Row>
                <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                  <h1 className="login-heading mb-4">Welcome back!</h1>
                  <h6 className="mb-2">Good to see you again!!</h6>
                  <br />
                  <Form>
                    <div className="form-label-group">
                      <Form.Control
                        type="phone"
                        id="inputEmail"
                        placeholder="Mobile Number"
                      />
                      <Form.Label htmlFor="inputEmail">
                        Mobile Number
                      </Form.Label>
                    </div>
                    {/* <div className="form-label-group">
                      <Form.Control
                        type="password"
                        id="inputPassword"
                        placeholder="Password"
                      />
                      <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    </div> */}
                    {/* <Form.Check
                      className="mb-3"
                      custom
                      type="checkbox"
                      id="custom-checkbox"
                      label="Remember password"
                    /> */}
                    <Link
                      to=""
                      className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      onClick={signIn}
                    >
                      Send OTP
                    </Link>
                    <div className="text-center pt-3">
                      Don’t have an account?{" "}
                      <Link className="font-weight-bold" to="/register">
                        Sign Up
                      </Link>
                    </div>
                    <hr className="my-4" />
                    <p className="text-center">LOGIN WITH</p>
                    <div className="row">
                      <div className="col pr-2">
                        <Button
                          className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                          type="submit"
                        >
                          <FontAwesome icon="google" className="mr-2" /> Google
                        </Button>
                      </div>
                      <div className="col pl-2">
                        <Button
                          className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase"
                          type="submit"
                        >
                          <FontAwesome icon="facebook" className="mr-2" />{" "}
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Login;
