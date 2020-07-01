import React, {Component} from 'react';
import {View, TextInput, Button, Text, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';

const API_URL =
  'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=S43EtihFsvewDZff4iK3gd7dDU3Rxca7FFsqzdhC';
export default class Home extends Component {
  state = {disabled: true, textvalue: ''};

  searchAstroidDetailsById = astroidid => {
    const {navigation} = this.props;
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
      .catch(err => {
        Alert.alert(
          'Error',
          err.message + API_DETAILS,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      });
  };

  selectRandomAstroid = () => {
    const {navigation} = this.props;
    axios
      .get(API_URL)
      .then(res => {
        if (res.data) {
          let randomnumber = Math.floor(Math.random() * 10 + 1);
          let astroidarray = res.data['near_earth_objects'];
          let length = astroidarray.length;
          let randomobj = astroidarray[randomnumber % length];
          if (randomobj) this.searchAstroidDetailsById(randomobj.id);
        }
      })
      .catch(err => {});
  };

  findAstroidById = () => {
    this.searchAstroidDetailsById(this.state.textvalue);
  };

  changeState = text => {
    if (text) this.setState({disabled: false, textvalue: text});
  };

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <TextInput
          style={{height: 40}}
          placeholder="Enter Asteroid ID"
          onChangeText={text => this.changeState(text)}
        />
        <Text>{this.state.textvalue}</Text>
        <Button
          onPress={this.findAstroidById}
          title="Submit"
          disabled={this.state.disabled}
        />
        <Button onPress={this.selectRandomAstroid} title="Random Astroid" />
      </View>
    );
  }
}
