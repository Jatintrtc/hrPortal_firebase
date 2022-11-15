import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form, Modal } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import {
  CloseOutlined,
  EditFilled,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

function AddressCust() {
  const [editAddressContent, showEditAddressContent] = useState([false]);
  const [addAddressContent, showAddAddressContent] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const compId = sessionStorage.getItem("compId");

  const onFinish = (values) => {
    const valuesToservice = {
      title: values.addresstitle,
      addLine1: values.address1,
      addLine2: values.address2,
      city: values.city,
      state: values.state,
      country: values.country,
      pincode: values.pin,
    };
    CompanyProContext.addCompInfo(compId, { address: valuesToservice });
    form.resetFields();
    getData();
    showAddAddressContent(false);
  };

  const editOnFinish = async (values, i) => {
    const valuesToservice = {
      title: values.addresstitle,
      addLine1: values.address1,
      addLine2: values.address2,
      city: values.city,
      state: values.state,
      country: values.country,
      pincode: values.pin,
    };
    await CompanyProContext.editCompInfo(
      compId,
      { address: data[i] },
      { address: valuesToservice }
    );
    getData();
    let array = editAddressContent;
    array[i] = true;
    showEditAddressContent(array);
  };

  const onDeleteAddress = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete address?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, { address: record })
          .then((response) => {
            getData();
          })
          .catch((error) => {
          });
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    let array = [...data.address];
    showEditAddressContent(array.fill(false));
    setData(data.address);
  };

  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   flexDirection: "column",
        }}
      >
        <Row
          className="Row-Card"
          style={{
            width: '75%',
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
          {data && data != 0
            ? data.map((add, i) => (
              <Col span={24}>
                <Form
                  // form={form1}
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
                  onFinish={(values) => editOnFinish(values, i)}
                >
                  <Card
                    title={add ? add.title : "CUSTOM ADDRESS TITLE"}
                    className="customaddrcard"
                    extra={
                      <>
                        {editAddressContent[i] === false ? (
                          <Button
                            type="text"
                            className="edit"
                            style={{
                              color: "#4ec0f1",
                              display: "none",
                              paddingTop: "7px",
                              paddingRight: "7px",
                              position: "absolute",
                              right: 10,
                              top: 10,
                            }}
                            onClick={() => {
                              let array = [...editAddressContent];
                              array[i] = !array[i];
                              showEditAddressContent(array);
                            }}
                          >
                            <EditFilled />
                          </Button>
                        ) : null}
                        <DeleteOutlined
                          style={{ color: "lightblue", paddingRight: "25px", }}
                          onClick={() => {
                            onDeleteAddress(add);
                          }}
                        />
                      </>
                    }
                    style={{
                      width: '100%',
                      marginTop: 10,
                    }}
                  >
                    {/* {editContactInfo === true ? ( */}
                    <Row gutter={[16, 16]}>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">Address Title</div>
                          {console.log(
                            "no",
                            add,
                            editAddressContent[i] === false
                          )}
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.title : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.title : null}
                              name="addresstitle"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Address Title",
                                  type: "text",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {/* ) : null} */}
                    {/* {editContactInfo === true ? ( */}
                    <Row gutter={[16, 16]}>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">
                            Address Line 1
                          </div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.addLine1 : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.addLine1 : null}
                              name="address1"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Address",
                                  type: "text",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {/* ) : null} */}
                    {/* {editContactInfo === true ? ( */}
                    <Row gutter={[16, 16]}>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">
                            Address Line 2
                          </div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.addLine2 : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.addLine2 : null}
                              name="address2"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Address Name",
                                  type: "text",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {/* ) : null} */}
                    {/* {editContactInfo === true ? ( */}
                    <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                      <Col xs={22} sm={15} md={6}>
                        <div>
                          <div className="div-discription">City</div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.city : null}</div>
                          ) : (
                            <Form.Item
                              style={{ width: "100%" }}
                              initialValue={add ? add.city : null}
                              name="city"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter City ",
                                  type: "text",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Enter Valid City ",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <div>
                          <div className="div-discription">State</div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.state : null}</div>
                          ) : (
                            <Form.Item
                              style={{ width: "100%" }}
                              initialValue={add ? add.state : null}
                              name="state"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter State ",
                                  type: "text",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Enter Valid State ",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <div>
                          <div className="div-discription">Country</div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.country : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.country : null}
                              name="country"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Country",
                                  type: "text",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Enter Valid Country",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <div>
                          <div className="div-discription">Pin Code</div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.pincode : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.pincode : null}
                              name="pin"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Pin",
                                  type: "text",
                                },
                                {
                                  pattern: /^[0-9\b]+$/,
                                  message: "Enter Valid Pin",
                                },
                              ]}
                            >
                              <Input
                                maxLength={6}
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {/* ) : null} */}
                    {editAddressContent[i] === true ? (
                      <Row
                      //   style={{
                      //     display: "flex",
                      //     justifyContent: "flex-end",
                      //     marginTop: "3%",
                      //   }}
                      >
                        <Button
                          type="text"
                          style={{ fontSize: 15 }}
                          onClick={() => {
                            let array = [...editAddressContent];
                            array[i] = !array[i];
                            showEditAddressContent(array);
                          }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginLeft: "10px" }}
                          >
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                    {/* {editContactInfo == false && i == (data.length-1) &&
                        <>
                            <br />
                            <Button type="primary" style={{ marginLeft: "10px" }}
                                onClick={() => showEditAddressContent(!editAddressContent)}
                            >
                                <PlusCircleOutlined />
                                Add
                            </Button>
                        </>
                        } */}
                  </Card>
                </Form>
              </Col>
            ))
            : null}
        </Row>
      </div>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   flexDirection: "column",
        }}
      >
        <Row
          className="Row-Card"
          style={{
            width: '75%',
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Col span={24}>
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
              <Card
                title={"CUSTOM ADDRESS TITLE"}
                className="customaddrcard"
                extra={
                  <>
                    {addAddressContent === false ? (
                      <Button
                        type="text"
                        className="edit"
                        style={{
                          color: "#4ec0f1",
                          display: "none",
                          paddingTop: "7px",
                          paddingRight: "7px",
                          position: "absolute",
                          right: 10,
                          top: 10,
                        }}
                        onClick={() => showAddAddressContent(true)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
                style={{
                  width: '100%',
                  marginTop: 10,
                }}
              >
                {addAddressContent ? (
                  <>
                    <Row gutter={[16, 16]}>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">Address Title</div>
                          <Form.Item
                            name="addresstitle"
                            rules={[
                              {
                                required: true,
                                message: "Enter Address Title",
                                type: "text",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">Address Line 1</div>
                          <Form.Item
                            name="address1"
                            rules={[
                              {
                                required: true,
                                message: "Enter Address",
                                type: "text",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">Address Line 2</div>
                          <Form.Item
                            name="address2"
                            rules={[
                              {
                                required: true,
                                message: "Enter Address",
                                type: "text",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">City</div>
                          <Form.Item
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: "Enter City ",
                                type: "text",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Enter Valid City ",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                      </Col>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">State</div>
                          <Form.Item
                            name="state"
                            rules={[
                              {
                                required: true,
                                message: "Enter State ",
                                type: "text",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Enter Valid State ",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                      </Col>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">Country</div>
                          <Form.Item
                            name="country"
                            rules={[
                              {
                                required: true,
                                message: "Enter Country ",
                                type: "text",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Enter Valid Country ",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                      </Col>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">Pin Code</div>
                          <Form.Item
                            name="pin"
                            rules={[
                              {
                                required: true,
                                message: "Enter Pin Code ",
                                type: "text",
                              },
                              {
                                pattern: /^[0-9\b]+$/,
                                message: "Enter Valid Pin Code ",
                              },
                            ]}
                          >
                            <Input
                              maxLength={6}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "3%",
                      }}
                    >
                      <Button
                        type="text"
                        style={{ fontSize: 15 }}
                        onClick={() => showAddAddressContent(false)}
                      >
                        <CloseOutlined /> CANCEL
                      </Button>
                      <Col>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ marginLeft: "10px" }}
                        >
                          SAVE
                        </Button>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <Button
                    type="primary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => showAddAddressContent(true)}
                  >
                    <PlusCircleOutlined />
                    Add
                  </Button>
                )}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default AddressCust;
