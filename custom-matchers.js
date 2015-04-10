'use strict';

var R = require('ramda');

var isContractErr = R.propEq('name', 'ContractError');

function toThrowContractErrorWithMsg(msg) {
  var result = false;

  var error = getErrorFromFnCall(this.actual);

  if(isContractErr(error)) {
    var hasMessage = R.strIndexOf(msg, error.message) > -1;

    if(hasMessage) {
      result = true;
    } else {
      this.message = makeMessageFromError(error, msg);
    }
  }

  return result;
}

function toThrowContractErrorPlain() {
  var result = false;

  var error = getErrorFromFnCall(this.actual);

  if(isContractErr(error)) {
    result = true;
  } else if(error) {
    this.message = makeMessageFromError(error);
  }

  return result;
}

function makeMessageFromError(error, msg) {
  var prefix = 'Expected Function to throw contract error',
      additional = '',
      suffix = 'but it threw ' + error.message;

  if(msg) {
    additional = 'containing "' + msg + '"';
  }

  return function() {
    return prefix + additional + suffix;
  }
}

function getErrorFromFnCall(fn) {
  var error;

  try {
    fn();
  } catch(err) {
    error = err;
  }

  return error;
}

function toThrowContractError(msg) {
  if(msg) {
    return toThrowContractErrorWithMsg.call(this, msg);
  } else {
    return toThrowContractErrorPlain.call(this);
  }
}

module.exports = {
  toThrowContractError: toThrowContractError
};
