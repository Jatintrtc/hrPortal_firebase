import { Button, Card, Divider, Input, Row, Col, Table } from "antd";
import { EyeFilled, SearchOutlined } from "@ant-design/icons";
import React from "react";
import "../Feedback/FeedBack.css";
import { useNavigate } from "react-router-dom";

function FeedbackTable() {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "left",
    },
    {
      title: "Employee Code",
      dataIndex: "empCode",
      key: "empCode",
      align: "left",
    },
    {
      title: "Employee Name",
      dataIndex: "empName",
      key: "empName",
      align: "left",
    },
    {
      title: "Feedback Title",
      dataIndex: "feedTitle",
      key: "feedTitle",
      align: "left",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "left",
      render: (_, record) => {
        return (
          <div>
            <EyeFilled style={{ fontSize: "17px", color: "#707070" }} />
          </div>
        );
      },
    },
  ];

  const FeedbackTable = [
    {
      key: "1",
      date: "Date",
      empCode: "Employee Code",
      empName: "Employee Name",
      feedTitle: "Feedback Title",
      align: "center",
    },
    {
      key: "2",
      date: "Date",
      empCode: "Employee Code",
      empName: "Employee Name",
      feedTitle: "Feedback Title",
    },
    {
      key: "3",
      date: "Date",
      empCode: "Employee Code",
      empName: "Employee Name",
      feedTitle: "Feedback Title",
    },
    {
      key: "4",
      date: "Date",
      empCode: "Employee Code",
      empName: "Employee Name",
      feedTitle: "Feedback Title",
    },
  ];

  return (
    <>
      <Card
        className="feedBackCard"
        style={{
          margin: "30px",
          background: "#FFFFFF",
          border: "1px solid #C0C0C0",
          borderRadius: "5px",
          height: "902px",
        }}
      >
        <h5
          style={{
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "32px",
            lineHeight: "32px",
            color: "#707070",
            margin: "30px",
          }}
        >
          Feedback
        </h5>
        <Divider style={{ border: "0.5px inset rgb(240 232 232)" }} />
        <div style={{ margin: "30px" }}>
          <Row>
            <Col xs={24} xm={24} md={17}>
              <Input
                key="empSearch"
                className="empSearch"
                style={{ marginLeft: "10px" }}
                placeholder="Search for Employee"
                suffix={<SearchOutlined />}
                //   onChange={searchData}
              />
            </Col>
            <Col xs={24} xm={24} md={3}>
              <Button className="previewSur">Preview Servey</Button>
            </Col>
            <Col xs={24} xm={24} md={3}>
              <Button
                className="configSur"
                onClick={() => navigate("/ConfigSurvey")}
              >
                Configuration Survey
              </Button>
            </Col>
          </Row>
          <Table
            className="feebBackTable"
            columns={columns}
            dataSource={FeedbackTable}
          />
        </div>
      </Card>
    </>
  );
}

export default FeedbackTable;
