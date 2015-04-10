/**
 * Using type signature-like syntax over a contract library
 * Working syntax:
 *    // concat :: String -> String -> String
 *    var concat = f([String, String], String).define(
 *     function(s1, s2) {
 *         return s1 + s2;
 *       }
 *     );
 */

var c = require('rho-contracts');

var R = require('ramda');

var TypeUtils = require('./typeUtils');

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

// Type -> Contract
var getContractFromType = R.converge(
  renameContract,
  TypeUtils.typeToString,
  typeToContract
);

module.exports = contract;
