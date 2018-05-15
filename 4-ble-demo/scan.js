import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import styles from '../App.styles';

import { Header, Button, ListItem, Text } from 'react-native-elements';

const list = [
  {
    id: '123-123',
    name: 'ABC',
    rssi: 70
  },
  {
    id: '222-123',
    name: 'BBB',
    rssi: 55
  }, {
    id: '333-123',
    name: 'CCC',
    rssi: 22
  }
];

const ids = ['123-123', '222-123', '333-123'];

export default class ScanScreen extends Component {

  constructor() {
    super();
    this.scan = this.scan.bind(this);
    this.connect = this.connect.bind(this);
    this.initialState = { deviceList: [], deviceIds: [], selectedDevice: null };
    this.state = this.initialState;
  }

  componentDidMount() {
    this.props.hm10.deviceList.subscribe((data) => {
      if (data.id && !this.state.deviceIds.includes(data.id) && data.name == "MYROBOT" ) {
        this.setState({
          deviceIds: [...this.state.deviceIds, data.id],
          deviceList: [...this.state.deviceList, data]
        })
      }
    });
    this.props.hm10.deviceConnected.subscribe((data) => {
      if (data.isConnected) {
        alert('device connected');
      }
    });
  }

  scan() {
    this.setState(this.initialState);
    this.props.hm10.scan();
    
    // testing
    // this.setState(
    //   {
    //     deviceIds: [...this.state.deviceIds, ids[0]],
    //     deviceList: [...this.state.deviceList, list[0]]
    //   }
    // )
  }

  connect(deviceId) {
    this.props.hm10.selectDevice(deviceId);
  }

  render() {
    return (
      <View>
        <Header
          centerComponent={{ text: 'DISCOVER', style: { color: '#fff' } }}
        />
        <View style={styles.screen}>
          <Button
            onPress={() => {
              this.scan();
            }}
            buttonStyle={{ borderRadius: 10 }}
            icon={{ name: 'cached' }}
            title='Find Devices' />
        </View>
        <View style={styles.deviceHeading}>
          <Text h3>Device List</Text>
        </View>
        {this.state.deviceList.length > 0 &&
          <View>
            {
              this.state.deviceList.map((l, i) => ( 
                <ListItem
                  key={i}
                  title={l.name}
                  subtitle={l.id}
                  onPress={() => {
                    this.connect(l.id);
                  }}
                /> 
              ))
            }
          </View>
        }
        {this.state.deviceList.length == 0 &&
          <View style={styles.textCenter}>
            <Text>Device List Empty.</Text>
          </View>
        }
      </View>
      
    );
  }
}
