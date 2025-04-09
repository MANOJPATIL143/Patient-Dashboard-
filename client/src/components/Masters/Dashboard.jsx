import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Select,
  Button,
  DatePicker,
  Card,
  Space,
  Typography,
  Flex,
  Input,
  Form,
  Tabs,
  Tooltip,
  Modal,
  message,
  Col,
  Row,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaRegEdit } from "react-icons/fa";
import TaskForm from "../forms/TaskListForm";
import TaskForm1 from "../forms/TaskForm1";
import usePostApi from "../../hooks/usePostApi";
import useAxios from "../../hooks/useAxios";
import io from "socket.io-client";
import WeightModelForm from "../model/WeightModelForm";

const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const socket = io("http://localhost:5000");

const Dashboard = () => {
  const { data, error, postData } = usePostApi("tasks/deleteTask");
  const DashboardDatas = useAxios();
  const UpadateWeight = useAxios();

  const [tasks, setTasks] = useState([]);
  const [dataa, setData] = useState([]);
  const [shippedData, setShippedData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [action, setAction] = useState("entry");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    weightHistory: [{ weight: 60 }],
    weightGoal: 55,
    bmi: 24.5,
    weightLosstillnow: 5,
  });

  const DashboardData = async () => {
    setLoading(true);
    try {
      const req = { status: "", priority: "", dueDate: "" };
      const res = await DashboardDatas.execute({
        url: "dashboard",
        method: "GET",
      });
      if (res) {
        setData(res?.weightHistory);
        setShippedData(res?.nextShipment);
        setAllData(res);
        console.log("Dashboard data:", res);

        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    DashboardData();
  }, []);

  // useEffect(() => {
  //   socket.on("taskDeleted", (deletedTaskId) => {
  //     console.log("Task deleted:", deletedTaskId);
  //     setTasks((prevTasks) =>
  //       prevTasks.filter((task) => task.id !== deletedTaskId)
  //     );
  //   });
  //   return () => {
  //     socket.off("taskDeleted");
  //   };
  // }, [setTasks]);

  const handleSubmit = async (updatedUser) => {
    console.log("Updated User Data:", updatedUser);
    setLoading(true);
    try {
      const res = await UpadateWeight.execute({
        url: "dashboard/updateDashboard",
        method: "POST",
        data: {
          currentWeight: updatedUser.weightHistory[0].weight,
          weightGoal: updatedUser.weightGoal,
          bmi: updatedUser.bmi,
          weightloss: updatedUser.weightLosstillnow,
          date: new Date(),
        },
      });
      if (res) {
        setLoading(false);
        DashboardData();
        setIsModalOpen(false);
        message.success("Weight updated successfully!");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <Card style={{ margin: "20px auto", borderRadius: "10px" }}>
      <Title level={5} style={{ textAlign: "start", marginBottom: 0 }}>
        Dashboard
      </Title>

      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Update Weight
      </Button>

      <div style={{ padding: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card loading={loading}>
              <Text strong>Current Weight</Text>
              <Title level={2}>
                {dataa[dataa.length - 1]?.weight || 0}
                Kg
              </Title>
              <Text type="secondary">-20% month over month</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card loading={loading}>
              <Text strong>Next Shipment Date</Text>
              <Title level={2}>
                {shippedData[0]?.shipmentDate?.slice(0, 10) || "No Shipment"}
              </Title>
              <Text type="secondary">
                {shippedData[0]?.status || "No Shipment"}
              </Text>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card loading={loading}>
              <Text strong>Progress</Text>
              <Title level={2}>0 Kg</Title>
              <Text type="secondary">Down Weight In This Month</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card loading={loading}>
              <Text strong>Start Date</Text>
              <Title level={2}>{allData?.startDate?.slice(0, 10) || ""}</Title>
              <Text type="secondary">Started</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card loading={loading}>
              <Text strong>BMI</Text>
              <Title level={2}>{allData?.bmi || 0}</Title>
              <Text type="secondary">-20% month over month</Text>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card loading={loading}>
              <Text strong>Weight Goal</Text>
              <Title level={2}>{allData?.weightGoal || 0} Kg</Title>
              <Text type="secondary">You Will Make soon</Text>
            </Card>
          </Col>

          {/* <Col xs={24}>
            <Card>
              <Text strong>Start Date</Text>
              <Title level={2}>Feb 10, 2025</Title>
              <Text type="secondary">Started</Text>
            </Card>
          </Col> */}
        </Row>
      </div>

      {/* <Tabs
        activeKey={activeTabKey}
        onChange={(key) => {
          setActiveTabKey(key);
          TabChange(key);
        }}
        centered
      >
        <TabPane tab="Task Details" key="1">
          <Card
            style={{
              marginBottom: 0,
              borderRadius: "8px",
              background: "#f9f9f9",
              padding: "0px",
            }}
          >
            <Space gap="small" wrap="wrap" justify="center">
              <Select
                defaultValue="All"
                style={{ width: 150 }}
                onChange={setFilterStatus}
                placeholder="Filter by Status"
              >
                <Option value="All">All Status</Option>
                <Option value="To Do">To Do</Option>
                <Option value="In Progress">In Progress</Option>
                <Option value="Done">Done</Option>
              </Select>

              <Select
                defaultValue="All"
                style={{ width: 150 }}
                onChange={setFilterPriority}
                placeholder="Filter by Priority"
              >
                <Option value="All">All Priority</Option>
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>

              <DatePicker
                style={{ width: 150 }}
                onChange={setFilterDueDate}
                placeholder="Filter by Due Date"
              />
            </Space>
          </Card>

          <Table
            dataSource={filteredTasks}
            columns={columns}
            loading={loading}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
            style={{ borderRadius: "8px", overflow: "hidden" }}
          />
        </TabPane>

        <TabPane tab="Add Task" key="2">
          {action == "update" ? (
            <TaskForm
              action={action}
              initialValues={currentTask}
              onCancel={handleCancel}
              tabCHange={tabCHange}
            />
          ) : (
            <TaskForm1
              handleCancel={handleCancel}
              setActiveTabKey={setActiveTabKey}
              onSubmit={TasskLists}
            />
          )}
        </TabPane>
      </Tabs> */}

      <WeightModelForm
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={user}
      />
    </Card>
  );
};

export default Dashboard;
