import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'reactstrap';
import Draggable from 'react-draggable';

import attendanceActions from '../../actionCreators/attendance';

const StudentCard = (props) => {
  const [color, setColor] = useState(props.isAbsent ? 'danger' : 'secondary');

  useEffect(() => {
    setColor(props.isAbsent ? 'danger' : 'secondary');
  }, [props.isAbsent]);

  const positionTransform = () => (
    props.isAbsent ? { x: 50, y: 0 } : { x: 0, y: 0 }
  );

  const onStop = (e, card) => {
    if (card.lastX > 0) { // Left Toggle
      setColor('danger');
      props.markAbsent({ roll_no: props.roll_no });
    } else { // Right Toggle
      setColor('secondary');
      props.markPresent({ roll_no: props.roll_no });
    }
  };

  return (
    <div className="m-3">
      <Draggable
        axis="x"
        scale={1}
        defaultPosition={{ x: 0, y: 0 }}
        position={positionTransform()}
        grid={[50, 50]}
        bounds={{ left: 0, right: 50 }}
        onStop={onStop}
        disabled={props.disabled}
      >
        <Card
          body
          inverse
          color={color}
          className="text-center p-1"
          style={{ backgroundColor: '#333', borderColor: '#333', transform: positionTransform() }}
        >
          <CardTitle>{props.roll_no}</CardTitle>
          <CardText>{props.name}</CardText>
        </Card>
      </Draggable>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  markPresent(student) {
    dispatch(attendanceActions.markPresent(student));
  },
  markAbsent(student) {
    dispatch(attendanceActions.markAbsent(student));
  },
});

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  roll_no: PropTypes.number.isRequired,
  isAbsent: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  markAbsent: PropTypes.func.isRequired,
  markPresent: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(StudentCard);
