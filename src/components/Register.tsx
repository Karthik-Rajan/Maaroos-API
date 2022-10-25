import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form } from "react-bootstrap";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import awsConfig from "../awsConfig";
import { verify } from "crypto";

function Register() {
  Amplify.configure(awsConfig);
  const NOTSIGNIN = "You are NOT logged in";
  const SIGNEDIN = "You have logged in successfully";
  const SIGNEDOUT = "You have logged out successfully";
  const OTPSENT = "OTP has sent to your number";
  const NOUSER = "You are not registered";
  const WRONGOTP = "OTP is incorrect";
  const USEREXISTS = "User already exists";
  const UNKNOWNERR = "Oops, Something went wrong. Please try again.";
  const VERIFYNUMBER = "Verifying number (Country code +XX needed)";

  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const password = Math.random().toString(10) + "Abc#";

  const signIn = () => {
    Auth.signIn(number)
      .then((result) => {
        console.log("Debugging");
        console.log(result);
        setSession(result);
        setInfo(OTPSENT);
        setMessage("");
      })
      .catch((e) => {
        setInfo("");
        if (e.code === "UserNotFoundException") {
          setMessage(NOUSER);
        } else if (e.code === "UsernameExistsException") {
          setMessage(USEREXISTS);
        } else {
          setMessage(UNKNOWNERR);
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
    })
      .then(() => signIn())
      .catch((e) => {
        setInfo("");
        if (e.code === "UserNotFoundException") {
          setMessage(NOUSER);
        } else if (e.code === "UsernameExistsException") {
          setMessage(USEREXISTS);
          //signIn();
        } else {
          setMessage(UNKNOWNERR);
        }
      });
    return result;
  };

  const verifyOtp = () => {
    console.log(session, otp);
    Auth.sendCustomChallengeAnswer(session, otp)
      .then((user) => {
        setUser(user);
        setSession(null);
      })
      .catch((err) => {
        setInfo("");
        setMessage(WRONGOTP);
        setOtp("");
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
                  <h3 className="login-heading mb-4">Hey, New Buddy!</h3>
                  <Form>
                    <div className="form-label-group">
                      <Form.Control
                        type="mobile"
                        id="inputEmail"
                        placeholder="Mobile Number"
                        onChange={(event: any) => setNumber(event.target.value)}
                      />
                      <Form.Label htmlFor="inputEmail">
                        Mobile Number
                      </Form.Label>
                    </div>

                    {session ? (
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="inputPassword"
                          placeholder="OTP"
                          onChange={(event: any) => {
                            setOtp(event.target.value);
                          }}
                        />
                        <Form.Label htmlFor="inputPassword">OTP</Form.Label>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* <div className="form-label-group mb-4">
	                                 <Form.Control type="text" id="inputPromo" placeholder="Promocode" />
	                                 <Form.Label htmlFor="inputPromo">Promocode</Form.Label>
	                              </div> */}
                    <span id="signUpErr">{message}</span>
                    <span id="signUpInfo">{info}</span>
                    {!session ? (
                      <Link
                        to=""
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        onClick={signUp}
                      >
                        Send OTP
                      </Link>
                    ) : (
                      <Link
                        to=""
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        onClick={verifyOtp}
                      >
                        Verify OTP
                      </Link>
                    )}
                    {session ? (
                      <Link className="" to="">
                        Resend OTP in 3 mins
                      </Link>
                    ) : (
                      ""
                    )}
                    <div className="text-center pt-3">
                      Already have an account?{" "}
                      <Link className="font-weight-bold" to="/login">
                        Sign In
                      </Link>
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

export default Register;
