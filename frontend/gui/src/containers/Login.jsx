import React from "react";
import { Form, Icon, Input, Button, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import "./Authentication.scss";

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.userName, values.password);
        this.props.history.push("/");
      }
    });
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        {errorMessage}
        {this.props.loading ? (
          <Spin />
        ) : (
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
              <Button type="primary" 
                      shape="round"  
                      style={{ background: "rgba(50, 168, 64)", border: "rgba(50, 168, 64)" }}
                      htmlType="submit">
                Войти
              </Button>
              <NavLink to="/signup/"
                       style={{ color: "rgba(50, 168, 64)"}}
              >зарегистрироваться</NavLink>
            </FormItem>
          </Form>
        )}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Login);

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
