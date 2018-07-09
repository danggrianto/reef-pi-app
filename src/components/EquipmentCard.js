import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, ButtonGroup, Text } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import { colors } from '../Utils/theme';

const styles = StyleSheet.create({
    card: {
        padding: 0
    },
    header: {
        margin:10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize:20
    },
    selectedButton: {
        backgroundColor: colors.primary
    },
    selectedText: {
        color: 'white'
    }
});

// const buttons = ['OFF', 'AUTO', 'ON']
const buttons = ['OFF', 'ON']

export default class EquipmentCard extends Component {
  constructor(props) {
    super(props);
    this.setNativeProps = this.setNativeProps.bind(this);
  }

  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  renderCard() {
    const status = this.props.on? 'ON':'OFF'
    const selectedIndex = buttons.indexOf(status)
    const statusIcon = 'ios-radio-button-on'
    let statusColor = status==='ON'? 'green': 'red'
    return (
        <Card containerStyle={styles.card}>
            <View style={styles.header}>
                <Text style={styles.name}>{this.props.name}</Text>
                <Text><Ionicons name={statusIcon} size={12} color={statusColor} /> {status}</Text>
            </View>
            <ButtonGroup
                buttons={buttons}
                onPress={(index)=> this.props.toggleEquipment(this.props.id, buttons[index])}
                selectedIndex={selectedIndex}
                selectedButtonStyle={styles.selectedButton}
                selectedTextStyle={styles.selectedText}
                />
        </Card>
    );
  }
  render() {
    return <View ref={component => (this._root = component)}>{this.renderCard()}</View>;
  }
}
