import React from 'react';

import { View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Header, Card, List, ListItem, Button, Text } from 'react-native-elements';
import { LineChart } from 'react-native-svg-charts'
import { createStackNavigator } from 'react-navigation'
import { Table, Row, Rows } from 'react-native-table-component';

import { colors } from '../Utils/theme';
import { fetchEquipments, fetchHealth } from '../Services/api'

const styles = StyleSheet.create({
  cardContainer: {paddingHorizontal:5, paddingBottom:0},
  cardDivider: {marginBottom:0, height:0},
  head: { height: 40, backgroundColor: colors.primary },
  table: { borderWidth: 2, borderColor: colors.darkBlue },
  text: { margin: 6 }
})

class ModalScreen extends React.Component {
  constructor(props){
    super(props);
    const data = this.props.navigation.state.params.data
    const time =this.props.navigation.state.params.time
    tableData = []
    for (let index = data.length-1; index >= 0; index--) {
      tableData.push([time[index], data[index]])
    }
    console.log(tableData)
    this.state = {
        title: this.props.navigation.state.params.title,
        tableHead: ['Time', 'Data'],
        tableData: tableData
    }
  }

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
          underlayColor: colors.darkBlue
        }}
        centerComponent={{ text: this.state.title, style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }}
      />
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <Table borderStyle={styles.table}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={this.state.tableData} textStyle={styles.text}/>
          </Table>
        </ScrollView>
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

  renderChart(title, data, time){
    return (
      <TouchableWithoutFeedback onPress={ () => this.props.navigation.navigate('Modal', {title:title, data:data, time:time})}>
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
        {this.renderChart('CPU', cpu, time)}
        {this.renderChart('Memory', memory, time)}
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