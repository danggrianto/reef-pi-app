import React from 'react';

import { View, StyleSheet, Alert } from 'react-native';
import { Header, FormInput, FormLabel, Button } from 'react-native-elements';
import { colors } from '../Utils/theme';

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
      settings: null
    };
    this.connect = this.connect.bind(this);
    this.save = this.save.bind(this);
  }

  connect(){
    Alert.alert('Test Connection');
  }

  save(){
    Alert.alert('Settings saved!');
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
            <FormInput placeholder='0.0.0.0'/>
            <FormLabel>Username</FormLabel>
            <FormInput placeholder='username'/>
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry/>
            <View style={style.container}>
            <Button raised backgroundColor={colors.success} title='TEST' containerViewStyle={style.button} onPress={this.connect}/>
            <Button raised backgroundColor={colors.darkBlue} title='SAVE' containerViewStyle={style.button} onPress={this.save}/>
            </View>
          </View>
      </View>
    );
  }
}

export default SettingsScreen;