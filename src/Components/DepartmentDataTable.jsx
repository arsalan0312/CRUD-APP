import React from "react";
import { Table, message, Button, Modal } from "antd";
import { useState, useEffect } from "react";
import Base_URL from "../Base_URL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const DepartmentDataTable = () => {
  const navigate = useNavigate();
  const [departmentData, setdepartmentData] = useState([]);

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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
    navigate(`/updatedepartment/${record?.id}`);
  };

  const handleDeleteRecord = async (jobTypeId) => {
    try {
      const response = await axios.delete(
        `${Base_URL}/api/departments/${jobTypeId}`
      );
      if (response.data) {
        getAlldepartmentData();
        message.warning("Department is Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAlldepartmentData = async () => {
    try {
      const response = await axios.get(`${Base_URL}/api/departments`);
      if (response.data) {
        setdepartmentData(response.data);
        message.success("Data Recieved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNew = () => {
    navigate("/createdepartment");
  };

  useEffect(() => {
    getAlldepartmentData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-20 mb-10 ">
        <h1 className="flex items-center justify-center font-bold text-4xl  text-sky-600">
          Department List
        </h1>

        <Modal
          type="danger"
          title="Delete Department"
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

      <Table columns={columns} dataSource={departmentData} />
    </>
  );
};

export default DepartmentDataTable;
