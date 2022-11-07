import { Col, Divider, Row } from "antd";
import React from "react";
import hutechlogo from "../images/hutechlogo.png";
import imageavailable from "../images/imageavailable.png";

function ViewModal() {
  return (
    <div>
      <h3 style={{ fontWeight: "600", fontSize: "18px", lineheight: "22px" }}>
        Hutech Solutions Pvt. Ltd.
      </h3>
      <Divider />
      <Row gutter={[50, 8]}>
        <Col span={8}>
          <h4
            style={{ fontWeight: "600", fontSize: "16px", lineheight: "20px" }}
          >
            Organization Details
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "17px",
            }}
          >
            <span>Code:EL00675</span>
            <span>CIN:23445633i4</span>
            <span>GSTN:23348968586</span>
            <span>Domain:hutechsolutions.com</span>
          </div>
        </Col>
        <Col span={8}>
          <h4
            style={{ fontWeight: "600", fontSize: "16px", lineheight: "20px" }}
          >
            Organization Access
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "17px",
            }}
          >
            <span>Anisha Mariam</span>
            <span>anisha@hutechsolutions.com</span>
            <span>9875733422</span>
            <span
              style={{
                borderRadius: "10px",
                background: "#C9E5FF",
                width: "101px",
                display: "flex",
                justifyContent: "center",
                color: "#000000",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "7px",
              }}
            >
              HR BP
            </span>
          </div>
        </Col>
        <Col span={8}>
          <h4
            style={{ fontWeight: "600", fontSize: "16px", lineheight: "20px" }}
          >
            Organization Logo
          </h4>
          <div
            style={{
              border: "1px solid #d0d0d0",
              width: "180px",
              height: "90px",
              borderRadius: "6px",
            }}
          >
            <img src={hutechlogo} style={{ width: "132px", margin: "22px" }} />
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "17px",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                fontSize: "16px",
                lineheight: "20px",
              }}
            >
              Address
            </h4>
            <span>N0 387, 6th Cross, 2nd sector, HSR Layout, </span>
            <span>Bangalore, Karnataka, 560068, India +91 93439 27070</span>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "22px",
            }}
          >
            <span>Anisha Mariam</span>
            <span>anisha@hutechsolutions.com</span>
            <span>9875733422</span>
            <span
              style={{
                borderRadius: "10px",
                background: "#C9E5FF",
                width: "101px",
                display: "flex",
                justifyContent: "center",
                color: "#000000",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "7px",
              }}
            >
              HR BP
            </span>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              border: "1px solid #d0d0d0",
              width: "180px",
              height: "90px",
              borderRadius: "6px",
            }}
          >
            <img
              src={imageavailable}
              style={{ margin: "15px", width: "160px" }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ViewModal;
