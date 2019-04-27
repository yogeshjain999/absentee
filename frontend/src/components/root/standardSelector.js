import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Select from 'react-select';

import {
  Row, Col,
  Label, Button,
} from 'reactstrap';


import Api from '../../api';

const StandardSelector = (props) => {
  const [loading, setLoading] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
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

  const buttonClasses = () => classnames({ 'btn-loading': studentLoading });

  const loadStudents = () => {
    setStudentLoading(true);
    props.loadStudents(division.value)
      .then(() => setStudentLoading(false))
      .catch(() => setStudentLoading(false));
  };

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
              options={standardOptions()}
              placeholder="Select Standard"
              isLoading={loading}
            />
          </Col>

          <Col sm="12" md="5">
            <Label className="mr-sm-2">Division</Label>
            <Select
              value={division}
              onChange={e => setDivision(e)}
              options={divisionOptions()}
              placeholder="Select Division"
              isLoading={loading}
            />
          </Col>

          <Col sm="12" md="2">
            <Label className="mr-sm-2">{' '}</Label>
            <div className="text-center">
              <Button
                disabled={!division.value}
                className={buttonClasses()}
                onClick={loadStudents}
              >
                Submit
              </Button>
            </div>
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
