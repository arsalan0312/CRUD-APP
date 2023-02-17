import { Col, Form, Row, Input, TimePicker, Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Base_URL from "../Base_URL";
import axios from "axios";

const CreateFormDepartment = () => {
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      const response = await axios.post(`${Base_URL}/api/departments`, {
        ...values,
      });
      if (response.data) {
        navigate("/getalldepartment");
        message.success("New Department Added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigate("/getalldepartment");
    message.warning("Cancel");
  };

  return (
    <>
      <h1 className="flex items-center justify-center font-bold text-4xl mt-20  text-sky-600">
        Create Department
      </h1>
      <Form layout="vertical" onFinish={handleFinish}>
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
          className=" float-right w-20"
          type="primary"
          danger
          htmlType="submit"
        >
          Save
        </Button>
      </Form>
      <button
        onClick={handleNavigate}
        className="  float-right mr-2 w-20 h-8 rounded-md bg-gray-500 text-white hover:bg-gray-800 transition-all"
      >
        Cancel
      </button>
    </>
  );
};

export default CreateFormDepartment;
