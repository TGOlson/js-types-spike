var f = require('./autoCurriedFnsWithTypes');

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

    concat = f(String, String, String).define(
      function(s1, s2) {
        return s1 + s2;
      }
    );
  });

  it('should expose the original function', function() {
    expect(concat('Hi', 'Bye')).toBe('HiBye');
  });

  it('should return a curried function', function() {
    expect(concat('Hi')('Bye')).toBe('HiBye');
  });

  it('should have a type signature', function() {
    expect(concat.signature).toBe(':: String -> String -> String');
  });

  it('should throw an error if the input types are invalid', function() {
    expect(concatWithArgs(false, 'Bye')).toThrowContractError('Expected String, but got false');
    expect(concatWithArgs('Hi', 2)).toThrowContractError('Expected String, but got 2');
  });

  it('should throw an error if the output types are invalid', function() {
    var concat = f(String, String, String).define(
      function(s1, s2) {
        return null;
      }
    );

    expect(concat.bind(null, 'Hi', 'Bye')).toThrowContractError('Expected String, but got null');
  });
});
