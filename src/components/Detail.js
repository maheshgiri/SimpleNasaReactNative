import React, {Component} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

export default class Detail extends Component {
  state = {};
  componentWillMount() {
    const {route} = this.props;
  }

  render() {
    const {route} = this.props;
    const {data} = this.state;
    return (
      <View>
        <Text>name : {route.params.name}</Text>
        <Text>nasa_jpl_url : {route.params.nasa_jpl_url}</Text>
        <Text>
          is_potentially_hazardous_asteroid :
          {route.params.is_potentially_hazardous_asteroid}
        </Text>
      </View>
    );
  }
}
