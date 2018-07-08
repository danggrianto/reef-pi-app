import React from 'react';

import { View } from 'react-native';
import { Header, List, Button } from 'react-native-elements';

import { colors } from '../Utils/theme';

class EquipmentsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          equipments: null
        };
        this.fetchEquipments = this.fetchEquipments.bind(this);
        this._onPress = this._onPress.bind(this);
    }

    componentWillMount() {
        this.fetchEquipments()
    }

    fetchEquipments () {
        // temporary
        this.setState({equipments: [
            {title: 'Sump', active: true},
            {title: 'Heater', active: false}
        ]})
    }

    _onPress(item) {
        let equipments = [...this.state.equipments];
        let index = equipments.findIndex(el => el.title === item.title);
        equipments[index] = {...equipments[index], active: !item.active};
        this.setState({ equipments });         
    }

    render() {

      return (
        <View>
            <Header
            placement="center"
            backgroundColor={colors.darkBlue}
            centerComponent={{ text: 'EQUIPMENTS', style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }}
          />
          <List containerStyle={{marginTop:0}}>
            {
                this.state.equipments.map((item, i) => (
                <Button large raised backgroundColor={item.active?colors.success:'gray'} key={i} title={item.title} containerViewStyle={{padding: 10}} onPress={()=>this._onPress(item)}/>
                ))
            }
            </List>
        </View>
      );
    }
  }

export default EquipmentsScreen;