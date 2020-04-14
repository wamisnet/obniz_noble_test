'use strict';

//const noble = require('noble');

const obnizNoble = require("obniz-noble");
const noble = obnizNoble("obnizid");
let knownDevices = [];
let startTime = 0;

//discovered BLE device
const discovered = (peripheral) => {
    const device = {
        name: peripheral.advertisement.localName,
        address : peripheral.address ,
        rssi: peripheral.rssi
    };
    knownDevices.push(device);
    console.log(`${Math.floor((new Date().getTime()-startTime)/1000)},${knownDevices.length},${device.name},${device.address},${device.rssi},`);
};

//BLE scan start
const scanStart = () => {
    noble.on('discover', discovered);
    scanLoop(true);
};

const scanLoop = (duplicates) => {
    startTime = new Date().getTime();
    knownDevices = [];
    noble.startScanning([],duplicates);
    setTimeout(()=>{
        console.log("timeout");
        noble.stopScanning();
        scanLoop(duplicates);
    },60*1000);
};

if(noble.state === 'poweredOn'){
    scanStart();
}else{
    noble.on('stateChange', scanStart);
}
