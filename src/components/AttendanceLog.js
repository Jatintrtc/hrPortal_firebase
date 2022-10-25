import React, { useState, useEffect } from "react";
import {
  Tabs,
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Spin,
  Pagination,
} from "antd";
import "../style/AttendanceLog.css";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import AttendanceContext from "../contexts/AttendanceContext";
const { RangePicker } = DatePicker;
const { Content } = Layout;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const dateFormat = "DD-MM-YYYY";
function AttendanceLog({ empDetails }) {
  const [monthlydata, setMonthlydata] = useState([]);
  const [allEmp, setallEmp] = useState([]);
  const [role, setRole] = useState(empDetails);
  const [selectemp, setSelectemp] = useState({ id: "" });
  const [activetab, setActivetab] = useState("1");
  const { currentUser } = useAuth();
  const [key, setKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const [empMonthly, setEmpMonthly] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: [],
    category: "all",
  });
  const [filteredEmp, setFilteredEmp] = useState([]);

  const columns = [
    {
      title: "Employee Code",
      dataIndex: "empId",
      className: "code",
      key: "empId",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "nFname",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      ellipsis: true,
    },
    // {
    //   title: "Action",
    //   key: "action",
    // },
  ];

  useEffect(() => {
    form.resetFields();
    if (empDetails.userType === "emp") {
      setTimeout(() => {
        setSelectemp({ id: currentUser.uid });
        getEmpDetails(currentUser.uid, [
          moment().subtract(30, "days"),
          moment(),
        ]);
      }, 500);
    } else {
      if (activetab == "1") {
        allEmpDetails();
      }
    }
  }, [activetab]);

  const [form] = Form.useForm();

  function getFormateDateString() {
    return (
      (new Date().getDate() > 9
        ? new Date().getDate()
        : "0" + new Date().getDate()) +
      "-" +
      (new Date().getMonth() + 1 > 9
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)) +
      "-" +
      new Date().getFullYear()
    );
  }
  function getFormatTimeString() {
    return (
      (new Date().getHours() > 9
        ? new Date().getHours()
        : "0" + new Date().getHours()) +
      ":" +
      (new Date().getMinutes() > 9
        ? new Date().getMinutes()
        : "0" + new Date().getMinutes()) +
      ":" +
      (new Date().getSeconds() > 9
        ? new Date().getSeconds()
        : "0" + new Date().getSeconds())
    );
  }

  const onFinish = async (values) => {
    const newData = {
      report: values?.project_details || "-",
      project: values?.project_name || "-",
    };
    await AttendanceContext.updateAttendance(
      currentUser.uid,
      values.date,
      newData
    );
    setActivetab("1");
  };

  if (loading) {
    return (
      <div
        style={{
          height: "70vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            margin: "-10px",
            zIndex: "100",
            opacity: "0.7",
            backgroundColor: "transparent",
          }}
        />
      </div>
    );
  }

  async function getEmpDetails(id, date) {
    let data = await AttendanceContext.getAllAttendance(id, date);
    setEmpMonthly(data);
    setLoading(false);
    return data;
  }

  function allEmpDetails() {
    setLoading(true);
    AttendanceContext.getAllUsers().then((userdata) => {
      getWithLeave(userdata);
    });
  }

  function getWithLeave(userdata) {
    AttendanceContext.updateWithLeave(userdata).then((final) => {
      setallEmp(final);
      setFilteredEmp(final);
      setEmpMonthly(final);
      setLoading(false);
    });
  }

  const onReset = () => {
    form.resetFields();
  };

  const columns1 = [
    // {
    //   title: "Employee Code",
    //   dataIndex: "code",
    //   key: "code",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "In Time",
      dataIndex: "clockIn",
      key: "clockIn",
    },
    {
      title: "Out Time",
      key: "clockOut",
      dataIndex: "clockOut",
    },
    {
      title: "Work Duration",
      key: "duration",
      dataIndex: "duration",
    },
    {
      title: "Break Time",
      key: "break",
      dataIndex: "break",
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      width: 180,
      ellipsis: true,
    },
    // {
    //   title: "Action",
    //   key: "action",
    // },
  ];

  async function onHrDateFilter(value) {
    if (value == null) {
      const modifiedFilterExpense = await getEmpDetails(selectemp.id, [
        moment().subtract(30, "days"),
        moment(),
      ]);
      setEmpMonthly(modifiedFilterExpense);
    } else {
      const begin = value.clone().startOf("month");
      const end = value.clone().endOf("month");
      let date = [begin, end];
      const modifiedFilterExpense = await getEmpDetails(selectemp.id, date);
      setEmpMonthly(modifiedFilterExpense);
    }
  }
  const searchChange = (e) => {
    let search = e.target.value;
    setFilterCriteria({ ...filterCriteria, search: search });
    if (search) {
      let result = allEmp.filter((ex) =>
        ex.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEmp(result);
    } else {
      setFilteredEmp(allEmp);
    }
  };

  return (
    <>
      <div className="hrtab">
        <Tabs
          defaultActiveKey={activetab}
          activeKey={activetab}
          className="Tabs"
          onChange={(tabKey) => {
            setActivetab(tabKey);
            setSelectemp({ id: "" });
          }}
        >
          {role.userType === "emp" ? (
            <>
              <Tabs.TabPane tab="Monthly Log" key="1">
                <DatePicker
                  picker="month"
                  placeholder="Select Month"
                  className="Range"
                  bordered={true}
                  // defaultValue={[]}
                  format="MM-YYYY"
                  style={{
                    background: "#1890ff",
                    cursor: "pointer",
                    marginLeft: "12rem",
                  }}
                  allowClear
                  onChange={onHrDateFilter}
                />
                <Table
                  loading={loading}
                  className="monthly"
                  columns={columns1}
                  dataSource={empMonthly || []}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Add Report"
                key="2"
                className="reportTabs"
                // onClick={() => {
                //   setIsModalOpen(true);
                // }}
              >
                {/* <Button type="primary" onClick={showModal}>
              Open Modal
            </Button> */}
                {/* <Modal
              title="Basic Modal"
              visible={isModalOpen}
              footer={null}
              closeIcon={
                <div
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  X
                </div>
              }
            > */}
                <Form
                  {...layout}
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                  className="formItem"
                >
                  <Form.Item
                    name="date"
                    label="Date"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="project_name"
                    label="Project Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <Input className="name" />
                  </Form.Item>
                  <Form.Item
                    name="project_details"
                    label="Project Details"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <Input className="name" />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="submit">
                      Submit
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={onReset}
                      className="reset"
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Form>
                {/* </Modal> */}
              </Tabs.TabPane>
            </>
          ) : (
            <>
              <Tabs.TabPane tab="Daily Log" key="1" forceRender="true">
                <Input
                  className="Daily"
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={searchChange}
                  // style={{ width: "95%" }}
                />
                <Table
                  //   rowSelection={{
                  //     type: selectionType,
                  //     ...rowSelection,
                  //   }}
                  className="DailyTable"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        setSelectemp({ ...record });
                        getEmpDetails(record.id, [
                          moment().subtract(30, "days"),
                          moment(),
                        ]);
                        setActivetab("2");
                      }, // click row
                    };
                  }}
                  loading={loading}
                  columns={columns}
                  dataSource={filteredEmp}
                />
              </Tabs.TabPane>
              <Tabs.TabPane disabled={!selectemp.id} tab="Monthly Log" key="2">
                <DatePicker
                  picker="month"
                  placeholder="Select Month"
                  className="Range"
                  // defaultValue={[]}
                  format={"MM-YYYY"}
                  style={{
                    background: "#1890ff",
                    cursor: "pointer",
                    marginLeft: "12rem",
                  }}
                  allowClear
                  onChange={onHrDateFilter}
                />

                <Table
                  loading={loading}
                  className="monthly"
                  columns={columns1}
                  dataSource={empMonthly}
                  pagination={true}
                />
              </Tabs.TabPane>
            </>
          )}
        </Tabs>
      </div>
    </>
  );
}
export default AttendanceLog;
