import React, { Component } from "react";
import "./Login.css";
import { Form, Icon, Input, Button, message } from "antd";
import md5 from "js-md5";
import axios from "../axios/http";
import { hashHistory } from "react-router";
import domain from "./domain";

const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios
          .post("api/Admin/Login", {
            Name: values.userName,
            Password: md5(values.password)
          })
          .then(function(data) {
            message.success("登录成功", 2);
            domain.setCookie("token", data.Result);
            domain.setCookie("username", values.userName);
            setTimeout(() => {
              hashHistory.push("/");
            }, 2000);
          })
          .catch();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </FormItem>
        </Form>
        <canvas id="c_n15" width="1220" height="828" />
      </div>
    );
  }
}

// const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default Form.create()(Login);
