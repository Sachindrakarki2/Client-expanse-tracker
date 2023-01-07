import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postTrans } from "../../helpers/axiosHelpers.js";
import { toast } from "react-toastify";

const initialState = {
  type: "",
  name: "",
  amount: "",
};

export const Tform = ({ fetchingTrans }) => {
  const [formData, serFormData] = useState(initialState);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    serFormData({ ...formData, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await postTrans(formData);
    toast[status](message);
    status === "success" && fetchingTrans();
  };
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="mt-3 gap-2">
          <Col md={2}>
            <Form.Select
              name="type"
              required
              value={formData.type}
              onChange={handleOnChange}
            >
              <option value="">choose...</option>
              <option value="income">income...</option>
              <option value="expanse">Expanse</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter trans name"
              required
              value={formData.name}
              onChange={handleOnChange}
            ></Form.Control>
          </Col>
          <Col md={5}>
            <Form.Control
              name="amount"
              type="number"
              placeholder="Enter amount"
              required
              value={formData.amount}
              onChange={handleOnChange}
            ></Form.Control>
          </Col>
          <Col>
            <div>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
