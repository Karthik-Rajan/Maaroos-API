import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  InputGroup,
  Modal,
  ButtonToolbar,
  Button,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

const ForgotForm = (props: any) => {
  return (
    <Form
      ref={props.forgotForm}
      id="signInForm"
      onSubmit={props.handleSubmit(props.onForgotFormSubmit)}
    >
      <div className="form-row">
        <Form.Group className="col-md-12">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="+9190*****738"
            {...props.register("mobile", { required: true })}
          />
        </Form.Group>
        <Form.Group className="col-md-12">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Min 8 length"
            {...props.register("password", {
              required: true,
              min: 8,
              pattern: /^[\S]+.*[\S]+$/,
            })}
          />
        </Form.Group>
      </div>
      <div className="pt-3">
        <Link
          className="font-weight-bold"
          to=""
          onClick={() => {
            props.reset();
          }}
        >
          {props.signIn ? "Forgot your password? " : " "}
        </Link>
      </div>
    </Form>
  );
};
export default ForgotForm;
