import BleManager from 'react-native-ble-manager';
import { NativeModules, NativeEventEmitter, NativeAppEventEmitter } from 'react-native';

import Rx from 'rxjs/Rx';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
const HM10_Service = 'FFE0';
const HM10_Characteristic = 'FFE1';

const hm10Emitter = new EventEmitter();

const bytesToString = function (b) {
  return b.map(function (x) { return String.fromCharCode(x) }).join('')
}

export default class Hm10 {

  constructor() {
    this.deviceId = '';
    this.deviceList = new Rx.BehaviorSubject({});
    this.deviceData = new Rx.BehaviorSubject({});
    this.deviceConnected = new Rx.BehaviorSubject({isConnected:false});

    this.discover = this.discover.bind(this);
    this.selectDevice = this.selectDevice.bind(this);

    BleManager.start({ showAlert: false });
    BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.discover);
    BleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdate);
    console.log('construct',this.deviceList,this.deviceData)
  }

  scan() {
    BleManager.scan([], 5);
  }

  discover(data) {
    console.log('this.deviceList',this.deviceList,data)
    this.deviceList.next(data);
    // SAMPLE DATA
    // -----------
    // { name: 'DSD TECH',
    // id: 'BC93D796-5820-435F-8B2A-2446CADA8E08',
    // advertising: 
    //  { kCBAdvDataIsConnectable: true,
    //    kCBAdvDataTxPowerLevel: 0,
    //    kCBAdvDataServiceData: 
    //     { B000: 
    //        { bytes: [ 0, 0, 0, 0 ],
    //          data: 'AAAAAA==',
    //          CDVType: 'ArrayBuffer' } },
    //    kCBAdvDataServiceUUIDs: [ 'FFE0' ],
    //    kCBAdvDataManufacturerData: 
    //     { CDVType: 'ArrayBuffer',
    //       data: 'SE3UNjnYOTw=',
    //       bytes: [ 72, 77, 212, 54, 57, 216, 57, 60 ] },
    //    kCBAdvDataLocalName: 'DSD TECH' },
    // rssi: -67 }
  }


  selectDevice(deviceId) {
    this.deviceId = deviceId;
    BleManager.stopScan();
    BleManager.connect(deviceId).then(() => {
      console.log('device connected...' + deviceId);
      BleManager.retrieveServices(deviceId).then((info) => {
        console.log('retrieving services...')
        BleManager.startNotification(deviceId, HM10_Service, HM10_Characteristic).then(() => {
          console.log('starting notifications...')
          this.deviceConnected.next({isConnected:true});
        });
      });
    });
  }

  connect() {
    return this.deviceConnected.asObservable();
  }

  
  listDevices() {
    return this.deviceList.asObservable();
  }

  read() {
    return this.deviceData.asObservable();
  }

  handleUpdate(data) {
    this.deviceData.next(bytesToString(data.value));
  }

  write(data) {
    console.log('btwrite',data);
    BleManager.writeWithoutResponse(this.deviceId, HM10_Service, HM10_Characteristic, data).then(() => {
      // Success code
      console.log('writing to hm10: ' + data);
    }).catch((error) => {
      // Failure code
      console.log(error);
    });
  }

}
