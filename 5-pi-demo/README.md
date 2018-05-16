## 5. PI Robot & Demo

An overview of a more sophisticated robot using more Phone Features with React-Native.

### The Packages for my HM10 App

* [react-native-camera](https://github.com/react-native-community/react-native-camera) - To interact with camera.
* [react-native-sensors](https://github.com/react-native-sensors/react-native-sensors) - To interact with a Accelerometer, Gyroscope, and Magnetometer
* [react-native-simple-compass](https://github.com/vnil/react-native-simple-compass) - To interact with compass.
* [react-native-sound](https://github.com/zmxv/react-native-sound) - to play MP3s
* [react-timer-mixin](https://github.com/reactjs/react-timer-mixin) - Needed for timers (react lifecycle & timers don't mix

### Camera Example

```javascript
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';

class BadInstagramCloneApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
    }
  };
}
```

### Sensors Example

```javascript
        this.accelerometer = new Accelerometer({
            updateInterval: 400 // defaults to 100ms
        }).then(observable => {
            this.accelerometerObservable = observable;
            this.isReady();
        }).catch(error => {
            console.log("The accelerometer is not available");
        });
```

### 4 Demo Files

* [app.js](./app.js) - Sample App.
* [tts.js](./tts.js) - The text to speech component.
* [navigate.js](./navigate.js) - The navigation REST wrapper.
* [express.js](./express.js) - The express endpoint for the Raspberry Pi server.

### Next Steps

1. Time Driven Sequencing. I want to run a diagnostic with commands sequentially. 
2. Connect `AWS Transcribe` and `AWS Polly`.
3. Create an App for my Daughter to run one of these bots and do experiments. 

```javascript
function resolveSometime(cmd, dur) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cmd());
    }, dur);
  });
}

const command = function(funct, dur) {
  return { commandFunction: funct, duration: dur };
};

async function processCommands(cmds) {
  for (let cmd of cmds) {
    await resolveSometime(cmd.commandFunction, cmd.duration);
  }
}

processCommands([
  command(() => { console.log("hi there 1", new Date());}, 1000),
  command(() => {}, 1000), // do nothing
  command(() => { console.log("hi again 2", new Date()); }, 1000)
]);

```



