import React from 'react';
import { Row, Col, Card } from 'reactstrap';

import StudentCard from './studentCard';

const list = [
  { name: 'Priyanka Yadav', roll_no: 1 },
  { name: 'Payal Bhalerao', roll_no: 2 },
  { name: 'Anil Kumar', roll_no: 3 },
  { name: 'Akshay Birajdar', roll_no: 4 },
];

const Students = () => (
  <div className="container">

    {/* Desktop View */}
    <div className="d-sm-none d-md-block">
      <Row>
        <Col md="2" />
        <Col md="8">
          <Card body outline color="secondary">
            <Row>
              <Col sm="8" md="11">
                {list.map(student => <StudentCard key={student.roll_no} {...student} />)}
              </Col>

              <Col sm="4" md="1" />
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
);

export default Students;
