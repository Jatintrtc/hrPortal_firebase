import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
} from "antd";
import { EditFilled, CloseOutlined } from "@ant-design/icons";

function BankAccount() {
  const [editContent, showEditContent] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const { currentUser } = useAuth();
  const onFinish = () => {
    let record = {
      bankName: bankName ? bankName : null,
      accountNumber: accountNumber ? accountNumber : null,
      ifscCode: ifscCode ? ifscCode : null,
    };
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    showEditContent(false);
    getData();
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    setBankName(data.bankName ? data.bankName : null);
    setAccountNumber(data.accountNumber ? data.accountNumber : null);
    setIfscCode(data.ifscCode ? data.ifscCode : null);
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
  const checkUpperCase = (event) => {
    if (!/^[A-Z]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          className="bankAccount"
          style={{ marginBottom: "25px", border: "none" }}
        >
          <Form
            // form={form}
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
            <Card
              title="Bank Account Details"
              //   actions={[
              //   <EditOutlined key="edit" />,
              // ]}
              extra={
                <>
                  {editContent === false ? (
                    <Button
                      type="text"
                      style={{ color: "#4ec0f1" }}
                      onClick={() => showEditContent(!editContent)}
                    >
                      <EditFilled />
                    </Button>
                  ) : null}
                </>
              }
              style={{
                width: 800,
                marginTop: 10,
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={10}>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                      Bank Name
                    </div>
                    {editContent === false ? (
                      <div>{bankName ? bankName : "-"}</div>
                    ) : (
                      <Form.Item
                        name="bankname"
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: true,

                            pattern: /^[a-zA-Z\s]*$/,
                            message: "Please enter Bank Name",
                          },
                        ]}
                      >
                        <Input
                          defaultValue={bankName ? bankName : null}
                          placeholder="Enter Bank Name"
                          onChange={(e) => {
                            setBankName(e.target.value);
                          }}
                          maxLength={20}
                        />
                      </Form.Item>
                    )}
                  </div>
                </Col>
                <Col span={10}>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                      Account Number
                    </div>
                    {editContent === false ? (
                      <div>{accountNumber ? accountNumber : "-"}</div>
                    ) : (
                      <Form.Item
                        name="accountnumber"
                        onKeyPress={(event) => {
                          if (checkNumbervalue(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: true,

                            pattern: /^[0-9\b]+$/,
                            message: "Please enter Account Number",
                          },
                          {
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input
                          defaultValue={accountNumber ? accountNumber : null}
                          placeholder="Enter Account Number"
                          onChange={(e) => {
                            setAccountNumber(e.target.value);
                          }}
                          maxLength={20}
                        />
                      </Form.Item>
                    )}
                  </div>
                </Col>
                <Col span={10}>
                  <div>
                    <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                      IFSC Code
                    </div>
                    {editContent === false ? (
                      <div>{ifscCode ? ifscCode : "-"}</div>
                    ) : (
                      <Form.Item
                        name="ifsccode"
                        onKeyPress={(event) => {
                          if (
                            checkNumbervalue(event) &&
                            checkUpperCase(event)
                          ) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: true,

                            pattern: /^[0-9a-zA-Z]+$/,
                            message: "Please enter IFSC Code",
                          },
                          {
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input
                          defaultValue={ifscCode ? ifscCode : null}
                          placeholder="Enter IFSC Code"
                          maxLength={15}
                          onChange={(e) => {
                            setIfscCode(e.target.value);
                          }}
                        />
                      </Form.Item>
                    )}
                  </div>
                </Col>
              </Row>

              {editContent === true ? (
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "3%",
                  }}
                >
                  <Button
                    onClick={() => showEditContent(false)}
                    type="text"
                    style={{ fontSize: 15 }}
                  >
                    <CloseOutlined /> CANCEL
                  </Button>
                  <Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginLeft: "10px" }}
                      // onClick={() => onFinish()}
                    >
                      SAVE
                    </Button>
                  </Col>
                </Row>
              ) : null}
            </Card>
          </Form>
        </Card>
      </div>
    </>
  );
}
export default BankAccount;
