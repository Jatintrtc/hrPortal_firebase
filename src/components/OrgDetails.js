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
  notification,
  Space,
  Card,
  Table,
  Tag,
  Modal,
} from "antd";
import {
  PlusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  StopFilled,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import "../style/Onboarding.css";
import CompanyProContext from "../contexts/CompanyProContext";
import reload from "../images/reload.png";
import ViewModal from "./ViewModal";
import EditOnboarding from "./EditOnboarding";

const OrgDetails = (props) => {

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const imgRef = React.useRef(null);
    const [fileName, setFileName] = useState("");
    const [isBigFile, setIsBigFile] = useState(false);
    const [orgIdExists, setOrgIdExists] = useState(false);
    const [accessList, setAccessList] = useState([]);
    const [addAccess, setAddAccess] = useState(false);

    useEffect(() => {
      setFileName(fileName);
      setIsBigFile(false);
    });
    
    const onFinish = async (values) => {
      if (orgIdExists) {
        showNotification(
          "error",
          "Error",
          "This Organization Code already exists!"
        );
        return;
      }
    //   if (accessList.length == 0) {
    //     showNotification("error", "Error", "There must be at least 1 user!");
    //     return;
    //   }
      const valuesToservice = {
        accessList: [],
        address: [],
        secretary: [],
        director: [],
        auditor: [],
        bank: [],
        regCompName: values.regCompName,
        regOffice: {
          addLine1: values.addLine1,
          addLine2: values.addLine2,
          city: values.city,
          state: values.state,
          country: values.country,
          pincode: values.pincode,
        },
        cinNumber: values.cinNumber,
        gst: values.gst,
        domain: values.domain,
        phone: values.phone,
        status: "Deactivated",
      };
    //   CompanyProContext.createCompInfo(
    //     values.orgcode,
    //     valuesToservice,
    //     fileName,
    //     accessList
    //   )
    //     .then((response) => {
    //       notification.open({
    //         message: "Creating Company",
    //         duration: 2,
    //         icon: <LoadingOutlined />,
    //       });
    //       const timer = setTimeout(() => {
    //         showNotification("success", "Success", "Onboarding Completed");
    //         // getData();
    //         // setAddAccess(false);
    //         // onReset();
    //         // setActivetab("1");
    //       }, 5000);
    //       return () => clearTimeout(timer);
    //     })
    //     .catch((error) => {
    //       showNotification("error", "Error", error.message);
    //     });
    };

    const showNotification = (type, msg, desc) => {
      notification[type]({
        message: msg,
        description: desc,
      });
    };

    function onDelete(delItem) {
      const filteredData = accessList.filter(
        (item) => item.mailid !== delItem.mailid
      );
      // CompanyProContext.deleteCompInfo(delItem.id)
      // .then((response) => {
      //            })
      setAccessList(filteredData);
    }

    const handleClick = (event) => {
      imgRef.current.click();
    };
    const handleChange = (event) => {
      if (!event) {
        return;
      }
      const fileUploaded = event.target.files[0];
      checkFileSize(fileUploaded.size, fileUploaded);
    };
  
    const validateOrgId = async (rule, value, callback) => {
      try {
        let exists = await CompanyProContext.checkOrgIdExists(value);
        if (exists) {
          setOrgIdExists(true);
          throw new Error("this id exists");
        }
        setOrgIdExists(false);
        // return exists;
      } catch (err) {
        callback(err.message);
      }
      // CompanyProContext.checkOrgIdExists(value)
    };
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
    const checkCharacterRole = (event) => {
      if (!/^[a-zA-Z ().-]*$/.test(event.key) && event.key !== "Backspace") {
        return true;
      }
    };
    const checkAlphabetUpper = (event) => {
      if (!/^[A-Z]*$/.test(event.key) && event.key !== "Backspace") {
        return true;
      }
    };
    
  async function addUseRole(values) {
    let exists = accessList.filter((user) => values.mailid == user.mailid);
    if (
      exists.length > 0 ||
      (await CompanyProContext.checkUserExists(values.mailid))
    ) {
      showNotification("error", "Error", "This user already exists!");
      // form2.resetFields();
      setAddAccess(false);
      return;
    }
    setAccessList([...accessList, values]);
    // form2.resetFields();
    setAddAccess(false);
  }

    function onReset() {
        form.resetFields();
        form2.resetFields();
        setIsBigFile(false);
        setFileName(null);
    }

    return (       
        <div style={{ margin: "13px", background: "#fff" }}>
            <div
                style={{
                    // paddingTop: "13px",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "19px",
                }}
            >
                ORGANIZATION DETAILS
            </div>
            <Divider />
    <Form
      className="details"
      style={{ margin: "30px" }}
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
      onFinish={onFinish}
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
                pattern: /^[0-9A-Za-z]+$/,
                message: "Please enter Valid Code",
              },
              {
                validator: validateOrgId,
              },
            ]}
          >
            <Input
              maxLength={20}
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
            name="regCompName"
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
              maxLength={50}
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
            name="cinNumber"
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
            name="gst"
            label="GST Number"
            onKeyPress={(event) => {
              if (
                checkNumbervalue(event) &&
                checkAlphabetUpper(event)
              ) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter GST Number",
              },
              {
                pattern:
                  /^[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                message: "Please enter Valid Number",
              },
            ]}
          >
            <Input
              maxLength={15}
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
            name="domain"
            label="Domain Name"
            rules={[
              {
                required: true,
                message: "Please Enter Domain Name",
              },
              {
                pattern:
                  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
                message: "Please Enter Valid Name",
              },
            ]}
          >
            <Input
              maxLength={30}
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
                pattern: /^[0-9]\d{9}$/,
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
      </Row>
      <Row gutter={[24, 8]}>
        <Col xs={22} sm={15} md={8}>
          <Form.Item
            name="addLine1"
            label="Address Line 1"
            rules={[
              {
                required: true,
                message: "Please Enter Company Address",
              },
              {
                pattern: /^[0-9a-zA-Z.,\s]+$/,
                message: "Please Enter Valid Address",
              },
            ]}
          >
            <Input
              maxLength={50}
              placeholder="Address Line 1"
              style={{
                border: "1px solid #8692A6",
                borderRadius: "4px",
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={22} sm={15} md={8}>
          <Form.Item
            name="addLine2"
            label="Address Line 2"
            rules={[
              {
                required: true,
                message: "Please Enter Company Address",
              },
              {
                pattern: /^[0-9a-zA-Z.,\s]+$/,
                message: "Please Enter Valid Address",
              },
            ]}
          >
            <Input
              maxLength={50}
              placeholder="Address Line 2"
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
              maxLength={20}
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
              maxLength={25}
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
              maxLength={20}
              placeholder="Country"
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

        <Col xs={22} sm={15} md={8}>
          <Form.Item name="logo" className="uploadLogo">
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
                onClick={(e) => handleClick(e)}
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
              {isBigFile ? null : fileName?.name}
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
                id="logo"
                name="logo"
                ref={imgRef}
                onChange={(e) => handleChange(e)}
              />
              {fileName ? (
                ""
              ) : (
                <p
                  style={{
                    fontWeight: "400",
                    fontSize: "13px",
                    lineHeight: "19px",
                    marginLeft: "10px",
                  }}
                >
                  Upload logo. Use the 200 kb size image. PNG or JPEG
                  file format accepted
                </p>
              )}
            </div>
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      <Card
        style={{
          margin: "27px",
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
          className="form"
          style={{ margin: "30px" }}
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
          onFinish={addUseRole}
        >
          {accessList.map((u, i) => (
            <div style={{ marginTop: "10px" }} className="inputLabel">
              <Row gutter={[24, 20]}>
                <Col xs={22} sm={15} md={5}>
                  <div
                    style={{ fontSize: "13px", fontWeight: "600" }}
                  >
                    User Role
                  </div>
                  <div>{u.userRole}</div>
                </Col>
                <Col xs={22} sm={15} md={5}>
                  <div
                    style={{ fontSize: "13px", fontWeight: "600" }}
                  >
                    Name
                  </div>
                  <div> {u.name}</div>
                </Col>
                <Col xs={22} sm={15} md={7}>
                  <div
                    style={{ fontSize: "13px", fontWeight: "600" }}
                  >
                    Email Address
                  </div>
                  <div>{u.mailid}</div>
                </Col>
                <Col xs={22} sm={15} md={6}>
                  <div
                    style={{ fontSize: "13px", fontWeight: "600" }}
                  >
                    Phone Number
                  </div>

                  <div>{u.phone}</div>
                  <Button
                    style={{
                      background: "#f8f8f8",
                      border: "none",
                      color: "#095AA4",
                      float: "right",
                      bottom: " 35px",
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
            <div>
              <Row gutter={[20, 8]} className="addUserForm">
                <Col xs={22} sm={15} md={6}>
                  <Form.Item
                    name="userRole"
                    label="User Role"
                    onKeyPress={(event) => {
                      if (checkCharacterRole(event)) {
                        event.preventDefault();
                      }
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Role",
                      },
                      {
                        pattern: /^[a-zA-Z().-\s]*$/,
                        message: "Please enter Valid Role",
                      },
                    ]}
                  >
                    <Input
                      maxLength={10}
                      placeholder="User Role"
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
                      maxLength={30}
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
                    name="mailid"
                    label="Email Address"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Enter Email address",
                        pattern:
                          "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
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
                        pattern: /^[0-9]\d{9}$/,
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
              background: "#1565D8",
              color: "#FFFFFF",
              fontWeight: "600",
              fontSize: "13px",
              lineHeight: "14.4px",
              float: "right",
              top: "1rem",
            }}
            // htmlType={addAccess ? "submit" : "button"}
            onClick={() => {
              if (addAccess) {
                form2.submit();
              }
              setAddAccess(!addAccess);
            }}
          >
            <PlusCircleOutlined /> {addAccess ? "Save" : "Add User"}
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
              onClick={onReset}
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
    </Form>
        </div>
    )
}

export default OrgDetails;