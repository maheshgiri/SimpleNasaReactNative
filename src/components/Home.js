import React, {Component} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';

const API_URL =
  'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=S43EtihFsvewDZff4iK3gd7dDU3Rxca7FFsqzdhC';
export default class Home extends Component {
  state = {};

  searchAstroidDetailsById = astroidid => {
    let API_DETAILS =
      'https://api.nasa.gov/neo/rest/v1/neo/' +
      astroidid +
      '?api_key=S43EtihFsvewDZff4iK3gd7dDU3Rxca7FFsqzdhC';
    axios
      .get(API_DETAILS)
      .then(res => {
        if (res.data) {
          navigation.navigate('Details', {
            name: res.data.name,
            nasa_jpl_url: res.data.nasa_jpl_url,
            is_potentially_hazardous_asteroid:
              res.data.is_potentially_hazardous_asteroid,
          });
        }
      })
      .catch(err => {});
  };

  selectRandomAstroid = () => {
    const {navigation} = this.props;
    axios
      .get(API_URL)
      .then(res => {
        navigation.navigate('Details', {item: res});
      })
      .catch(err => {
        navigation.navigate('Details', {item: err});
      });
  };

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <TextInput
          style={{height: 40}}
          placeholder="Enter Asteroid ID"
          onChangeText={text => this.setState({inputtext: text})}
        />
        <Text>{this.state.inputtext}</Text>
        <Button
          onPress={() => navigation.navigate('Details', {item: 'Hi'})}
          title="Submit"
        />
        <Button onPress={this.selectRandomAstroid} title="Random Astroid" />
      </View>
    );
  }
}
