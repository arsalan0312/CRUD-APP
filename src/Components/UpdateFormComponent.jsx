import { Col, Form, Row, Input, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Base_URL from "../Base_URL";
import axios from "axios";
import { Select, Space } from "antd";

const UpdateFormComponent = () => {
  let { employeeId } = useParams();
  const [departmentData, setdepartmentData] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const navigate = useNavigate();

  const getAllDepartmentData = async () => {
    try {
      const response = await axios.get(`${Base_URL}/api/departments`);
      if (response.data) {
        setdepartmentData(response.data);
        message.success("Data Received");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeeById = async () => {
    try {
      const response = await axios.get(
        `${Base_URL}/api/employees/${employeeId}`
      );
      if (response.data) {
        setEmployeeData({
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          address: response.data.address,
          phoneNumber: response.data.phoneNumber,
          departmentTypeId: response.data.departmentTypeId,
        });
        message.success("Employee Data Received");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeById();
  }, []);

  useEffect(() => {
    getAllDepartmentData();
  }, []);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleFinish = async (values) => {
    try {
      const response = await axios.put(
        `${Base_URL}/api/employees/${employeeId}`,
        {
          ...values,
        }
      );
      if (response.data) {
        navigate("/");
        message.success("Employee Updated");
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
        Update Employee
      </h1>
      {employeeData && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            phoneNumber: employeeData.phoneNumber,
            email: employeeData.email,
            address: employeeData.address,
            departmentTypeId: employeeData.departmentTypeId,
          }}
        >
          <section>
            <h4 className="font-bold text-2xl pl-1">Personal Details</h4>
            <Row>
              <Col className="p-1" xs={24} md={24} lg={8}>
                <Form.Item label="First Name" name="firstName">
                  <Input type="text" placeholder="your first name" />
                </Form.Item>
              </Col>

              <Col className="p-1" xs={24} md={24} lg={8}>
                <Form.Item label="Last Name" name="lastName">
                  <Input type="text" placeholder="your last name" />
                </Form.Item>
              </Col>

              <Col className="p-1" xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    {
                      min: 11,
                      max: 11,
                      message: "The input is not valid phone number",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    maxLength="11"
                    placeholder="your phone number"
                  />
                </Form.Item>
              </Col>

              <Col className="p-1" xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input type="text" placeholder="your email" />
                </Form.Item>
              </Col>

              <Col className="p-1" xs={24} md={24} lg={8}>
                <Form.Item label="Address" name="address">
                  <Input type="text" placeholder="your Address" />
                </Form.Item>
              </Col>

              <Col className="p-1" xs={24} md={24} lg={8}>
                <Form.Item
                  label="Department"
                  name="departmentTypeId"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Required Department",
                    },
                  ]}
                >
                  <Select
                    onChange={handleChange}
                    rules={[{ required: true }]}
                    style={{ width: 400 }}
                  >
                    {departmentData?.map((data, index) => {
                      return (
                        <Select.Option key={index} value={data.id} required>
                          {data?.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
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

export default UpdateFormComponent;
