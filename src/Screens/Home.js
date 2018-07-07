import React from 'react';

import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { colors } from '../Utils/theme';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

    render() {
      return (
        <View>
          <Header
              placement="center"
              backgroundColor={colors.darkBlue}
              centerComponent={{ text: 'HOME', style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }}
            />
          <Text>This is Home</Text>
        </View>
      );
    }
  }

export default HomeScreen;