import React from 'react';

import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { colors } from '../Utils/theme';

class SettingsScreen extends React.Component {
    render() {
      return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Header
            placement="center"
            backgroundColor={colors.darkBlue}
            centerComponent={{ text: 'SETTINGS', style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }}
          />
          <Text>Settings!</Text>
        </View>
      );
    }
  }

export default SettingsScreen;