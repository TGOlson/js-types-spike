
Array syntax for input:

```js
var concat = f([String, String], String).define(
  function(s1, s2) {
    return s1 + s2;
  }
);
```

More traditional curried syntax, without strict distinction between input and output:

```js
// concat :: String -> String -> String
var concat = f(String, String, String).define(
  function(s1, s2) {
    return s1 + s2;
  }
);
```

Function cache:

```js
f('concat').withTypes([String, String], String).as(
  function(s1, s2) {
    return s1 + s2;
  }
);

f.concat('Hi', 'Bye'); // => 'HiBye'
```

String interpolation with function cache:

```js
// concat :: String -> String -> String
f('concat :: String -> String -> String').define(
  function(s1, s2) {
    return s1 + s2;
  }
);

f.concat('Hi', 'Bye'); // => 'HiBye'
```

String interpolation with eval somewhere:

```js
// concat :: String -> String -> String
f('concat :: String -> String -> String',
function(s1, s2) {
  return s1 + s2;
});

concat('Hi', 'Bye'); // => 'HiBye'
```
