import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'reactstrap';
import Draggable from 'react-draggable';

const StudentCard = (props) => {
  const [color, setColor] = useState('secondary');

  const onStop = (e, card) => {
    if (card.lastX > 0) { // Left Toggle
      setColor('danger');
    } else { // Right Toggle
      setColor('secondary');
    }
  };

  return (
    <div className="m-3">
      <Draggable
        axis="x"
        scale={1}
        defaultPosition={{ x: 0, y: 0 }}
        grid={[50, 50]}
        bounds={{ left: 0, right: 50 }}
        onStop={onStop}
      >
        <Card body inverse color={color} className="text-center p-1" style={{ backgroundColor: '#333', borderColor: '#333' }}>
          <CardTitle>{props.roll_no}</CardTitle>
          <CardText>{props.name}</CardText>
        </Card>
      </Draggable>
    </div>
  );
};

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  roll_no: PropTypes.number.isRequired,
};

export default StudentCard;
