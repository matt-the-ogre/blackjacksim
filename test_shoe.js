var DEBUG = true;

var Shoe = require('./shoe.js');
var shoe = new Shoe(6);

for (i = 0; i < 320; i++) {
  console.log(shoe.dealOneCard());
}

