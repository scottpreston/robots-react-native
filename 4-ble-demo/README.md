## 4. BLE Robot & Demo

An overview of a simple robot using BLE with React-Native.

### The Packages for my HM10 App

* [react-native-ble-manager](https://github.com/innoveit/react-native-ble-manager) - Bluetooth Low Energy
* [react-native-elements](https://github.com/react-native-training/react-native-elements) - UI
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) - UI
* [rxjs](http://reactivex.io/rxjs/) - observables for HM10

### The App.js

An overview of the App I'm demoing. Not I'm passing the HM10 object around via PROPS vs GLOBALS, Singletons, or ReDux.

```jsx
 <TabBarIOS
        selectedTab={this.state.discoverTab}>
        <Icon.TabBarItemIOS
          title="Discover"
          iconName="ios-bluetooth"
          selectedIconName="ios-bluetooth"
          selected={this.state.selectedTab === 'discoverTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'discoverTab',
            });
          }}>
          <ScanScreen hm10={hm10} />
        </Icon.TabBarItemIOS>
```

### 4 Demo Files

[hm10.js](./hm10.js) - The wrapper for BLE manager.
[scan.js](./scan.js) - The the UI Component to scan for BLE devices.
[command.js](./command.js) - The command screen for working with HM10.
[hm10.js](./hm10.js) - The wrapper for BLE manager.