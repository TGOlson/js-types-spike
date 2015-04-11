JavaScript Types Spike

Imagination on how type signatures could be written in valid javascript. Note: this is effectively a contract implementation - contract library is `rho-contracts`.

Example syntax:

```js
/**
 * Using type signature-like syntax over a contract library
 * With auto curried functions for a haskell-like type signature
 * Note: this builds off of the types-over-contracts implementation
 */

// concat :: String -> String -> String
var concat = f(String, String, String).define(
  function(s1, s2) {
    return s1 + s2;
  });
```

Auto-curried
```js
concat('Hi', 'Bye') // => 'HiBye'
concat('Hi')('Bye') // => 'HiBye'
```

Input type checking (contracted)
```js
concat(null, 'Bye')
// =>
// ContractError:
// Expected String, but got null
// for the `0` argument of the call.
```

Output type checking (contracted)
```js
var concat = f(String, String, String).define(
  function(s1, s2) {
    return null;
  });

concat('Hi', 'Bye')
// =>
// ContractError:
// Expected String, but got null
// for the return value of the call.
```
