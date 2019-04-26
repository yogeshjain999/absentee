import React, { useState } from 'react';

import {
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

const StandardSelector = () => {
  const [standard, setStandard] = useState('');
  const [division, setDivision] = useState('');

  return (
    <Row>
      <Col md="2" />
      <Col md="8">
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
            <div className="text-center">
              <Button>Submit</Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StandardSelector;
