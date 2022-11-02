import React, { useState } from 'react';
import {
    Col,
    Row,
    Table,
    Modal,
    Input
} from 'antd';
import LeaveContext from '../contexts/LeaveContext'
import "../style/leave.css";
import checkedIcon from "../images/checkmark.png"
import rejectIcon from "../images/rejected.png"

const Notification = ({ data }) => {
    const [dataSource, setDataSource] = useState(data);
    let value = '';

    const Bbb = () => {
        return (
            <Input
                placeholder="Enter Comment"
                onChange={(event) => { value = event.target.value }}
            />
        );
    };

    const onApproveLeave = (record) => {
        Modal.confirm({
            title: `Are you sure, you want to approve Leave of ${record?.name || ''}!`,
            okText: "Yes",
            okType: "primary",
            onOk: () => {
                LeaveContext.approveLeave(record.id, record.name)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error.message);

                    })
            },
        });
    };

    const onRejectedLeave = (record) => {
        Modal.confirm({
            title: `Are you sure, you want to reject Leave of ${record?.name || ''}!`,
            content: <Bbb />,
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                LeaveContext.rejectLeave(record.id, record.name, value)
                    .then(response => {
                        console.log(response);
                        // getData();
                    })
                    .catch(error => {
                        console.log(error.message);

                    })
            },
        });
    };


    const columns = [
        {
            title: 'Duration',
            dataIndex: 'date',
            width: 240,
            align: "left",
            sorter: (a, b) => {
                return a.date !== b.date ? (a.date < b.date ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],


        },
        {
            title: 'Employee Name',
            dataIndex: 'name',
            align: "left",
            width: 150,
            sorter: (a, b) => {
                return a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],


        },
        {
            title: 'Nature of Leave',
            dataIndex: 'nature',
            align: "left",
            width: 150,

        },
        // {
        //     title: 'Slot',
        //     dataIndex: 'slot',
        //     width: 100,
        //     align: "left",
        //     sorter: (a, b) => {
        //         return a.slot !== b.slot ? (a.slot < b.slot ? -1 : 1) : 0;
        //     },
        //     sortDirections: ["ascend", "descend"],


        // },
        {
            title: 'No. Of Days',
            dataIndex: 'len',
            width: 100,
            align: "left",
            sorter: (a, b) => {
                return a.len !== b.len ? (a.len < b.len ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],


        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            align: "left",
            width: 150,
        },
        {
            key: "5",
            title: "Actions",
            fixed: 'right',
            width: 80,
            render: (record) => {
                return (
                    <>
                        {

                            <>{

                            }
                                <img
                                    style={{ color: "white", width: '20px', marginRight: 10 }}
                                    src={checkedIcon}
                                    alt="profile"
                                    className="Dash"
                                    onClick={() => {
                                        onApproveLeave(record);

                                    }}
                                />

                                <img
                                    style={{ color: "white", width: '20px', marginRight: 10 }}
                                    src={rejectIcon}
                                    alt="profile"
                                    className="Dash"
                                    onClick={() => {
                                        onRejectedLeave(record);
                                    }}

                                />
                            </>
                        }
                    </>
                );
            },
        }

    ];

    return (
        <Row style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white',
            borderRadius: '10px', padding: '10px', marginTop: '10px'
        }}
        >
            <Col span={24} style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black', width: '100rem'
            }}><h3>Leave Requested</h3></Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                background: 'flex', padding: '10px',
            }} >

                <div>
                    <Table columns={columns}
                        dataSource={dataSource}
                        pagination={{
                            position: ["bottomCenter"],
                        }}
                        scroll={{ x: 600 }}
                        size="small" />
                </div>
            </Col>
        </Row>

    )
}

export default Notification