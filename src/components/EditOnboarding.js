import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Tabs,
  Input,
  Col,
  Row,
  Divider,
  message,
  Upload,
  Button,
  Space,
  Card,
  Table,
  Tag,
  Modal,
} from "antd";
import {
  PlusCircleOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  StopFilled,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import "../style/Onboarding.css";
import reload from "../images/reload.png";

function EditOnboarding(props) {
  const [fileName, setFileName] = useState("");
  const [isBigFile, setIsBigFile] = useState(false);
  const imgRef = React.useRef(null);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [accessList, setAccessList] = useState([]);
  const [addAccess, setAddAccess] = useState(false);

  const handleClickEdit = (event) => {
    console.log("imgRef:: ", imgRef);
    imgRef.current.click();
  };

  const handleEdit = (event) => {
    const fileUploaded = event.target.files[0];
    checkFileSize(fileUploaded.size, fileUploaded.name);
  };

  useEffect(() => {
    setFileName(fileName);
    setIsBigFile(false);
  });

  function checkFileSize(size, fileName) {
    if (Math.round(size / 1024) <= 200) {
      setFileName(fileName);
      setIsBigFile(false);
    } else {
      setFileName(null);
      setIsBigFile(true);
    }
  }

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
  function onDelete(delItem) {
    console.log(delItem);
    const filteredData = accessList.filter(
      (item) => item.emailaddress !== delItem.emailaddress
    );
    setAccessList(filteredData);
  }

  function editUseRole(values) {
    setAccessList([...accessList, values]);
    form2.resetFields();
    setAddAccess(false);
    // setAccessList([...accessList, newAccess]);
    // setNewAccess({ userole: "", name: "", emailaddress: "", phone: "" });
  }

  function cancel() {
    props.setIsEditOrganization(false);
  }

  return (
    <Card
      style={{
        background: "#fff",
        marginRight: "30px",
        // height: "55rem",
      }}
    >
      <div style={{ background: "#fff" }}>
        <div
          style={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "19px",
          }}
        >
          ORGANIZATION DETAILS
        </div>
        <Divider />
        <Form
          className="organization"
          form={form}
          layout="vertical"
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
          // onFinish={onFinish}
        >
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="orgcode"
                label="Organization Code"
                onKeyPress={(event) => {
                  if (checkAlphabets(event) && checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter Organization Code",
                  },
                  {
                    pattern: /^[0-9a-zA-Z]+$/,
                    message: "Please enter Valid Code",
                  },
                ]}
              >
                <Input
                  maxLength={15}
                  placeholder="Organization Code"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="orgname"
                label="Organization Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter Organization Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  placeholder="Organization Name"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="cinnumber"
                label="CIN Number"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event) && checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter CIN Number",
                  },
                  {
                    pattern: /^[0-9a-zA-Z]+$/,
                    message: "Please enter Valid Number",
                  },
                ]}
              >
                <Input
                  maxLength={21}
                  placeholder="CIN Number"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="gstnumber"
                label="GST Number"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event) && checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter GST Number",
                  },
                  {
                    pattern: /^[0-9a-zA-Z]+$/,
                    message: "Please enter Valid Number",
                  },
                ]}
              >
                <Input
                  maxLength={22}
                  placeholder="GST Number"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="domname"
                label="Domain Name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Domain Name",
                  },
                  {
                    pattern: "/^[A-Z0-9._%+-]+.[A-Z0-9._%+-]+.[A-Z]{2,4}$/i;",
                    message: "Please Enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={25}
                  placeholder="Domain Name"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="address1"
                label="Address Line1"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Company Address",
                  },
                  {
                    pattern: /^[0-9a-zA-Z.,]+$/,

                    message: "Please Enter Valid Address",
                  },
                ]}
              >
                <Input
                  maxLength={50}
                  placeholder="Address Line1"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="address2"
                label="Address Line2"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Company Address",
                  },
                  {
                    pattern: /^[0-9a-zA-Z.,]+$/,

                    message: "Please Enter Valid Address",
                  },
                ]}
              >
                <Input
                  maxLength={50}
                  placeholder="Address Line2"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="phone"
                label="Phone"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter Phone Number",
                  },
                  {
                    pattern: /^[6-9]\d{9}$/,
                    message: "Please Enter Valid Number",
                  },
                ]}
              >
                <Input
                  maxLength={10}
                  placeholder="Phone"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="city"
                label="City"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please Enter City Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  placeholder="City"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="state"
                label="State"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter State",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={10}
                  placeholder="State"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={22} sm={15} md={4}>
              <Form.Item
                name="pincode"
                label="Pin Code"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter Pin Code",
                  },
                  {
                    pattern: /^[0-9\b]+$/,
                    message: "Please Enter Valid Code",
                  },
                ]}
              >
                <Input
                  maxLength={6}
                  placeholder="Pin Code"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={4}>
              <Form.Item
                name="country"
                label="Country"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter Country Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={10}
                  placeholder="Country"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={22} sm={8}>
              <Form.Item name="file" className="uploadLogo">
                <div
                  style={{
                    border: "dashed #B9B9B9",
                    borderWidth: "thin",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={handleClickEdit}
                    style={{
                      width: " 60px",
                      height: "60px",
                      margin: "10px",
                    }}
                  >
                    <PlusCircleOutlined
                      style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "center",
                      }}
                    />
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginRight: "8px",
                      }}
                    >
                      Upload
                    </span>
                  </Button>
                  {isBigFile ? null : fileName}
                  {isBigFile
                    ? message.error("File size must be less than 200Kb.")
                    : ""}
                  <input
                    style={{
                      height: "72px",
                      marginTop: "11px",
                      display: "none",
                    }}
                    type="file"
                    // accept="image/gif, image/jpeg, image/png"
                    id="myfile"
                    name="file"
                    ref={imgRef}
                    onChange={handleEdit}
                  />
                  {fileName ? (
                    ""
                  ) : (
                    <p
                      style={{
                        fontWeight: "400",
                        fontSize: "11px",
                        lineHeight: "13px",
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      Upload logo. Use the 200 kb size image. PNG or JPEG file
                      format accepted
                    </p>
                  )}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <Divider />
      <Card
        style={{
          margin: "15px",
          padding: "10px",
          background: "#f8f8f8",
          // height: "auto",
        }}
      >
        <div
          style={{
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "17px",
          }}
        >
          Organization Access
        </div>
        <Divider />
        <Form
          className="access"
          //   style={{ margin: "30px" }}
          form={form2}
          layout="vertical"
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
          onFinish={editUseRole}
        >
          {accessList.map((u, i) => (
            <div style={{ marginTop: "10px" }} className="inputLabel">
              <Row gutter={[24, 20]}>
                <Col xs={22} sm={15} md={6}>
                  <label style={{ fontSize: "13px", fontWeight: "600" }}>
                    Use Role
                  </label>
                  <Input value={u.userole}></Input>
                </Col>
                <Col xs={22} sm={15} md={6}>
                  <label style={{ fontSize: "13px", fontWeight: "600" }}>
                    Name
                  </label>
                  <Input value={u.name}></Input>
                </Col>
                <Col xs={22} sm={15} md={6}>
                  <label style={{ fontSize: "13px", fontWeight: "600" }}>
                    Email Address
                  </label>
                  <Input value={u.emailaddress}></Input>
                </Col>
                <Col xs={22} sm={15} md={6}>
                  <label style={{ fontSize: "13px", fontWeight: "600" }}>
                    Phone Number
                  </label>

                  <Input value={u.phone}></Input>
                  <Button
                    style={{
                      background: "#f8f8f8",
                      border: "none",
                      color: "#095AA4",
                      position: "absolute",
                      width: "10px",
                    }}
                    onClick={() => {
                      onDelete(u);
                    }}
                  >
                    <CloseCircleOutlined />
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
          {addAccess ? (
            <div style={{ marginRight: "60px", marginTop: "15px" }}>
              <Row gutter={[20, 8]} className="addUserForm">
                <Col xs={22} sm={15} md={6}>
                  <Form.Item
                    name="userole"
                    label="Use Role"
                    onKeyPress={(event) => {
                      if (checkAlphabets(event)) {
                        event.preventDefault();
                      }
                    }}
                    rules={[
                      {
                        required: true,

                        message: "Please enter Role",
                      },
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message: "Please enter Valid Role",
                      },
                    ]}
                  >
                    <Input
                      maxLength={10}
                      placeholder="Use Role"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} sm={15} md={6}>
                  <Form.Item
                    name="name"
                    label="Name"
                    onKeyPress={(event) => {
                      if (checkAlphabets(event)) {
                        event.preventDefault();
                      }
                    }}
                    rules={[
                      {
                        required: true,

                        message: "Please Enter Name",
                      },
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message: "Please Enter Valid Name",
                      },
                    ]}
                  >
                    <Input
                      maxLength={20}
                      placeholder="Name"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} sm={15} md={6}>
                  <Form.Item
                    name="emailaddress"
                    label="Email Address"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Enter Email address",
                        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                      },
                    ]}
                  >
                    <Input
                      maxLength={30}
                      placeholder="Email Address"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} sm={15} md={6}>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    onKeyPress={(event) => {
                      if (checkNumbervalue(event)) {
                        event.preventDefault();
                      }
                    }}
                    rules={[
                      {
                        required: true,

                        message: "Please enter Phone Number",
                      },
                      {
                        pattern: /^[6-9]\d{9}$/,
                        message: "Please Enter Valid Number",
                      },
                    ]}
                  >
                    <Input
                      maxLength={10}
                      placeholder="Phone Number"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          ) : null}
          <Button
            style={{
              border: "none",
              // marginLeft: "49rem",
              background: "#f8f8f8",
              color: "#095AA4",
              fontWeight: "600",
              fontSize: "13px",
              lineHeight: "14.4px",
              float: "right",
            }}
            htmlType={addAccess ? "submit" : "button"}
            onClick={() => {
              if (!addAccess) {
                setAddAccess(true);
              }
            }}
          >
            <PlusCircleOutlined /> Add User
          </Button>
        </Form>
      </Card>
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
                border: "1px solid #1565D8",
                color: "#1565D8",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "17px",
                width: "99px",
              }}
              onClick={cancel}
            >
              CANCEL
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                border: "1px solid #1565D8",
                background: "#1565D8",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "17px",
                width: "99px",
              }}
              htmlType="submit"
            >
              SAVE
            </Button>
          </Form.Item>
        </Space>
      </div>
    </Card>
  );
}

export default EditOnboarding;