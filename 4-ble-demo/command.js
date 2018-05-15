import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import styles from '../App.styles';
import { Header, Button, ListItem, Text } from 'react-native-elements';

export default class CommandScreen extends Component {

  constructor() {
    super();
    this.btWrite = this.btWrite.bind(this);
    this.fwd = this.fwd.bind(this);
    this.rev = this.rev.bind(this);
    this.right = this.right.bind(this);
    this.left = this.left.bind(this);
    this.stop = this.stop.bind(this);
    this.leftPlus = this.leftPlus.bind(this);
    this.rightMinus = this.leftPlus.bind(this);
    this.state = { leftPos: 0, rightPos: 0 }
  }

  btWrite(data) {
    this.props.hm10.write(data);
  }

  fwd() {
    this.btWrite([255, 0, 180]);
    this.btWrite([255, 1, 0]);
  }

  rev() {
    this.btWrite([255, 0, 0 + this.state.leftPos]);
    this.btWrite([255, 1, 180 - this.state.rightPos]);
  }

  right() {
    this.btWrite([255, 0, 0]);
    this.btWrite([255, 1, 0]);
  }

  left() {
    this.btWrite([255, 0, 180]);
    this.btWrite([255, 1, 180]);
  }

  stop() {
    this.btWrite([127, 0, 90]);
    this.btWrite([127, 1, 90]);
  }

  render() {
    return (
      <View >
        <Header
          centerComponent={{ text: 'COMMANDS', style: { color: '#fff' } }}
        />
        <View style={styles.screen}>
          <Button
            onPress={() => {
              this.fwd();
            }}
            buttonStyle={{ borderRadius: 10, marginTop: 20 }}
            icon={{ name: 'keyboard-arrow-up' }}
            title='Forward' />
          <Button
            onPress={() => {
              this.left();
            }}
            buttonStyle={{ borderRadius: 10, marginTop: 20 }}
            icon={{ name: 'keyboard-arrow-left' }}
            title='Left' />
          <Button
            onPress={() => {
              this.right();
            }}
            buttonStyle={{ borderRadius: 10, marginTop: 20 }}
            icon={{ name: 'keyboard-arrow-right' }}
            title='Right' />
          <Button
            onPress={() => {
              this.rev();
            }}
            buttonStyle={{ borderRadius: 10, marginTop: 20 }}
            icon={{ name: 'keyboard-arrow-down' }}
            title='Reverse' />
          <Button
            onPress={() => {
              this.stop();
            }}
            buttonStyle={{ borderRadius: 10, marginTop: 20 }}
            icon={{ name: 'error-outline' }}
            title='Stop' />
        </View>

      </View>

    );
  }
}
