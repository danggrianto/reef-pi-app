import React from 'react';

import { View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Header, Card, List, ListItem, Button, Text } from 'react-native-elements';
import { LineChart } from 'react-native-svg-charts'
import { createStackNavigator } from 'react-navigation'

import { colors } from '../Utils/theme';
import { fetchEquipments, fetchHealth } from '../Services/api'

const styles = StyleSheet.create({
  cardContainer: {paddingHorizontal:5, paddingBottom:0},
  cardDivider: {marginBottom:0, height:0}
})

class ModalScreen extends React.Component {
  render() {
    return (
      <View>
        <Header
        placement="center"
        backgroundColor={colors.darkBlue}
        leftComponent={{
          icon: 'close',
          color: 'white',
          onPress: () => this.props.navigation.goBack(),
        }}
        centerComponent={{ text: 'DASHBOARD', style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }}
      />
        <Text>Hello Modal</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments: null,
      health: null
    };
  }

  componentWillMount (){
    fetchEquipments().then(equipments => {
      this.setState({equipments})
    })
    fetchHealth().then(health => {
      this.setState({health})
    })
  }

  renderEquipments (){
    return (
      <TouchableWithoutFeedback onPress={ () => this.props.navigation.navigate('Controllers')}>
      <Card title='Equipments' containerStyle={styles.cardContainer} dividerStyle={styles.cardDivider}>
          <List containerStyle={{marginTop:0}}>
          { this.state.equipments.map((equipment) => (
              <ListItem
                key={equipment.id}
                title={equipment.name}
                rightIcon={{name:'ios-radio-button-on', type:'ionicon', color:equipment.on?'green':'red'}}
              />
            ))
          }
        </List>
      </Card>
      </TouchableWithoutFeedback>
    );
  }

  renderChart(title, data, xdata){
    return (
      <TouchableWithoutFeedback onPress={ () => this.props.navigation.navigate('Modal')}>
      <Card title={title} containerStyle={styles.cardContainer} dividerStyle={styles.cardDivider}>
        <LineChart
            style={{ height: 200 }}
            data={ data }
            svg={{ stroke: colors.primary}}
            contentInset={{ top: 20, bottom: 20 }}>
        </LineChart>   
      </Card>
      </TouchableWithoutFeedback>
    )
  }

  renderHealth (){
    const current = this.state.health.current
    const cpu = current.map(data => data.cpu)
    const memory = current.map(data => data.memory)
    const time = current.map(data => data.time)

    return (
      <View>
        {this.renderChart('CPU', cpu)}
        {this.renderChart('Memory', memory)}
      </View>
    )
  }

  render() {
    return (
      <View>
        <Header
            placement="center"
            backgroundColor={colors.darkBlue}
            centerComponent={{ text: 'DASHBOARD', style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }}
          />
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          { this.state.equipments && this.renderEquipments() }
          { this.state.health && this.renderHealth() }
        </ScrollView>
      </View>
    );
  }
}

const HomeNav = createStackNavigator({
  Home: HomeScreen,
  Modal: ModalScreen,
},
{
  mode: 'modal',
  headerMode: 'none',
})

export default HomeNav;