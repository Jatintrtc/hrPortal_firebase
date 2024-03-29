
import { Col, Divider, Row, Form, Card, Avatar, Typography, Timeline, Modal, } from "antd";
import React, { useEffect, useState } from "react";
import DocumentContext from "../contexts/DocumentContext";
import imageavailable from "../images/imageavailable.png";
import Iframe from "react-iframe";
import "../style/EmployeeList.css";

const styleFont = {
  marginBottom: '0px', fontSize: '15px', fontFamily: 'Open Sans',

}

const styleFont1 = {
  marginBottom: '0px', fontSize: '25px', fontFamily: 'Open Sans',

}

const styleFont3 = {
  marginBottom: '5px', fontSize: '25px', fontFamily: 'Open Sans',

}


function EmployeeListview(props) {
  const showRecord = props.showRecord;
  const [userid, setUserId] = useState(showRecord.id);
  const [isEduModalVisible, setisEduModalVisible] = useState(false);
  const [isIdModalVisible, setIdModalVisible] = useState(false);
  const [isWorkModalVisible, setIsWorkModalVisible] = useState(false);
  const [certificationDetails, setCertificationDetails] = useState([]);
  const [workDetails, setWorkDetails] = useState([]);
  const [id, setId] = useState([]);
  const { Title, Text } = Typography;

  const showEduPdfModal = () => {
    setisEduModalVisible(true);
  };
  const showIdPdfModal = () => {
    setIdModalVisible(true);
  };
  const showWorkPdfModal = () => {
    setIsWorkModalVisible(true);
  };


  useEffect(() => {
    setUserId(props.showRecord.id)
    getCertificate();
    getWorkData()
    getIdData()
  }, [props.showRecord.id]);

  //-------------------------------------------------certificate
  const getCertificate = async () => {
    let alldata = await DocumentContext.getDocument(
      props.showRecord.id,
      "certificate"
    );
    setCertificationDetails(alldata);


  };
  //--------------------------------------------------------work
  const getWorkData = async () => {
    let alldata = await DocumentContext.getDocument(
      props.showRecord.id,
      "work");
    setWorkDetails(alldata);

  };

  //--------------------------------------------------------id
  const getIdData = async () => {
    let alldata = await DocumentContext.getDocument(
      props.showRecord.id,
      "id");
    setId(alldata);

  };


  return (
    <>
      <div >
        <Card
          className="card-profile-head"
          bodyStyle={{ display: "none", }}
          style={{ borderRadius: '10px' }}
          title={
            <Row justify="space-between" align="middle" gutter={[24, 0]}>
              <Col span={24} md={12} style={{ display: 'flex', justifyContent: 'space-between', }} className="col-info">

                <Avatar.Group className="card-profile-photo" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                  <Avatar size={75}
                    src={showRecord.profilePic}
                    style={{
                      // borderRadius: '50%',
                      border: '1px solid black',
                      objectFit: 'contain',
                      textAlign: 'center'
                    }}
                    alt={imageavailable}

                  // shape="square"
                  />

                  <div className="avatar-info">
                    <h4 style={styleFont1}>{showRecord.fname ? showRecord.fname : '-'}</h4>
                    <h5 style={styleFont}>{showRecord.designation ? showRecord.designation : '-'}</h5>
                    <h4 style={styleFont1}>Employee ID : {showRecord.empId ? showRecord.empId : '-'}</h4>
                    <h5 style={styleFont}>Date of Joining : {showRecord.doj ? showRecord.doj : '-'}</h5>
                  </div>

                </Avatar.Group>

                <Divider className="divider-one" dashed type="vertical" style={{ height: "120px", borderColor: 'black', fontWeight: 300 }} />

              </Col>

              <Col span={12}>
                <Form
                  layout="horizontal"
                  name="wrap"
                  labelCol={{
                    flex: '150px',
                  }}
                  labelAlign="left"
                  labelWrap
                  wrapperCol={{
                    flex: 1,
                  }}
                  colon={false}
                >
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item className='profilestyle' style={styleFont} label="Full Name">
                      <span >{showRecord.fname + ' ' + showRecord.mname + ' ' + showRecord.lname}</span>
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={24}>
                    <Form.Item className='profilestyle' style={styleFont} label="Gender">
                      <span>{showRecord.gender ? showRecord.gender : '-'}</span>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item className='profilestyle' style={styleFont} label="Phone">
                      <span>{showRecord.phonenumber ? showRecord.phonenumber : '-'}</span>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item className='profilestyle' style={styleFont} label="Email Id">
                      <span>{showRecord.mailid ? showRecord.mailid : '-'}</span>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item className='profilestyle' style={styleFont} label="Work Location">
                      <span>{showRecord.location ? showRecord.location : '-'}</span>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <Form.Item className='profilestyle' style={styleFont} label="Reports to">
                      <span>{showRecord.repManager ? showRecord.repManager : '-'}</span>
                    </Form.Item>
                  </Col>
                </Form>
              </Col>

            </Row>
          }
        ></Card>
      </div>

      <Row gutter={[8, 8]} span={24} md={8} className="mb-24">
        <Col xs={24} sm={24} md={12} span={12}>
          <Card
            bordered={false}

            className="header-solid-one "
            style={{
              width: '100%',
              margin: '10px 10px 10px 0px',
              borderRadius: '10px'
            }}
          // bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >


            <Form
              name="wrap"
              className="wrap-one"
              labelCol={{
                flex: '220px',
              }}
              labelAlign="left"
              labelWrap
              wrapperCol={{
                flex: 1,
              }}
              colon={false}
              style={{ height: '420px' }}
            >
              <h2 style={styleFont3}>Personal Informations</h2>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Blood Group">
                  <span>{showRecord.bloodGroup ? showRecord.bloodGroup : '-'}</span>
                </Form.Item>
              </Col>
              <Col className="form-item" xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Marital Status">
                  <span>{showRecord.maritalStatus ? showRecord.maritalStatus : '-'}</span>
                </Form.Item>
              </Col>
              <Col className="form-item" xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Personal Email ID">
                  <span>{showRecord.contactEmail ? showRecord.contactEmail : '-'}</span>
                </Form.Item>
              </Col>
              <Col className="form-item" xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Alt Phone No.">
                  <span>{showRecord.altPhnNo ? showRecord.altPhnNo : '-'}</span>
                </Form.Item>
              </Col>
              <Divider style={{ margin: '0px' }} />
              <Col style={{ height: '80px' }} className="form-item" xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Current Address">
                  <span >{showRecord.currentAdd ? showRecord.currentAdd : '-'}</span>
                </Form.Item>
              </Col>
              <Col style={{ height: '80px' }} className="form-item" xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Permanent Address">
                  <span>{showRecord.permanentAdd ? showRecord.permanentAdd : '-'}</span>
                </Form.Item>
              </Col>
              <Divider style={{ margin: '0px' }} />
              <Col className="form-item" xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="House Type">
                  <span>{showRecord.houseType ? showRecord.houseType : '-'}</span>
                </Form.Item>
              </Col>
              <Col className="form-item" xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label=" Current Residence Since">
                  <span>{showRecord.scrs ? showRecord.scrs : '-'}</span>
                </Form.Item>
              </Col>
              <Col className="form-item" xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label=" Current City Since">
                  <span>{showRecord.lccs ? showRecord.lccs : '-'}</span>
                </Form.Item>
              </Col>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} span={12}>
          <Card
            bordered={false}

            className="header-solid-two "
            style={{
              width: '100 %',
              margin: '10px 0px 10px 0px',
              padding: '0px',
              borderRadius: '10px'

            }}
          // bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >


            <Form
              name="wrap"
              className="wrap-one"
              labelCol={{
                flex: '220px',
              }}
              labelAlign="left"
              labelWrap
              wrapperCol={{
                flex: 1,
              }}
              colon={false}
              style={{ height: '420px' }}
            >
              <h2 style={styleFont3}>Family Members</h2>
              <Col xs={24} sm={24} md={24}>

                <Form.Item className='profilestyle' style={styleFont} label="Father Name">
                  <span>{showRecord.father ? showRecord.father : '-'}</span>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Contact no.">
                  <span>{showRecord.fatherContact ? showRecord.fatherContact : '-'}</span>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: '30px' }} />
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Mother Name">
                  <span>{showRecord.mother ? showRecord.mother : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Contact no.">
                  <span>{showRecord.motherContact ? showRecord.motherContact : '-'}</span>
                </Form.Item>
              </Col>
              <Divider style={{ marginTop: '30px' }} />
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Other">
                  <span>{showRecord.other ? showRecord.other : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Relation">
                  <span>{showRecord.otherContact ? showRecord.otherContact : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Contact no.">
                  <span>{showRecord.phonenumber ? showRecord.phonenumber : '-'}</span>
                </Form.Item>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row gutter={[8, 8]} span={24} md={8} className="mb-24">
        <Col xs={24} sm={24} md={12} span={12}>
          <Card
            bordered={false}

            className="header-solid-three "
            style={{
              width: '100%',
              margin: '0px 10px 10px 0px',
              borderRadius: '10px'
            }}
          // bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >


            <Form
              name="wrap"
              className="wrap-one"
              labelCol={{
                flex: '220px',
              }}
              labelAlign="left"
              labelWrap
              wrapperCol={{
                flex: 1,
              }}
              colon={false}
              style={{ height: '250px' }}
            >
              <h2 style={styleFont3}>Bank information</h2>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Bank name">
                  <span>{showRecord.bankName ? showRecord.bankName : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Bank account No.">
                  <span>{showRecord.accountNumber ? showRecord.accountNumber : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="IFSC Code">
                  <span>{showRecord.ifscCode ? showRecord.ifscCode : '-'}</span>
                </Form.Item>
              </Col>


            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} span={12}>
          <Card
            bordered={false}

            className="header-solid-four "
            style={{
              width: '100 %',
              margin: '0px 0px 10px 0px',
              padding: '0px',
              borderRadius: '10px'
            }}
          // bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >


            <Form
              name="wrap"
              className="wrap-one"
              labelCol={{
                flex: '220px',
              }}
              labelAlign="left"
              labelWrap
              wrapperCol={{
                flex: 1,
              }}
              colon={false}
              style={{ height: '250px' }}
            >
              <h2 style={styleFont3}>Higher Education Info</h2>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Course Name">
                  <span>{showRecord.courseName ? showRecord.courseName : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Course Type">
                  <span>{showRecord.courseType ? showRecord.courseType : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Stream">
                  <span>{showRecord.stream ? showRecord.stream : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Course Start Date">
                  <span>{showRecord.courseStartDate ? showRecord.courseStartDate : '-'}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item className='profilestyle' style={styleFont} label="Course End Date">
                  <span>{showRecord.courseEndDate ? showRecord.courseEndDate : '-'}</span>
                </Form.Item>
              </Col>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row gutter={[8, 8]} span={24} md={8} className="mb-24">
        {/* //-----------work-- */}
        <Col span={24}>
          <Card
            bordered={false}

            className="header-solid-five "
            style={{
              width: '100 %',
              margin: '0px 0px 0px 0px',
              padding: '0px',
              borderRadius: '10px'
            }}
          // bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <div className="timeline-box">
              <h2 style={styleFont3}>Experience Certificate</h2>
              <Timeline
                className="timelinelist"
              >
                {workDetails.map((t, index) => (
                  <Timeline.Item color={t.color} key={index}>
                    <Title level={5}>{t.name}</Title>
                    <Text>{t.duration}</Text>
                    <Text style={{ padding: '10px' }}>
                      <a href={t.upload} target="workName" onClick={showWorkPdfModal} >
                        {t.fileName}
                      </a></Text>
                  </Timeline.Item>
                ))}
              </Timeline>

            </div>
          </Card>
        </Col>
        <Modal
          destroyOnClose
          bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
          className="viewAppraisal"
          centered
          width={800}
          visible={isWorkModalVisible}
          footer={null}
          height="400px"
          // closable={false}
          title="Experience Document Preview"
          closeIcon={
            <div
              onClick={() => {
                document.getElementById("workName").src += "about:blank";
                setIsWorkModalVisible(false);
              }}
              style={{ color: "white" }}
            >
              X
            </div>
          }
        >
          <div style={{ position: "relative" }}>
            <Iframe
              style={{}}
              // url="#"
              width={750}
              height="400px"
              id="workName"
              className="myClassname"
              display="initial"
              position="relative"
              overflow="hidden"
              name="workName"
            />
          </div>
        </Modal>
        {/* //-----------certificate-- */}
        <Col span={24}>
          <Card
            bordered={false}

            className="header-solid h-full card-profile-information"
            style={{
              width: '100 %',
              margin: '0px 0px 00px 0px',
              padding: '0px',
              borderRadius: '10px'
            }}
          // bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <div className="timeline-box">
              <h2 style={styleFont3}>Education Certificate</h2>
              <Timeline
                className="timelinelist"
              >
                {certificationDetails.map((t, index,) => (
                  <Timeline.Item color={t.color} key={index}>
                    <Title level={5}>{t.courseTitle}</Title>
                    <Text>{t.duration}</Text>
                    <Text style={{ padding: '10px' }}>
                      <a href={t.upload} target="certificateName" onClick={showEduPdfModal} >
                        {t.fileName}
                      </a></Text>
                  </Timeline.Item>
                ))}
              </Timeline>

            </div>
          </Card>
        </Col>
        <Modal
          bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
          className="viewAppraisal"
          centered
          width={800}
          visible={isEduModalVisible}
          footer={null}
          height="400px"
          // closable={false}
          title="Education Certificate Preview"
          closeIcon={
            <div
              onClick={() => {
                document.getElementById("certificateName").src += "about:blank";
                setisEduModalVisible(false);
              }}
              style={{ color: "white" }}
            >
              X
            </div>
          }
        >
          <div style={{ position: "relative" }}>
            <Iframe
              style={{}}
              // url="#"
              width={750}
              height="400px"
              id="certificateName"
              className="myClassname"
              display="initial"
              position="relative"
              overflow="hidden"
              name="certificateName"
            />
          </div>
        </Modal>
        {/* //-----------id-- */}
        <Col span={24}>
          <Card
            bordered={false}

            className="header-solid h-full card-profile-information"
            style={{
              width: '100 %',
              margin: '0px 0px 00px 0px',
              padding: '0px',
              borderRadius: '10px'
            }}
          // bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <div className="timeline-box">
              <h2 style={styleFont3}>ID</h2>
              <Timeline
                className="timelinelist"
              >
                {id.map((t, index,) => (
                  <Timeline.Item color={t.color} key={index}>
                    <Title level={5}>{t.idtitle}</Title>
                    <Text>{t.iddescription}</Text>
                    <Text style={{ padding: '10px' }}>
                      <a href={t.upload} target="documentName" onClick={showIdPdfModal} >
                        {t.fileName}
                      </a></Text>
                  </Timeline.Item>
                ))}
              </Timeline>

            </div>
          </Card>
        </Col>
        <Modal
          bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
          className="viewAppraisal"
          centered
          width={800}
          visible={isIdModalVisible}
          footer={null}
          height="400px"
          // closable={false}
          title="ID Preview"
          closeIcon={
            <div
              onClick={() => {
                document.getElementById("documentName").src += "about:blank";
                setIdModalVisible(false);
              }}
              style={{ color: "white" }}
            >
              X
            </div>
          }
        >
          <div style={{ position: "relative" }}>
            <Iframe
              style={{}}
              // url="#"
              width={750}
              height="400px"
              id="documentName"
              className="myClassname"
              display="initial"
              position="relative"
              overflow="hidden"
              name="documentName"
            />
          </div>
        </Modal>
      </Row>
    </>
  );
}

export default EmployeeListview;
