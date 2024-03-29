import React, { useState } from "react";
import "antd/dist/antd.css";
import "./ExpenceForm";
import { Col, Divider, Row } from "antd";
import "../style/ExpenseForm.css";
import ExpenseContext from "../contexts/ExpenseContext";
import { useNavigate } from "react-router-dom";
import {
  // Cascader,
  Input,
  Select,
  Radio,
  Space,
  Button,
  DatePicker,
  Form,
  notification,
} from "antd";
import moment from "moment";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const ExpenceForm = () => {
  const [form] = Form.useForm();
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const { TextArea } = Input;
  const navigate = useNavigate();
  const handleListExpense = () => {
    navigate("/Expense/ExpenseList");
  };
  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const onFinish = (values) => {
    const valuesToservice = {
      amount: values["amount"],
      catname: values["expence"],
      date: values["paymentDate"].format("DD-MM-YYYY"),
      description: values["description"] ? values["description"] : null,
      name: values["paidByInput"],
      paidname: values["paidto"],
      quantity: values["Quantity"],
      paymenttype: values["paymentMode"],
      status: "Unpaid",
      subtotal: values["subTotal"],
    };
    ExpenseContext.addExpenses(valuesToservice)
      .then((response) => {
        navigate("/Expense/ExpenseList");
        showNotification("success", "Success", "Expense Added");
      })
      .catch((error) => {});
  };
  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const onReset = () => {
    form.resetFields();
  };
  function disabledDate(current) {
    return current && current > moment().endOf("day");
  }
  return (
    <>
      <div className="expForm" style={{ margin: "15px", background: "white" }}>
        <Form
          form={form}
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row
            className="rowform"
            gutter={[0, 8]}
            style={{
              marginBottom: "1.5rem",
              marginTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignitems: "center",
              justifyContent: "space-around",
            }}
          >
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-center"
              style={{
                background: "",
                height: "50px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                className="listExpense"
                type="primary"
                onClick={handleListExpense}
                style={{
                  width: "120px",
                  cursor: "pointer",
                  backgroundColor: "#1963A6",
                  borderRadius: "5px",
                }}
              >
                Expense List
              </Button>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} className="Col-1-left">
              <Divider orientation="left" orientationMargin={0}>
                Expense Name<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="expence"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter Expense Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={30}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ expence: newVal, expence: caps });
                  }}
                  required
                  placeholder="Enter Expense For"
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} className="Col-1-left">
              <Divider orientation="left" orientationMargin={0}>
                Date<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="paymentDate"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Date",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormatList}
                  style={{ width: "100%" }}
                  disabledDate={disabledDate}
                  placeholder="Choose Date"
                />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 12 }} className="Col-1-left">
              <Divider orientation="left" orientationMargin={0}>
                Paid By<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="paidByInput"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Customer Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={30}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    // setPaidBy(newVal);
                    form.setFieldsValue({ paidByInput: newVal });
                  }}
                  type="text"
                  required
                  placeholder="Enter  Name"
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} className="Col-1-left">
              <Divider orientation="left" orientationMargin={0}>
                Paid to<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="paidto"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Vendor Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={30}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    // setPaidBy(newVal);
                    form.setFieldsValue({ paidto: newVal });
                  }}
                  required
                  placeholder="Enter Vendor Name"
                />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 12 }} className="Col-1-left">
              <Divider orientation="left" orientationMargin={0}>
                Amount<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                className="numder-inputs"
                name="amount"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount",
                    pattern: /^[0-9\b]+$/,
                  },
                  { whitespace: true },
                ]}
              >
                <Input
                  maxLength={8}
                  required
                  onChange={(e) => {
                    const amt = e.target.value;
                    setAmount(amt);
                    setTotal(amt * quantity);
                    form.setFieldsValue({ subTotal: amt * quantity });
                  }}
                  placeholder="Enter Amount Here"
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} className="Col-1-left">
              <Divider orientation="left" orientationMargin={0}>
                Quantity<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="Quantity"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: false,
                    message: "Please enter the quantity ",
                    pattern: /^[0-9\b]+$/,
                  },
                ]}
              >
                <Input
                  maxLength={4}
                  required
                  min={0}
                  onChange={(e) => {
                    const qnt = e.target.value;
                    setQuantity(qnt);
                    setTotal(amount * qnt);
                    form.setFieldsValue({ subTotal: amount * qnt });
                  }}
                  placeholder="Quantity of the item"
                />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 12 }} className="Col-1-left">
              <Divider orientation="left" orientationMargin={0}>
                Mode of Payment<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="paymentMode"
                rules={[
                  {
                    required: true,
                    message: "Please enter the paymeny status",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="Bank"> Bank Transfer </Radio>
                  <Radio value="Cash"> Cash </Radio>
                  <Radio value="UPI"> UPI </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} className="Col-1-left">
              <Divider orientation="left" orientationMargin={0}>
                Subtotal
              </Divider>
              <Form.Item name="subTotal">
                <Input disabled={true} value={total || 0} placeholder="Total" />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={4}></Col>
            <Col className="gutter-row" span={16}>
              <div className="te" style={{ padding: "0px 0" }}>
                <Divider orientation="left" orientationMargin={0}>
                  Descriptions
                </Divider>
                <Form.Item
                  name="description"
                  // rules={[
                  //   {
                  //     required: 'false',
                  //     message: "Please enter the Description ",
                  //   },
                  // ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}></Col>
          </Row>
          <Row gutter={[24, 16]}>
            <Col classsname="gutter-row" span={9}></Col>
            <Col classsname="gutter-row">
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginRight: "94px",
                }}
              >
                <Space>
                  <Form.Item>
                    <Button
                      style={{
                        border: "1px solid #1963A6",
                        color: "#1963A6",
                        width: "99px",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "17px",

                        cursor: "pointer",
                      }}
                      onClick={onReset}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      style={{
                        border: "1px solid #1565D8",
                        background: "#1963A6",
                        color: "#ffffff",
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "17px",
                        width: "99px",

                        cursor: "pointer",
                        marginLeft: "17px",
                      }}
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Space>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
export default ExpenceForm;
