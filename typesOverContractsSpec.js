var f = require('./typesOverContracts');

var CustomMatchers = require('./custom-matchers');

describe('f', function() {
  var concat;

  function concatWithArgs() {
    var args = arguments;

    return function() {
      return concat.apply(null, args);
    };
  }

  beforeEach(function() {
    this.addMatchers(CustomMatchers);

    concat = f([String, String], String).define(
      function(s1, s2) {
        return s1 + s2;
      }
    );
  });

  it('should expose the original function', function() {
    expect(concat('Hi', 'Bye')).toBe('HiBye');
  });

  it('should throw an error if the input types are invalid', function() {
    expect(concatWithArgs(false, 'Bye')).toThrowContractError();
    expect(concatWithArgs('Hi', 2)).toThrowContractError();
  });

  it('should throw an error if the output types are invalid', function() {
    var concat = f([String, String], String).define(
      function(s1, s2) {
        return null;
      }
    );

    expect(concat.bind(null, 'Hi', 'Bye')).toThrowContractError();
  });


});
