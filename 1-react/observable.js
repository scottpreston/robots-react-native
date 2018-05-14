// simple arrays
var object = [
    {name: 'Tony Stark', alias: 'Iron Man'},
    {name: 'Steve Rogers' , alias: 'Captain America'}
];
console.log('--- array ----');
object.forEach((item) => {
    console.log(item.name, item.alias);
});

// rxjs (observable)
const Rx = require('rxjs/Rx');
const map = require('rxjs/operators/map').map;
const from = require('rxjs/observable/from').from;

var object = [
    {name: 'Tony Stark', alias: 'Iron Man'},
    {name: 'Steve Rogers' , alias: 'Captain America'}
];

console.log('--- rxjs from ----');
const source = from(object);

source.subscribe((o) => {
    console.log(o.name, o.alias);
});  

console.log('--- rxjs subject ----');
const heroSubject = new Rx.BehaviorSubject();

heroSubject.subscribe((hero) => {
    hero && console.log(hero.name, hero.alias);
});  

setTimeout(() => {
    heroSubject.next(object[0]);
},1000);

setTimeout(() => {
    heroSubject.next(object[1]);
},2000);