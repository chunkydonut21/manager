import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import { Card, CardSection, Input } from './common';
import { employeeUpdate } from '../actions/index';

class EmployeeForm extends React.Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name" 
            placeholder="Jane"
            value={this.props.name}
            onChangeText={(event) => this.props.employeeUpdate({ prop: 'name', value: event })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={(event) => this.props.employeeUpdate({ prop: 'phone', value: event })}
          />
        </CardSection>
        <CardSection>
          <Text style={{ fontSize: 18, paddingLeft: 20 }}>Shift</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.props.shift}
            onValueChange={(value) => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" valuWednesdaye="" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
}

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);