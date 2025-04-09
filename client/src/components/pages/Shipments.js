import { use, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";
import useAxios from "../../hooks/useAxios";



const { Title, Text } = Typography;


function Shipments() {
  const userRequest = useAxios();
  const medication = useAxios();
  const DashboardDatas = useAxios(userRequest);
  const [allData, setAllData] = useState([]);
  const [shippedData, setShippedData] = useState([]);
  const [medicstionData, setMedicstionData] = useState([]);
  const [loading, setLoading] = useState(false);

  const pastShipmentColumns = [
    {
      title: "Dates",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Delivered",
      dataIndex: "delivered",
      key: "delivered",
    },
  ];

  const pastShipmentData = [
    {
      key: "1",
      date: "March 10, 2025",
      status: "Delivered",
      delivered: "Yes",
    },
  ];

  useEffect(() => {
    DashboardData();
    medicationData();
  }, []);

  const DashboardData = async () => {
    setLoading(true);
    try {
      const res = await DashboardDatas.execute({
        url: "dashboard",
        method: "GET",
      });
      if (res) {
        // setData(res?.weightHistory);
        setShippedData(res?.nextShipment);
        setAllData(res);
        // console.log("Dashboard data:", res)
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
    setLoading(false);
  };

  const medicationData = async () => {
    setLoading(true);
    try {
      const res = await medication.execute({
        url: "medication",
        method: "GET",
      });
      if (res) {
       setMedicstionData(res);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Shipment Details"
            >
              <div style={{ padding: 30 }}>
                {/* Upcoming Shipment */}
                <Card style={{ marginBottom: 16, padding: 20 }} loading={loading}>
                  <Text strong>Upcoming Shipments</Text>
                  <Title level={2} style={{ marginBottom: 0 }}>
                  {shippedData[0]?.shipmentDate?.slice(0, 10) || "No Shipment"}
                  </Title>
                  <Text type="secondary">50 inid</Text>
                </Card>

                {/* Current Medication */}
                <Card style={{ marginBottom: 16, padding: 20 }} loading={loading}>
                  <Text strong>Current Medication</Text>
                  <Row gutter={16} style={{ marginTop: 12 }}>
                    <Col span={12}>
                      <Text type="secondary">Medication</Text>
                      <div>{medicstionData?.name || "No Medication"}</div>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">Frequency</Text>
                      <div>{medicstionData?.frequency || "No Frequency"}</div>
                    </Col>
                  </Row>
                </Card>

                {/* Past Shipments */}
                <Card style={{ padding: 20 }} loading={loading}>
                  <Text strong>Past Shipments</Text>
                  <Table
                    columns={pastShipmentColumns}
                    dataSource={pastShipmentData}
                    pagination={false}
                    style={{ marginTop: 12 }}
                  />
                </Card>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Shipments;
