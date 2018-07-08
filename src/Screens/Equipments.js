import React from 'react';

import { View } from 'react-native';
import { Header} from 'react-native-elements';

import EquipmentCard from '../components/EquipmentCard'
import { colors } from '../Utils/theme';

class EquipmentsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          equipments: null
        };
        this.fetchEquipments = this.fetchEquipments.bind(this);
        this.toggleEquipment = this.toggleEquipment.bind(this);
        this.renderEquipments = this.renderEquipments.bind(this);
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

    toggleEquipment(equipmentId, toggle) {
        console.log('TOGGLE')
        let equipments = [...this.state.equipments];
        console.log(equipments)
        let index = equipments.findIndex(el => el.title === equipmentId);
        equipments[index] = {...equipments[index], active: toggle==='ON'};
        this.setState({ equipments });     
        console.log(equipments)    
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
            {this.state.equipments && this.renderEquipments()}
        </View>
      );
    }
  }

export default EquipmentsScreen;