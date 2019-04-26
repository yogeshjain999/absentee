import React, { useState } from 'react';

import {
  Card,
  Row, Col,
  Label, Button,
} from 'reactstrap';

import Select from 'react-select';

const standards = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
];

const divisions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
];

const Root = () => {
  const [standard, setStandard] = useState('');
  const [division, setDivision] = useState('');

  return (
    <div className="mt-5 col-md-12">
      <Row>
        <Col md="2" />
        <Col md="8">
          <Card body outline color="secondary">
            <Row>
              <Col sm="12" md="5" className="mb-3">
                <Label className="mr-sm-2">Standard</Label>
                <Select
                  value={standard}
                  onChange={e => setStandard(e)}
                  options={standards}
                  placeholder="Select Standard"
                />
              </Col>

              <Col sm="12" md="5">
                <Label className="mr-sm-2">Division</Label>
                <Select
                  value={division}
                  onChange={e => setDivision(e)}
                  options={divisions}
                  placeholder="Select Division"
                />
              </Col>

              <Col sm="12" md="2">
                <Label className="mr-sm-2">{' '}</Label>
                <div>
                  <Button>Submit</Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Root;
