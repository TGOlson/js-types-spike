var R = require('ramda');

var typeToString = R.cond(
  [R.eq(String), R.always('String')],
  [R.eq(Number), R.always('Number')],
  [R.T,          throwUnkownTypeError]
);

function throwUnkownTypeError(type) {
  throw new Error('Unknown data type ' + type);
}

module.exports = {
  typeToString: typeToString
};
