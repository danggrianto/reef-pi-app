import React from 'react';
import { Table, Row, Rows } from 'react-native-table-component';

import { View, ScrollView, StyleSheet } from 'react-native';
import { Header} from 'react-native-elements';

import { colors } from '../Utils/theme';

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: colors.primary },
    table: { borderWidth: 2, borderColor: colors.darkBlue },
    text: { margin: 6 }
  })

class ModalTable extends React.Component {
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

  export default ModalTable;