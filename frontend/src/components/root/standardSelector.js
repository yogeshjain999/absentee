import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import {
  Row, Col,
  Label,
} from 'reactstrap';


import Api from '../../api';

const StandardSelector = (props) => {
  const [loading, setLoading] = useState(false);
  const [standards, setStandards] = useState([]);
  const [standard, setStandard] = useState({});
  const [division, setDivision] = useState({});

  useEffect(() => {
    if (standards.length === 0) {
      setLoading(true);
      Api.standards()
        .then((response) => {
          setStandards(response.data.data);
          setLoading(false);
        });
    }
  }, [standards]);

  const standardOptions = () => (
    Object.keys(standards).map(std => ({ label: std, value: std }))
  );

  const divisionOptions = () => {
    if (!standards[standard.value]) return [];
    return standards[standard.value].map(dvsn => ({ label: dvsn.name, value: dvsn.id }));
  };

  return (
    <Row>
      <Col md="2" />
      <Col md="8">
        <Row>
          <Col sm="12" md="5" className="mb-3">
            <Label className="mr-sm-2">Select Standard</Label>
            <Select
              value={standard}
              onChange={(e) => { setStandard(e); setDivision({}); }}
              options={standardOptions()}
              placeholder="Select Standard"
              isLoading={loading}
            />
          </Col>

          <Col sm="12" md="5">
            <Label className="mr-sm-2">Select Division</Label>
            <Select
              value={division}
              onChange={(e) => { setDivision(e); props.loadStudents(e.value); }}
              options={divisionOptions()}
              placeholder="Select Division"
              isLoading={loading}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

StandardSelector.propTypes = {
  loadStudents: PropTypes.func.isRequired,
};

export default StandardSelector;
