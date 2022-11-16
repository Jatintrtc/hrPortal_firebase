import React, { useState, useEffect } from 'react'
import {
    // PrinterFilled,
    FileImageOutlined,
    DeleteOutlined,
    DownloadOutlined
} from "@ant-design/icons";
import { Button, Col } from 'antd';
import { Card, Input, Modal, Row, Table, Tag } from 'antd';
import HalfYearGoalForm from "./halfYearGoalForm";
import HalfyearGoalPdf from "./halfyearGoalPdf";
import "./halfYearGoal.css";
import AppraisalContext from '../../contexts/AppraisalContext';
import EmpInfoContext from '../../contexts/EmpInfoContext';
import { createPdfFromHtml } from "./../ProfileDetails/downloadLogicAppraisal";




const HalfYearGoalTable = (props) => {
    const [secondModal, setSecondModal] = useState(false)
    const [thirdModal, setThirdModal] = useState(false)
    const [editedAppraisal, setEditedAppraisal] = useState(null);
    const [downloadAppraisal, setDownloadAppraisal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [employeeRecord, setEmployeeRecord] = useState();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const [appraisalList, setAppraisalList] = useState([]);
    const [printContent, setPrintContent] = useState(null);
    const isMgr = JSON.parse(sessionStorage.getItem("isMgr"));
    const isHr = JSON.parse(sessionStorage.getItem("isHr"));


    const columns = [

        {
            title: "Employee Id",
            dataIndex: "empId",
            // fixed: "left",
            width: 100,
        },
        {
            title: "First Name",
            dataIndex: "fname",
            // fixed: "left",
            width: 120,
        },
        {
            title: "Last Name",
            dataIndex: "lname",
            // fixed: "left",
            width: 120,
        },
        {
            title: "Reporting Manager",
            dataIndex: "repManager",
            // fixed: "left",
            width: 150,
        },
        {
            title: "Self Assessment",
            dataIndex: "Selfassessment",
            // fixed: "left",
            width: 150,
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>

                status !== "" && (
                    <Tag style={{ width: '100px' }}
                        className="statusTag"
                        color={status != "empPending" ? "green" : status === "empPending" ? 'blue' : "volcano"}
                        key={status}
                    >
                        {status === 'empPending' ? 'Pending' : 'Completed'}
                    </Tag>
                ),
        },

        {
            title: "Manager Assessment",
            dataIndex: "Mangassessment",
            // fixed: "left",
            width: 140,
            ellipsis: true,
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>
                status !== "" && (
                    <Tag style={{ width: '100px' }}
                        className="statusTag"
                        color={status === "completed" ? "green" : status === "mgrPending" ? 'blue' : "volcano"}
                        key={status}
                    >
                        {status === 'completed' ? 'Completed' : 'Pending'}
                    </Tag>
                ),

        },
        {
            title: 'Evaluation Quarter',
            dataIndex: "quarter",
            width: 110,
            ellipsis: true,

        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            width: 150,

            render: (_, appraisal) => {

                return (
                    <>
                        {console.log('render', appraisal)}

                        {isHr &&
                            <Button type="primary"
                                style={{ color: 'grey', boxShadow: '0 4px 6px rgb(0 0 0 / 12%)', }}

                                className="edIt"
                                onClick={() => {

                                    setEditedAppraisal(appraisal);
                                    setSecondModal(true)

                                }}
                            >
                                {<FileImageOutlined style={{ color: 'white', }} />}

                            </Button>
                        }

                        {isHr &&
                            <Button type='danger'
                                style={{ color: 'grey', boxShadow: '0 4px 6px rgb(0 0 0 / 12%)', marginLeft: '10px' }}
                                // type="link"
                                className="edIt"
                                onClick={() => {
                                    // if (record?.status !== 'Approved')
                                    onDeleteAppraisal(appraisal);
                                }}

                            >
                                {<DeleteOutlined style={{ color: 'white', }}

                                />}
                            </Button>

                        }

                        {isHr &&
                            <Button type='secondary'
                                style={{ color: 'grey', boxShadow: '0 4px 6px rgb(0 0 0 / 12%)', marginLeft: '10px' }}
                                // type="link"
                                className="edIt"
                                onClick={() => {

                                    // setDownloadAppraisal(appraisal);
                                    // setThirdModal(true)

                                }}


                            >
                                {< HalfyearGoalPdf appraisal={appraisal}

                                />}
                            </Button>

                        }




                    </>
                );

            },
        },
    ];

    // useEffect(() => {
    //     getAppraisalList()
    // }, [])

    useEffect(() => {
        getAppraisalList()
    }, [props])

    const getAppraisalList = async () => {

        let allData = []
        let empRecord = await EmpInfoContext.getEduDetails(currentUser.uid)
        setEmployeeRecord(empRecord)
        if (props.listType === 'hr') {
            allData = await AppraisalContext.getAllMidYearAppraisal();
        }
        else if (props.listType === 'emp') {
            allData = await AppraisalContext.getUserMidYearAppraisal(empRecord.empId)
        }
        else if (props.listType === 'mgr') {
            allData = await AppraisalContext.getManagerMidYearAppraisal(empRecord.fname + ' ' + empRecord.lname)

        }

        allData.docs.map((doc) => {
            let d = allData.docs.map((doc) => {

                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            console.log('appraisalLIST3', d)
            setAppraisalList(d)
        });
    }
    const onDeleteAppraisal = (appraisal) => {
        console.log('deleteappraisal', appraisal)
        Modal.confirm({
            title: "Are you sure, you want to delete Appraisal?",
            okText: "Yes",
            okType: "danger",

            onOk: () => {
                AppraisalContext.deleteMidYearAppraisal(appraisal.id)
                    .then(response => {
                        console.log(response);
                        getAppraisalList()
                    })
                    .catch(error => {
                        console.log(error.message);

                    })
            },
        });
    };

    return (
        <div className="app-tab" style={{ width: '100%', paddingLeft: '10px', paddingRight: '10px', }}>
            <Row style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white',
                borderRadius: '10px', padding: '10px', marginTop: '10px'
            }}
            >
                <Col span={24} style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black', width: '100rem'
                }}><h3>{props.title}</h3></Col>

                <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                    background: 'flex', padding: '10px',
                }} >

                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={appraisalList}
                        bordered={false}

                        pagination={{
                            position: ["bottomCenter"],
                        }}
                        scroll={{ x: 800 }}
                        className="employeeAppraisalTable"
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                        size="small"
                        onClick={() => {
                            // if (record?.status !== 'Approved')
                            onDeleteAppraisal();
                        }}
                    />
                </Col>
            </Row>

            <Modal className='viewAppraisalModal'
                footer={null}
                title="Appraisal Form"
                // centered
                open={secondModal}
                visible={secondModal}
                onOk={() => setSecondModal(false)}
                // onCancel={() => setSecondModal(false)}
                width={800}
                closeIcon={
                    <div
                        onClick={() => {
                            setSecondModal(false);
                        }}
                        style={{ color: "#ffffff" }}
                    >
                        X
                    </div>
                }
            >
                <HalfYearGoalForm currentEmployee={employeeRecord} appraisal={editedAppraisal} setSecondModal={setSecondModal} hrMode={props.listType === 'hr'} />

            </Modal>

            {/* <Modal className='viewAppraisalModal'

                footer={null}
                // title={<Button
                //     className="button"
                //     style={{
                //         background: "#1890ff",
                //         color: "white",

                //     }}
                //     type="button"
                //     onClick={() => {
                //         createPdfFromHtml();
                //     }}
                // >
                //     Download
                // </Button>}
                // centered
                open={thirdModal}
                visible={thirdModal}
                onOk={() => setThirdModal(false)}
                // onCancel={() => setThirdModal(false)}
                width={200}

                closeIcon={
                    <div
                        onClick={() => {
                            setThirdModal(false);
                        }}
                        style={{ color: "" }}
                    >
                        X
                    </div>
                }

            >
                <div className="mainBorder A4" id="appraisal">
                    <div

                    >
                        <HalfyearGoalPdf appraisal={editedAppraisal} />
                    </div>
                </div>


            </Modal> */}

        </div>
    )
}

export default HalfYearGoalTable