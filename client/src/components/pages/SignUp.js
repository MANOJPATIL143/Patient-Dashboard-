
import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  message
} from "antd";
import { Link } from "react-router-dom";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import usePostApi from "../../hooks/usePostApi";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;


const SignUp = () => {
  const { data, loading, error, postData } = usePostApi('auth/register');
  const history = useHistory();

  const onFinish = async (values) => {
    const requestBody = { name: values.Name, email: values.email, password: values.password };
    const response = await postData(requestBody);
    if (response) {
      console.log(response);
      sessionStorage.setItem("token", response.token);
      message.open({
        type: 'success',
        content: 'Registered Successfully',
      });
      history.push("/login");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="layout-default ant-layout layout-sign-up" style={{ marginTop: "15%" }}>

      <Content className="p-0">


        <Card
          className="card-signup header-solid h-full ant-card pt-0"
          title={<h5>Register</h5>}
          bordered={false}
        >
          <div className="text-center">
            <Title level={4} className="mb-0">Create an account</Title>
            <span className="text-center text-muted" level={5}>Enter your email to sign up for this app</span>
          </div>

          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="row-col"
          >
            <Form.Item
              name="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button style={{ width: "100%", backgroundColor: "black" }} type="primary" htmlType="submit">
                SIGN UP
              </Button>
            </Form.Item>
          </Form>

          <p className="font-semibold text-muted text-center">
            By clicking continue, you agree to our{" "}
            <Link to="/sign-in" className="font-bold text-dark" disabled>
              {" "} Terms of Service{" "}
            </Link>
            and Privacy{" "}
            <Link to="/sign-in" className="font-bold text-dark" disabled>
              Policy
            </Link>
          </p>
          {/* By clicking continue, you agree to our Terms of Service and Privacy Policy */}

          <p className="font-semibold text-muted text-center">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-bold text-dark">
              Sign In
            </Link>
          </p>
        </Card>
      </Content>

      <Footer>
        <Menu mode="horizontal">
          <Menu.Item>Company</Menu.Item>
          <Menu.Item>About Us</Menu.Item>
          <Menu.Item>Teams</Menu.Item>
          <Menu.Item>Products</Menu.Item>
          <Menu.Item>Blogs</Menu.Item>
          <Menu.Item>Pricing</Menu.Item>
        </Menu>
        <Menu mode="horizontal" className="menu-nav-social">
          <Menu.Item>
            <Link to="#">
              <DribbbleOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="#">
              <TwitterOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="#">
              <InstagramOutlined />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="#">
              <GithubOutlined />
            </Link>
          </Menu.Item>
        </Menu>
      </Footer>
    </div>
  );
};

export default SignUp;
