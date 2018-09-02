import React from 'react';
import { View, Text } from 'react-native';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions/index';

class EmployeeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }
  componentWillMount() {
    const { name, phone, shift } = this.props.employee.value;
    this.props.employeeUpdate({ prop: 'name', value: name });
    this.props.employeeUpdate({ prop: 'phone', value: phone });
    this.props.employeeUpdate({ prop: 'shift', value: shift });
  }

  onButtonPress = () => {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({ name: name, phone: phone, shift: shift, uid: this.props.employee.key });
  }

  onTextPress = () => {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }
  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={() => this.onButtonPress()}>Save Changes</Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.onTextPress()}>Text Schedule</Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>Fire Employee</Button>
        </CardSection>
        <Confirm 
          visible={this.state.showModal}
          onAccept={() => this.props.employeeDelete({ uid: this.props.employee.key })}
          onDecline={() => this.setState({ showModal: false })}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>      
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
}

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);