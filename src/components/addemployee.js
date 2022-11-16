import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Row,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  notification,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { createUser } from "../contexts/CreateContext";
import ConfigureContext from "../contexts/ConfigureContext";
import CompanyProContext from "../contexts/CompanyProContext";
const { Option } = Select;
function AddEmployee() {
  const page = "addemployeePage";
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const compId = sessionStorage.getItem("compId");
  const [configurations, setConfigurations] = useState(null);
  const [workLoc, setWorkLoc] = useState(null);
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    let temp = await CompanyProContext.getCompanyProfile(compId)
    let data = await ConfigureContext.getConfigurations(page)
    let add = ["Registered Office"]
    if(temp.corpOffice) {add.push("Corporate Office")}
    temp.address?.map((rec) => {
      add.push(rec.title)
    })
    setWorkLoc(add)
    setConfigurations(data)
  }
  const handleListEmployee = () => {
    navigate("/EmployeeListPage/EmployeeList");
  };
  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function onReset() {
    form.resetFields();
  }
  const showNotification = (type, msg, desc) => {
    notification[type]({
        message: msg,
        description: desc,
    });
};
  const onFinish = (values) => {
    createUser(values, "compId001")
    .then((response) => {
      showNotification("success", "Success", "Employee Created")
      navigate("/EmployeeListPage/EmployeeList");
    })
    .catch((error) => showNotification("error", "Error", "This user already exists!"))
  };
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
                onClick={handleListEmployee}
                style={{
                  width: "120px",
                  cursor: "pointer",
                  backgroundColor: "rgb(24, 154, 180)",
                  borderRadius: "5px",
                }}
              >
                Employee List
              </Button>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 8 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                First Name<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="fname"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    message: "Please enter First Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ fname: newVal, fname: caps });
                  }}
                  required
                  placeholder="Enter First Name"
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 8 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Middle Name
              </Divider>
              <Form.Item
                name="mname"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: false,
                    minLength: 3,
                    maxLength: 20,
                    message: "Please enter Middle Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ mname: newVal, mname: caps });
                  }}
                  placeholder="Enter Middle Name"
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 8 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Last Name<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="lname"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    message: "Please enter Last Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ lname: newVal, lname: caps });
                  }}
                  required
                  placeholder="Enter Last Name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Official Email Id<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="mailid"
                // onKeyPress={(event) => {
                //   if (checkAlphabets(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: true,
                    // minLength: 3,
                    // maxLength: 20,
                    message: "Please enter Email Id",
                    type: "email",
                  },
                  {
                    // pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Email",
                  },
                ]}
              >
                <Input required placeholder="Enter Email Address" />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Personal Email Id<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="email"
                // onKeyPress={(event) => {
                //   if (checkAlphabets(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: true,
                    // minLength: 3,
                    // maxLength: 20,
                    message: "Please enter Email Id",
                    type: "email",
                  },
                  {
                    // pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Email",
                  },
                ]}
              >
                <Input required placeholder="Enter Email Address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Phone No.<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                className="numder-inputs"
                name="phone"
                // onKeyPress={(event) => {
                //   if (checkNumbervalue(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone Number",
                    pattern: /^[0-9\b]+$/,
                  },
                  { whitespace: true },
                ]}
              >
                <Input
                  maxLength={10}
                  required
                  //   onChange={(e) => {
                  //     const amt = e.target.value;
                  //     setAmount(amt);
                  //     setTotal(amt * quantity);
                  //     form.setFieldsValue({ subTotal: amt * quantity });
                  //   }}
                  placeholder="Enter Phone Number"
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Gender<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please Choose Gender",
                  },
                ]}
              >
                <Select
                  // showSearch
                  placeholder="Select a Gender"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  {/* <Option value="pns">Prefer Not To Say</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Designation<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="designation"
                rules={[
                  {
                    required: true,
                    message: "Please Choose Designation",
                  },
                ]}
              >
                <Select
                  // showSearch
                  placeholder="Select a Designation"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                {
                  configurations?.designations.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Employee Type<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="empType"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Type",
                  },
                ]}
              >
                <Select
                  // showSearch
                  placeholder="Select Employee Type"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="Full-Time">Full-Time</Option>
                  <Option value="Part-Time">Part-Time</Option>
                  {/* <Option value="pns">Prefer Not To Say</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Reporting Manager
              </Divider>
              <Form.Item
                name="repManager"
                // onKeyPress={(event) => {
                //   if (checkAlphabets(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: false,
                    // minLength: 3,
                    // maxLength: 20,
                    message: "Please enter Reporting Manager Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
              <Select
                  // showSearch
                  placeholder="Select a Manager"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                {
                  configurations?.repManager.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
                {/* <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({
                      repManager: newVal,
                      repManager: caps,
                    });
                  }}
                  placeholder="Enter Reporting Manager Name"
                /> */}
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Secondary Manager
              </Divider>
              <Form.Item
                name="secManager"
                // onKeyPress={(event) => {
                //   if (checkAlphabets(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: false,
                    // minLength: 3,
                    // maxLength: 20,
                    message: "Please enter Sec. Manager Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
              <Select
                  // showSearch
                  placeholder="Select a Manager"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                {
                  configurations?.secManager.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
                {/* <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({
                      secManager: newVal,
                      secManager: caps,
                    });
                  }}
                  placeholder="Enter Secondary Manager Name"
                /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Date Of Joining<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="doj"
                placeholder="Choose Date"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Date",
                  },
                ]}
              >
                {/* format={dateFormatList} */}
                <DatePicker
                  style={{ width: "100%" }}
                  format={"DD-MM-YYYY"}
                  //  disabledDate={disabledDate}
                  placeholder="Choose Date"
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              span={18}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Department
              </Divider>
              <Form.Item
                name="department"
                rules={[
                  {
                    required: false,
                    message: "Choose Department",
                  },
                ]}
              >
              <Select
                  // showSearch
                  placeholder="Select a Field"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                {
                  configurations?.field.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Work Location<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="location"
                // onKeyPress={(event) => {
                //   if (checkAlphabets(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: true,
                    // minLength: 3,
                    // maxLength: 20,
                    message: "Please enter Location",
                  },
                  {
                    // pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Location",
                  },
                ]}
              >
                 <Select
                  // showSearch
                  placeholder="Select a Location"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                {
                  workLoc?.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
                {/* <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ location: newVal, location: caps });
                  }}
                  required
                  placeholder="Enter Location"
                /> */}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 16]}>
            <Col classsname="gutter-row" span={9}></Col>
            <Col classsname="gutter-row">
              <div className="submitButton">
                <Space>
                  <Form.Item className="submit">
                    <Button
                      style={{
                        background: "#C1C1C1",
                        borderRadius: "5px",
                        width: "80px",
                        marginTop: "25px",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={onReset}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                  <Form.Item className="submit">
                    <button
                      style={{
                        background: "#189AB4",
                        borderRadius: "5px",
                        borderWidth: "0px",
                        width: "80px",
                        marginTop: "25px",
                        height: "30px",
                        color: "white",
                        cursor: "pointer",
                        marginLeft: "17px",
                      }}
                      type="primary"
                    >
                      Submit
                    </button>
                  </Form.Item>
                </Space>
              </div>
            </Col>
            {/* <Col classsname='gutter-row' span={3}></Col> */}
          </Row>
        </Form>
      </div>
    </>
  );
}
export default AddEmployee;
