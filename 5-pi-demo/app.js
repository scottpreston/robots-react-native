import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, NativeModules, NativeEventEmitter, NativeAppEventEmitter } from 'react-native';

// extras
import Button from 'react-native-button';
import RNSimpleCompass from 'react-native-simple-compass';

// custom classes
import styles from './style';
import TextToSpeech from './tts';
import Navigate from './navigate';
import TimerMixin from 'react-timer-mixin';

export default class App extends Component {
  constructor() {
    super();
    this.tts = new TextToSpeech();
    this.navigate = new Navigate();
    this.changeDirection = this.changeDirection.bind(this);
    this.state = { heading: -1, moving: false, turning: false, targetHeading: -1};
  }

  changeDirection(h) {
    this.setState({ targetHeading: h, turning: true });
  }

  turn() {
    const accuracy = 5;
    var relativeHeading = this.state.heading - this.state.targetHeading;
    if (relativeHeading < 0) {
      relativeHeading = relativeHeading + 360;
    }
    if (relativeHeading <= accuracy || relativeHeading >= 360 - accuracy) {
      this.navigate.stop();
      this.setState({ turning: false });
      return;
    }
    if (relativeHeading < 180 && relativeHeading > 15) {
      this.navigate.turnRight();
    } else if (relativeHeading >= 180 && relativeHeading < 345) {
      this.navigate.turnLeft();
    } else if (relativeHeading >= 345) {
      this.navigate.turnLeft(100);
      this.setState({ turning: false });
      TimerMixin.setTimeout(() => {
        this.setState({ turning: true });
      }, 500);
    } else if (relativeHeading <= 15) {
      this.navigate.turnRight(100);
      this.setState({ turning: false });
      TimerMixin.setTimeout(() => {
        this.setState({ turning: true });
      }, 500);
    }
  }

  componentDidMount() {
    const degree_update_rate = 3;
    RNSimpleCompass.start(degree_update_rate, (degree) => {
      this.setState({ heading: degree });
    });
  }

  componentDidUpdate() {
    // will always call on state change.
    if (this.state.turning) {
      this.turn();
    }
    if (this.state.diagnostic) {
      this.runDiagnostic(); 
    }
  }

  componentWillUnmount() {
    RNSimpleCompass.stop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          My Robot POC
        </Text>
        <Text style={styles.instructions}>
          Heading: {this.state.heading}
        </Text>
        <Button
          onPress={() => this.tts.test()}
          containerStyle={styles.protocolContainer}
          disabledContainerStyle={{ backgroundColor: 'grey' }}
          style={styles.protocolButton}>
          Text To Speech
        </Button>
        <Button
          onPress={() => this.changeDirection(0)}
          containerStyle={styles.protocolContainer}
          disabledContainerStyle={{ backgroundColor: 'grey' }}
          style={styles.protocolButton}>
          Face North
        </Button>
      </View>
    );
  }
}
