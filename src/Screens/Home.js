import React from 'react';

import { View } from 'react-native';
import { Header, Card, List, ListItem } from 'react-native-elements';
import { colors } from '../Utils/theme';
import { fetchEquipments } from '../Services/api'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipments: null
    };
  }

  componentWillMount (){
    fetchEquipments().then(equipments => {
      this.setState({equipments})
   })
  }
  renderEquipments (){
    return (
      <Card title='Equipments' containerStyle={{paddingHorizontal:5, paddingBottom:0}} dividerStyle={{marginBottom:0}}>
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
    );
  }

  render() {
    return (
      <View>
        <Header
            placement="center"
            backgroundColor={colors.darkBlue}
            centerComponent={{ text: 'DASHBOARD', style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }}
          />
        { this.state.equipments && this.renderEquipments() }
      </View>
    );
  }
}

export default HomeScreen;