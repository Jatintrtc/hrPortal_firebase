import React,{useState, useEffect} from 'react'
import { useAuth } from "../../contexts/AuthContext";
import { 
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import FormItem from "antd/es/form/FormItem";

import { 
  Table,
  Form,
  Button,
  Input,
  Modal,
  notification,
} from 'antd'
import DocumentContext from '../../contexts/DocumentContext';

function IDTags() {
const [allIdDetails, setAllIdDetails] = useState([])
const [form]=Form.useForm()
const { currentUser } = useAuth();
const [file, setFile] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);

function handleChange(event) {
    setFile(event.target.files[0]);
}

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields()
  };
  const handleOk = () => {
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };

  async function addNewDetail (values) {
    try {
      await DocumentContext.addDocument({...values,empId:currentUser.uid,type:"id"}, file)
      setIsModalOpen(false);
      showNotification("success", "Success", "Upload Complete");
      const timer = setTimeout(() => {
        getData();
      }, 5000);
      return () => clearTimeout(timer);
    } catch {
      setIsModalOpen(false);
      showNotification("error", "Error", "Upload Failed");
    }
  };

  const showNotification = (type, msg, desc) => {
    notification[type]({
        message: msg,
        description: desc,
    });
};

  const deleteData = (id, fileName) => {
    Modal.confirm({
        title: "Are you sure, you want to delete this record?",
        okText: "Yes",
        okType: "danger",

        onOk: () => {
          DocumentContext.deleteDocument(currentUser.uid, id, fileName)
                .then(response => {
                  showNotification("success", "Success", "Successfully deleted");
                  getData();
                })
                .catch(error => {
                  showNotification("error", "Error", "Record not deleted");
                })
        },
    });
  };
  useEffect(()=>{
    getData();
  },[]);
  const getData = async () => {
    let alldata = await DocumentContext.getDocument(currentUser.uid, "id");
    setAllIdDetails(alldata);
  };
  
  const columns = [
    {
      title: 'ID Title',
      dataIndex: 'idtitle',
      key: 'idtitle',
    },
    {
      title: 'ID Description',
      dataIndex: 'iddescription',
      key: 'iddescription ',
    },
    {
      title: "Uploaded File",
      dataIndex: "upload",
      key: "upload",
      render: (data, record) => {
        return record.fileName? (
          <a href={data} target="_blank">
            {record.fileName}
          </a>
        ) : (
          <div>-</div>
        )
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <DeleteOutlined
                          onClick={() => deleteData(record.id, record.fileName)}
                      />
      );
    },
  },
  ];
  return (
    <>
      <Table 
        columns={columns}
        pagination={false}
        dataSource={allIdDetails}
      />
      <Button type="primary" onClick={showModal} style={{marginLeft:"10px"}} >
        <PlusCircleOutlined />
        Add
      </Button>
      <Modal
        title="Add IDs"
        open={isModalOpen}
        onOk={()=>{form.submit(); handleOk()}}
        onCancel={handleCancel}
        okText="Save" 
      >
        <Form
        form={form}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={addNewDetail}
          layout="vertical"
        >
          <FormItem 
          name="idtitle"
          rules={[
            {
              pattern: /^[a-zA-Z\s]*$/,
              required: true,
              message: 'Enter the ID Name',
            },
          ]}
          >
            <Input placeholder="Enter ID Name" 
            required/>
          </FormItem>
          <FormItem 
          name="iddescription"
          rules={[
            {
              pattern: /^[0-9A-Z\s]*$/,
              required: true,
              message: 'Enter ID Number',
            },
          ]}
          >
            <Input placeholder="Enter ID Number"
            required />
          </FormItem>
          <FormItem 
          name="upload"
          rules={[
            {
              required: false,
              message: 'Please upload file',
            },
          ]}
          >
            <div className='idpage'>
          <Input
              type="file"
              // accept="image/gif, image/jpeg, image/png"
              id="upload"
              name="upload"
              onChange={handleChange}
            />
            </div>
          {/* <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
          </FormItem>
        </Form>
      </Modal>
    </>
  )
}

export default IDTags
