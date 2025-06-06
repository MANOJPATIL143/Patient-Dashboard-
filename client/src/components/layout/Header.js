
import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
  Input,
  Drawer,
  Typography,
  Switch,
  Tooltip,
  message,
  Menu
} from "antd";
import { IoMdLogOut } from "react-icons/io";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import avtar from "../../assets/images/team-2.jpg";
import usePostApi from "../../hooks/usePostApi";
import { io } from "socket.io-client";
import { BellOutlined } from "@ant-design/icons";

const socket = io("http://localhost:5000");

const bell = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
      fill="#111827"
    ></path>
    <path
      d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
      fill="#111827"
    ></path>
  </svg>,
];

const wifi = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 107 107"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fillRule="evenodd"
    >
      <g id="logo-spotify" fill="#2EBD59" fillRule="nonzero">
        <path
          d="M53.5,0 C23.9517912,0 0,23.9517912 0,53.5 C0,83.0482088 23.9517912,107 53.5,107 C83.0482088,107 107,83.0482088 107,53.5 C107,23.9554418 83.0482088,0.00365063118 53.5,0 Z M78.0358922,77.1597407 C77.0757762,78.7368134 75.0204708,79.2296486 73.4506994,78.2695326 C60.8888775,70.5922552 45.0743432,68.8582054 26.4524736,73.1111907 C24.656363,73.523712 22.8675537,72.3993176 22.458683,70.6032071 C22.0461617,68.8070966 23.1669055,67.0182873 24.9666667,66.6094166 C45.3444899,61.9548618 62.8273627,63.9590583 76.9297509,72.5745479 C78.4995223,73.5419652 78.9996588,75.5899693 78.0358922,77.1597407 L78.0358922,77.1597407 Z M84.5814739,62.5973729 C83.373115,64.5614125 80.8030706,65.1747185 78.8426817,63.9700102 C64.4664961,55.1318321 42.5408052,52.5727397 25.5325145,57.7347322 C23.3275333,58.4027977 20.9984306,57.1579324 20.3267144,54.9566018 C19.6622996,52.7516206 20.9071648,50.4261685 23.1084954,49.7544524 C42.5371546,43.858683 66.6933811,46.7134766 83.2051859,56.8622313 C85.1692255,58.0705902 85.7898328,60.636984 84.5814739,62.5973729 Z M85.1436711,47.4253497 C67.8980894,37.1853292 39.4523712,36.2434664 22.9880246,41.2375299 C20.3449676,42.0406687 17.5485841,40.5475606 16.7490959,37.9045036 C15.9496076,35.2614466 17.4390652,32.4650631 20.0857728,31.6619243 C38.9850904,25.9267827 70.3987718,27.0329239 90.2509041,38.8171614 C92.627465,40.2299556 93.4087001,43.3001365 91.9995565,45.6730467 C90.5940635,48.0532583 87.5165814,48.838144 85.1436711,47.4253497 Z"
          id="Shape"
        ></path>
      </g>
    </g>
  </svg>,
];

const credit = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fill="#1890FF"
      d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
    ></path>
    <path
      fill="#1890FF"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
    ></path>
  </svg>,
];

const clockicon = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z"
      fill="#111827"
    ></path>
  </svg>,
];

const data = [
  {
    title: "New message from Sophie",
    description: <>{clockicon} 2 days ago</>,

    avatar: avtar,
  },
  {
    title: "New album by Travis Scott",
    description: <>{clockicon} 2 days ago</>,

    avatar: <Avatar shape="square">{wifi}</Avatar>,
  },
  {
    title: "Payment completed",
    description: <>{clockicon} 2 days ago</>,
    avatar: <Avatar shape="square">{credit}</Avatar>,
  },
];

const menu = (
  <List
    min-width="100%"
    className="header-notifications-dropdown "
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape="square" src={item.avatar} />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

function Header({
  placement,
  name,
  subName,
  onPress,
  handleSidenavColor,
  handleSidenavType,
  handleFixedNavbar,
}) {
  const { Title, Text } = Typography;
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");
  const { data, loading, error, postData } = usePostApi('auth/logout');

  useEffect(() => window.scrollTo(0, 0));

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server:", socket.id);
    });

    socket.on("taskCreated", (task) => {
      console.log("New task created:", task);
      setNotifications((prev) => [...prev, { type: "Task Created", title: task.title }]);
    });

    socket.on("TaskUpdated", (task) => {
      console.log("Task updated:", task);
      setNotifications((prev) => [...prev, { type: "Task Updated", title: task.title }]);
    });

    socket.on("taskDeleted", (taskId) => {
      console.log("Task deleted:", taskId);
      setNotifications((prev) => [...prev, { type: "Task Deleted", title: `Task ID: ${taskId}` }]);
    });

    return () => {
      socket.off("taskCreated");
      socket.off("TaskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const menu = (
    <Menu>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Menu.Item key={index}>
            <strong>{notification.type}:</strong> {notification.title}
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>No new notifications</Menu.Item>
      )}
    </Menu>
  );


  const HandleLogOut = async () => {
    try {
      const res = await postData();
      if (res) {
        message.open({
          type: 'success',
          content: 'LogOut Successfully',
        });
        sessionStorage.clear();
      }
    } catch (error) {
      message.open({
        type: 'error',
        content: 'Logout Failed. Please try again.',
      });
    }
  };


  const showDrawer = () => setVisible(true);
  const hideDrawer = () => setVisible(false);



  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb disabled>
            <Breadcrumb.Item>
              <NavLink to="/" disabled>Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading" disabled>
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>

        <Col span={24} md={18} className="header-control">
          
          {/* <Button
            type="link"
            className="sidebar-toggler" 
            onClick={() => onPress()}
          >
           
            <IoMdLogOut />
          </Button> */}

          <Badge size="small" count={notifications.length}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <BellOutlined style={{ fontSize: "24px" }} />
              </a>
            </Dropdown>
          </Badge>

          <Tooltip title="Profile">
            <Link to="/profile" className="btn-sign-in">
              {profile}
              {/* <span>Profile</span> */}
            </Link>
          </Tooltip>

        </Col>
      </Row>
    </>
  );
}

export default Header;
