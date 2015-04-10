/**
 * Using type signature-like syntax over a contract library
 * Working syntax:
 *    var concat = f([String, String], String).define(
 *     function(s1, s2) {
 *         return s1 + s2;
 *       }
 *     );
 */

var c = require('rho-contracts');

var R = require('ramda');

function contract(inputTypes, outputType) {
  return {
    define: function(fn) {

      var inputContracts = R.mapIndexed(makeContractObjectFromType, inputTypes);

      return c.fun.apply(null, inputContracts)
        .returns(getContractFromType(outputType))
        .wrap(fn);
    }
  };
}

function makeContractObjectFromType(type, i) {
  return R.createMapEntry(i, getContractFromType(type));
}

var typeToContract = R.compose(c.pred, R.is);
var renameContract =  R.invoker(1, 'rename');

var typeToString = R.cond(
  [R.eq(String), R.always('String')],
  [R.eq(Number), R.always('Number')],
  [R.T,          throwUnkownTypeError]
);

// Type -> Contract
var getContractFromType = R.converge(
  renameContract,
  typeToString,
  typeToContract
);

function throwUnkownTypeError(type) {
  throw new Error('Unknown data type ' + type);
}

module.exports = contract;
