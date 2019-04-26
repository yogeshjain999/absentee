import React, { useState } from 'react';
import classnames from 'classnames';
import {
  Card, Row, Col, Button,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import StandardSelector from './standardSelector';
import Students from './students';
import Texter from './texter';

const Root = () => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className="mt-5 col-md-12">
      <StandardSelector />

      <Row className="mt-5">
        <Col md="2" />
        <Col md="8">
          <Card body outline color="secondary">
            <Nav tabs className="mt-3">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { setActiveTab('1'); }}
                >
                  Swiper
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { setActiveTab('2'); }}
                >
                  Texter
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className="mt-3">
              <TabPane tabId="1">
                <Students />
              </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab} className="mt-3">
              <TabPane tabId="2">
                <Texter />
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>

      <div className="m-5 text-center">
        <Button color="success">Save</Button>
      </div>
    </div>
  );
};

export default Root;
