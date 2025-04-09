import React, { useState, useEffect, use } from "react";
import {
  Table,
  Tag,
  Card,
  Typography,
  Space,
  Button,
  Modal,
  Input,
  Select,
  message,
  Tooltip,
  Col,
  Row,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UserAddOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { MdAssignmentAdd } from "react-icons/md";
import usePostApi from "../../hooks/usePostApi";
import useAxios from "../../hooks/useAxios";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { confirm } = Modal;
const { Option } = Select;

const WeightProcess = () => {
  const { data, error, postData, loading } = usePostApi("/weight");
  const DashboardDatas = useAxios();
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [allData, setAllData] = useState([]);
  const [dataa, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await postData({
        url: "/weight",
        method: "GET",
      });
      if (res) {
        // console.log("Weight data:", res);
        setChartData(res);
      }
    } catch (error) {
      console.error("Error fetching weight data:", error);
    }
  };

  const fetchWeightData = async () => {
    try {
      const res = await DashboardDatas.execute({
        url: "dashboard",
        method: "GET",
      });
      if (res) {
        setData(res?.weightHistory);
        setAllData(res);
        // console.log("Dashboard data:", res);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchWeightData();
  }, []);

  useEffect(() => {
    if (chartData && chartData.length) {
      const sortedData = [...chartData]
        .filter((item) => item.weight !== undefined)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const categories = sortedData.map((item) =>
        dayjs(item.date).format("DD MMM")
      );

      const weights = sortedData.map((item) => item.weight);

      setChartOptions({
        chart: {
          type: "line",
          height: 300,
          toolbar: { show: false },
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        xaxis: {
          categories: categories,
        },
        markers: {
          size: 5,
          colors: ["#000"],
        },
        tooltip: {
          enabled: true,
        },
      });

      setChartSeries([
        {
          name: "Weight",
          data: weights,
        },
      ]);
    }
  }, [chartData]);

  return (
    <Card
      style={{
        margin: "20px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={5} style={{ textAlign: "start", marginBottom: "20px" }}>
        Weight Process
      </Title>

      <div style={{ padding: 24 }}>
        <Row gutter={[16, 16]}>
          {/* Chart */}
          <Col xs={24} md={16}>
            <Card
              title="Weight Progress"
              style={{ height: "100%" }}
              loading={loading}
            >
              {/* <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={300}
              /> */}
              {chartSeries.length > 0 && (
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  height={300}
                />
              )}
            </Card>
          </Col>

          {/* Right Section Cards */}
          <Col xs={24} md={8}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card loading={loading}>
                  <Text strong>BMI</Text>
                  <Title level={2}>{allData?.bmi || 0}</Title>
                  <Text type="secondary">+20% month over month</Text>
                </Card>
              </Col>
              <Col span={24}>
                <Card loading={loading}>
                  <Text strong>Weight Goal</Text>
                  <Title level={2}>{allData?.weightGoal || 0} kg</Title>
                  <Text type="secondary">+20% month over month</Text>
                </Card>
              </Col>
              <Col span={24}>
                <Card loading={loading}>
                  <Text strong>Start date</Text>
                  <Title level={2}>
                    {allData?.startDate?.slice(0, 10) || ""}
                  </Title>
                  <Text type="secondary">+20% month over month</Text>
                </Card>
              </Col>
              <Col span={24}>
                <Card loading={loading}>
                  <Text strong>Total Lost</Text>
                  <Title level={2}>10 kg</Title>
                  <Text type="secondary">+20% month over month</Text>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default WeightProcess;
