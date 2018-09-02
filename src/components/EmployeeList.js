import React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions/index';
import { CardSection } from './common/CardSection';
import { Actions } from 'react-native-router-flux';

class EmployeeList extends React.Component {
  componentWillMount() {
    this.props.employeesFetch();
  }
  render() {
    if(!this.props.employee) {
      return <Text>Loading</Text>;
    }
    const arr = Object.keys(this.props.employee).map((key) => ({ key, value: this.props.employee[key] }));

    return (
      <View>
        <FlatList
          data={arr}
          renderItem={({item}) => {
            return (
              <TouchableWithoutFeedback onPress={() => Actions.employeeEdit({ employee : item })}>
                <View>
                  <CardSection>
                    <Text style={{ fontSize: 18, paddingLeft: 15 }}>{item.value.name}</Text>
                  </CardSection>                  
                </View>
              </TouchableWithoutFeedback>
              );
          }} 
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employee: state.employee
  };
}

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);