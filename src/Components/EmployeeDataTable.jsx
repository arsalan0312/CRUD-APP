import React from "react";
import { Table, Modal } from "antd";
import { useState, useEffect } from "react";
import Base_URL from "../Base_URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { height } from "@mui/system";

const EmployeeDataTable = () => {
  const navigate = useNavigate();
  const [employeeData, setemployeeData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setdeletedId] = useState("");

  const showModal = (record) => {
    setIsModalOpen(true);
    setdeletedId(record?.id);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleDeleteRecord(deletedId);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text, record) => <div>{record.departmentTypes?.name}</div>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button
            onClick={() => handleEditRecord(record)}
            className=" w-10 h-10 rounded-xl bg-blue-500 text-white hover:bg-blue-800 transition-all"
          >
            <CreateIcon />
          </button>
          <button
            // onClick={() => handleDeleteRecord(record)}
            onClick={() => showModal(record)}
            className="ml-2 w-10 h-10 rounded-xl bg-red-500 text-white hover:bg-red-800 transition-all"
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const handleEditRecord = (record) => {
    navigate(`/update/${record?.id}`);
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await axios.delete(`${Base_URL}/api/employees/${id}`);
      if (response.data) {
        getAllEmployeeData();
        message.warning("Employee is Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllEmployeeData = async () => {
    try {
      const response = await axios.get(`${Base_URL}/api/employees`);
      if (response.data) {
        setemployeeData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNew = () => {
    navigate("/create");
  };

  useEffect(() => {
    getAllEmployeeData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-20 mb-10 ">
        <h1 className="flex items-center justify-center font-bold text-4xl  text-sky-600">
          Employee List
        </h1>

        <Modal
          type="danger"
          title="Delete Employee"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: "none" } }}
        >
          <p>Are you sure you want to delete</p>

          <button
            onClick={handleOk}
            className=" ml-2 z-20 float-right mt-3 w-20 h-8 rounded-md bg-blue-500 text-white hover:bg-blue-800 transition-all"
          >
            <h1 className="ml-2">Ok</h1>
          </button>
        </Modal>

        <button
          onClick={() => handleCreateNew()}
          className=" float-right w-28 h-10 rounded-md bg-blue-500 text-white hover:bg-blue-800 transition-all"
        >
          <div className="flex justify-center items-center">
            <AddIcon />
            <h1 className="ml-2">Create</h1>
          </div>
        </button>
      </div>

      <Table columns={columns} dataSource={employeeData} />
    </>
  );
};

export default EmployeeDataTable;
