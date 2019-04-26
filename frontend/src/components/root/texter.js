import React from 'react';
import { Row, Col, Input } from 'reactstrap';

const Texter = () => (
  <div className="container">
    <Row>
      <Col md="2" />
      <Col md="8">
        <Input
          type="textarea"
          name="text"
          id="numbers"
          rows={10}
          placeholder="Please enter roll numbers of absent students (For eg: 1, 2, 3)"
        />
      </Col>
    </Row>
  </div>
);

export default Texter;
