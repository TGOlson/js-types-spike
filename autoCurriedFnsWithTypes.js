/**
 * Using type signature-like syntax over a contract library
 * With auto curried functions for a haskell-like type signature
 * Note: this builds off of the types-over-contracts implementation
 * Working syntax:
 *    // concat :: String -> String -> String
 *    var concat = f(String, String, String).define(
 *     function(s1, s2) {
 *         return s1 + s2;
 *       }
 *     );
 *
 *    concat.signature => ':: String -> String -> String'
 */

var R = require('ramda');

var f = require('./typesOverContracts');

var TypeUtils = require('./typeUtils');

function contractify() {
  var args = toArray(arguments),
      inputTypes = R.init(args),
      outputType = R.last(args);

  // Simulate 'f' api by exposing define
  return {
    define: R.partial(defineFromTypes, inputTypes, outputType)
  };
}

function defineFromTypes(inputTypes, outputType, fn) {
  var typedFn = f(inputTypes, outputType).define(fn);

  var curriedFn = R.curryN(inputTypes.length, typedFn);

  curriedFn.signature = makeSignature(inputTypes, outputType);

  return curriedFn;
}

var makeSignature = R.compose(
  R.concat(':: '),
  R.join(' -> '),
  R.map(TypeUtils.typeToString),
  R.flip(R.append)
);

function toArray(args) {
  return Array.prototype.slice.apply(args);
}


module.exports = contractify;
