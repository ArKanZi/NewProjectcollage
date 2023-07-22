const {EventEmitter} = require('events');
const updateEvent = new EventEmitter();

updateEvent.on('updateCart', (item1,item2,item3) => {
    console.log('update event emitter function called');
    console.log(`productname = ${item1} price = ${item2}`);

});

module.exports = updateEvent;