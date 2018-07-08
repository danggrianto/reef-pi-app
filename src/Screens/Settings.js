import React from 'react';

import { View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Header, FormInput, FormLabel, Button } from 'react-native-elements';
import { colors } from '../Utils/theme';

const base64 = require('base-64');

const style = StyleSheet.create({
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  },
  container: {
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  button: {
    paddingTop:10,
    width: '45%'
  }
});

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: null,
      username: null,
      password: null
    };
    this.connect = this.connect.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this._fetchSettings = this._fetchSettings.bind(this);
  }

  connect(){
    this.saveSettings()
    var url = 'http://' + this.state.ip + '/api/settings'
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(this.state.username+':'+this.state.password));
    fetch(url, { 
      method: 'get', 
      headers: headers
    })
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    }).then(function(response) {
      Alert.alert('Success')
    }).catch(function(error) {
      Alert.alert('Unable to connect')
      console.log(error);
    });
  }

  componentWillMount(){
    this._fetchSettings()
  }

  _fetchSettings = async () => {
    try {
      const ip = await AsyncStorage.getItem('@ReefPi:ip');
      if (ip !== null) {
        this.setState({ip})
      }
      const username = await AsyncStorage.getItem('@ReefPi:username');
      if (username !== null) {
        this.setState({username})
      }
      const password = await AsyncStorage.getItem('@ReefPi:password');
      if (password !== null) {
        this.setState({password})
      }
     } catch (error) {
       console.log(error)
     }
  }

  saveSettings = async () => {
    try {
      await AsyncStorage.setItem('@ReefPi:ip', this.state.ip);
      await AsyncStorage.setItem('@ReefPi:username', this.state.username);
      await AsyncStorage.setItem('@ReefPi:password', this.state.password);
    } catch (error) {
      console.log('ERROR SAVING DATA');
      Alert.alert('Error saving data');
    }
  }
    
  render() {
    return (
      <View>
          <Header
          placement="center"
          backgroundColor={colors.darkBlue}
          centerComponent={{ text: 'SETTINGS', style:style.header}}/>
          <View style={{padding:10}}>
            <FormLabel>IP Address</FormLabel>
            <FormInput placeholder='0.0.0.0'
              autoCapitalize='none'
              onChangeText={(text) => this.setState({ip: text})}
              value={this.state.ip}/>
            <FormLabel>Username</FormLabel>
            <FormInput placeholder='username'
              autoCapitalize='none'
              onChangeText={(text) => this.setState({username: text})}
              value={this.state.username}/>
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry placeholder='password'
              autoCapitalize='none'
              onChangeText={(text) => this.setState({password: text})}
              value={this.state.password}/>
            <View style={style.container}>
            <Button raised backgroundColor={colors.success} title='TEST' containerViewStyle={style.button} onPress={this.connect}/>
            <Button raised backgroundColor={colors.darkBlue} title='SAVE' containerViewStyle={style.button}
              onPress={()=>{
                this.saveSettings()
                Alert.alert('Settings saved!')
              }}/>
            </View>
          </View>
      </View>
    );
  }
}

export default SettingsScreen;