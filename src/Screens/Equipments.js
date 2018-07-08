import React from 'react';

import { View, ScrollView } from 'react-native';
import { Header} from 'react-native-elements';

import EquipmentCard from '../Components/EquipmentCard'
import { colors } from '../Utils/theme';
import { fetchEquipments, updateEquipment } from '../Services/api'

class EquipmentsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          equipments: null
        };
        this.toggleEquipment = this.toggleEquipment.bind(this);
        this.renderEquipments = this.renderEquipments.bind(this);
        this.updateEquipments = this.updateEquipments.bind(this);
    }

    componentWillMount() {
        this.updateEquipments()
    }

    updateEquipments(){
        fetchEquipments().then(equipments => {
            this.setState({equipments})
        })
    }

    toggleEquipment(equipmentId, toggle) {
        let equipments = [...this.state.equipments];
        let index = equipments.findIndex(el => el.id === equipmentId);
        equipments[index] = {...equipments[index], on: toggle==='ON'};
        updateEquipment(equipments[index]).then(()=>{
            this.updateEquipments();
        })
    }

    renderEquipments(){
        var toggleEquipment = this.toggleEquipment
        var equipments = this.state.equipments.map((equipment, i) => {
            return <EquipmentCard {...equipment} key={i} toggleEquipment={toggleEquipment.bind(this)}/>
        })
        return equipments
    }

    render() {

      return (
        <View>
            <Header
            placement="center"
            backgroundColor={colors.darkBlue}
            centerComponent={{ text: 'EQUIPMENTS', style: { color: 'white', fontWeight: 'bold', fontSize: 17 } }}
          />
          <ScrollView contentContainerStyle={{paddingBottom: 100}}>
            {this.state.equipments && this.renderEquipments()}
          </ScrollView>
        </View>
      );
    }
  }

export default EquipmentsScreen;