var R = require('ramda');

function f(inputTypes, outputType) {
  return {
    define: R.partial(define, inputTypes, outputType)
  };
}

function define(inputTypes, outputType, fn) {
  return function() {

    var inputArgs = toArray(arguments);

    return validateInputArgs(inputTypes, inputArgs, outputType, fn);
  };
}

var validateInputArgs = R.ifElse(
  inputArgsAreValid,
  validateOutputArgs,
  throwArgError('Illegal input types')
);

function validateOutputArgs(_, inputArgs, outputType, fn) {
  var result = fn.apply(null, inputArgs);

  if(R.is(outputType, result)) {
    return result;
  } else {
    throw new Error('Illegal output type');
  }
}

function inputArgsAreValid(inputTypes, inputArgs) {
  var inputTypePair = R.zip(inputTypes, inputArgs);

  var areAllValidArgs = R.map(invokeTypePair, inputTypePair);

  return R.all(R.eq(true), areAllValidArgs);
}

function throwArgError(error) {
  return function() {
    throw new Error(error);
  };
}

function invokeTypePair(pair) {
  return R.is(R.head(pair), R.last(pair));
}

function toArray(args) {
  return Array.prototype.slice.apply(args);
}

module.exports = f;
