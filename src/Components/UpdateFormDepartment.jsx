import { Col, Form, Row, Input, TimePicker, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Base_URL from "../Base_URL";
import axios from "axios";

const UpdateFormDepartment = () => {
  let { departmentTypeId } = useParams();
  const [departmentData, setdepartmentData] = useState(null);
  const navigate = useNavigate();

  const getdepartmentById = async () => {
    try {
      const response = await axios.get(
        `${Base_URL}/api/departments/${departmentTypeId}`
      );
      if (response.data) {
        setdepartmentData({
          name: response.data.name,
          description: response.data.description,
        });
        message.success("Department Data Received");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdepartmentById();
  }, []);

  const handleFinish = async (values) => {
    try {
      const response = await axios.put(
        `${Base_URL}/api/departments/${departmentTypeId}`,
        {
          ...values,
        }
      );
      if (response.data) {
        navigate("/getalldepartment");
        message.success("Department Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigate("/");
    message.warning("Cancel");
  };

  return (
    <>
      <h1 className="flex items-center justify-center font-bold text-4xl mt-20 text-sky-600">
        Update department
      </h1>
      {departmentData && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            name: departmentData.name,
            description: departmentData.description,
          }}
        >
          <section>
            <h4 className="font-bold text-2xl pl-1">Department Details</h4>
            <Row>
              <Col className="p-1" xs={24} md={24} lg={24}>
                <Form.Item
                  label="Name"
                  name="name"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your department name" />
                </Form.Item>
              </Col>

              <Col className="p-1" xs={24} md={24} lg={24}>
                <Form.Item
                  label="Description"
                  name="description"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your description" />
                </Form.Item>
              </Col>
            </Row>
          </section>
          <Button
            className=" float-right w-20 "
            type="primary"
            danger
            htmlType="submit"
          >
            Save
          </Button>
        </Form>
      )}
      <button
        onClick={handleNavigate}
        className="  float-right mr-2 w-20 h-8 rounded-md bg-gray-500 text-white hover:bg-gray-800 transition-all"
      >
        Cancel
      </button>
    </>
  );
};

export default UpdateFormDepartment;
