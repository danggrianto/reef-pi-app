const base64 = require('base-64');
import { AsyncStorage } from 'react-native';

const getAPIconfig = async () => {
    let settings = {}
    try {
        const ip = await AsyncStorage.getItem('@ReefPi:ip');
        if (ip !== null) {
          settings.ip = ip
        }
        const username = await AsyncStorage.getItem('@ReefPi:username');
        if (username !== null) {
          settings.username = username
        }
        const password = await AsyncStorage.getItem('@ReefPi:password');
        if (password !== null) {
          settings.password = password
        }
       } catch (error) {
         console.log(error)
         return null
       }
    let api = {}
    api.url = 'http://'+ settings.ip + '/api'
    var headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(settings.username+':'+settings.password));
    api.headers = headers
    return api
}

const fetchEquipments = async() => {
    var api = await getAPIconfig();
    return fetch(api.url + '/equipments', { 
      method: 'get', 
      headers: api.headers
    })
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.json();
    })
}

const updateEquipment = async (equipment) => {
    var api = await getAPIconfig();
    return fetch(api.url + '/equipments/' + equipment.id, { 
        method: 'post', 
        headers: api.headers,
        body: JSON.stringify(equipment)
      })
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
}

  
export {
    fetchEquipments,
    updateEquipment
};
