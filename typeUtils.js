var R = require('ramda');

var typeToString = R.prop('name');

module.exports = {
  typeToString: typeToString
};
