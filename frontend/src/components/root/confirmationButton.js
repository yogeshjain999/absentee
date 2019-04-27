import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

class ConfirmButton extends PureComponent {
  state = {
    open: false,
  };

  toggle = () => { this.setState(prevState => ({ open: !prevState.open })); }

  onConfirm = () => {
    this.props.onConfirm();
    this.toggle();
  }

  render() {
    const {
      title, onConfirm, ...buttonProps
    } = this.props;

    return (
      <Fragment>
        <Button {...buttonProps} onClick={this.toggle}>
          {this.props.children}
        </Button>

        <Modal isOpen={this.state.open} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            You have marked
            {' '}
            {this.props.students.length}
            {' '}
            students as absent.
            <br />
            Once the attendance is submitted, this action can not be undone.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onConfirm}>Yes</Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

ConfirmButton.defaultProps = {
  title: 'Are you sure ?',
};

ConfirmButton.propTypes = {
  title: PropTypes.string,
  students: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,

  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmButton;
